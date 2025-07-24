# Customer Segmentation Analysis using K-Means Clustering

This document provides a comprehensive overview of the data science methodology used in our customer segmentation dashboard. The analysis identifies distinct customer segments based on purchasing behavior and demographics using K-Means clustering to inform targeted marketing strategies.

## Objective

Analyze customer data from a mall to identify distinct customer segments based on their purchasing behavior and demographics using K-Means clustering. The goal is to provide insights that can inform targeted marketing strategies.

## Data Loading and Exploration

The customer data is loaded from the Mall_Customers.csv file into a pandas DataFrame for initial inspection.

```python
import pandas as pd
df = pd.read_csv('Mall_Customers.csv')
```

### Data Structure Analysis

After loading, we examine the first few rows to understand the data structure:

```python
display(df.head())
print(df.info())
print(df.isnull().sum())
```

**Dataset Overview:**
- **Size**: 200 customer entries
- **Columns**: 
  - CustomerID: Unique identifier
  - Gender: Male/Female
  - Age: Customer age in years
  - Annual Income (k$): Annual income in thousands of dollars
  - Spending Score (1-100): Score assigned based on customer behavior and spending nature
- **Data Quality**: No missing values detected, simplifying the data cleaning process

## Feature Scaling

Before applying K-Means clustering, numerical features must be scaled to ensure equal contribution to the clustering process, as K-Means is sensitive to data scale.

```python
from sklearn.preprocessing import StandardScaler

# Select features for clustering
X = df[['Annual Income (k$)', 'Spending Score (1-100)']]

# Apply standardization
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_scaled_df = pd.DataFrame(X_scaled, columns=X.columns)
```

**Why Feature Scaling is Critical:**
- K-Means uses Euclidean distance calculations
- Features with larger scales can dominate the clustering process
- StandardScaler ensures mean=0 and standard deviation=1 for all features

## Determining Optimal Number of Clusters

We employ two established methods to find the optimal number of clusters:

### 1. Elbow Method
The Elbow Method identifies the point where adding more clusters doesn't significantly reduce the Sum of Squared Errors (SSE).

### 2. Silhouette Score
Measures how similar an object is to its own cluster compared to other clusters. Higher scores indicate better-defined clusters.

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt

sse = []
silhouette_scores = []
k_range = range(1, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled_df)
    sse.append(kmeans.inertia_)
    if k > 1:
        score = silhouette_score(X_scaled_df, kmeans.labels_)
        silhouette_scores.append(score)

# Visualization code for both methods
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(k_range, sse, marker='o')
plt.title('Elbow Method')
plt.xlabel('Number of clusters (k)')
plt.ylabel('SSE')

plt.subplot(1, 2, 2)
plt.plot(range(2, 11), silhouette_scores, marker='o')
plt.title('Silhouette Score')
plt.xlabel('Number of clusters (k)')
plt.ylabel('Silhouette Score')
```

**Analysis Result:** Based on both methods, **k=5** was determined as the optimal number of clusters, showing a noticeable elbow and relatively high silhouette score.

## K-Means Clustering Implementation

```python
from sklearn.cluster import KMeans

# Apply K-Means with optimal clusters
kmeans_model = KMeans(n_clusters=5, random_state=42, n_init='auto')
kmeans_model.fit(X_scaled_df)

# Assign cluster labels to original dataset
cluster_labels = kmeans_model.labels_
df['Cluster'] = cluster_labels
```

## Cluster Analysis and Characteristics

```python
# Calculate mean values for each cluster
cluster_characteristics = df.groupby('Cluster')[['Age', 'Annual Income (k$)', 'Spending Score (1-100)']].mean()
```

### Customer Segment Profiles

**Cluster 0: Average Customers**
- **Demographics**: Average Age ~43 years
- **Income**: Average Annual Income ~$55k
- **Behavior**: Average Spending Score ~50
- **Profile**: Middle-aged customers with moderate income and spending patterns

**Cluster 1: Premium Customers**
- **Demographics**: Average Age ~33 years
- **Income**: High Annual Income ~$87k
- **Behavior**: High Spending Score ~82
- **Profile**: Young to middle-aged, high-income, high-spending customers - **Most Valuable Segment**

**Cluster 2: Young Enthusiasts**
- **Demographics**: Average Age ~25 years
- **Income**: Low Annual Income ~$26k
- **Behavior**: High Spending Score ~79
- **Profile**: Young customers with limited income but high spending tendency - likely students or young professionals influenced by trends

**Cluster 3: Conservative High Earners**
- **Demographics**: Average Age ~41 years
- **Income**: High Annual Income ~$88k
- **Behavior**: Low Spending Score ~17
- **Profile**: Middle-aged, high-income customers with conservative spending habits - potential savers or spending elsewhere

**Cluster 4: Budget Conscious**
- **Demographics**: Average Age ~45 years
- **Income**: Low Annual Income ~$26k
- **Behavior**: Low Spending Score ~21
- **Profile**: Older customers with limited income and conservative spending

## Data Visualization

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
scatter = plt.scatter(df['Annual Income (k$)'], df['Spending Score (1-100)'], 
                     c=df['Cluster'], cmap='viridis', s=50, alpha=0.8)
plt.title('Customer Clusters based on Income and Spending Score')
plt.xlabel('Annual Income (k$)')
plt.ylabel('Spending Score (1-100)')

# Create legend
legend_labels = [f'Cluster {i}' for i in sorted(df['Cluster'].unique())]
plt.legend(handles=scatter.legend_elements()[0], labels=legend_labels, title='Clusters')
plt.grid(True)
plt.show()
```

The scatter plot clearly demonstrates the separation of five distinct customer segments, visually confirming the clustering analysis results.

## Marketing Strategy Recommendations

### Cluster 1 (Premium Customers) - High Income, High Spending
**Strategy**: Premium Experience
- Implement exclusive loyalty programs
- Offer premium products and services
- Provide personalized shopping experiences
- Early access to new collections

### Cluster 2 (Young Enthusiasts) - Low Income, High Spending
**Strategy**: Value and Trends
- Focus on value-for-money products
- Offer student discounts and promotions
- Target with trendy, fashionable items
- Social media marketing campaigns

### Cluster 3 (Conservative High Earners) - High Income, Low Spending
**Strategy**: Investigation and Incentives
- Research reasons for low spending patterns
- Offer targeted incentives and promotions
- Provide products aligned with their specific interests
- Quality-focused messaging over quantity

### Cluster 4 (Budget Conscious) - Low Income, Low Spending
**Strategy**: Essential Value
- Target with basic necessities and essentials
- Offer budget-friendly options and bulk discounts
- Seasonal promotions and clearance sales
- Focus on practical, long-lasting products

### Cluster 0 (Average Customers) - Moderate Income and Spending
**Strategy**: Balanced Engagement
- Maintain engagement with regular promotions
- Offer diverse product ranges
- Standard loyalty programs
- Seasonal campaigns and general marketing

## Technical Implementation

The dashboard implements this analysis through:

1. **Real-time Data Processing**: Live calculation of cluster characteristics
2. **Interactive Visualizations**: Dynamic charts showing cluster distributions
3. **Filtering Capabilities**: Real-time filtering by demographics and clusters
4. **Performance Metrics**: Display of elbow method and silhouette analysis
5. **Marketing Insights**: Automated strategy recommendations per segment

## Model Performance

- **Optimal Clusters**: 5 segments identified
- **Silhouette Score**: High score indicating well-separated clusters
- **Elbow Method**: Clear elbow at k=5 confirming optimal cluster count
- **Feature Scaling**: StandardScaler ensures unbiased clustering
- **Reproducibility**: Random state=42 ensures consistent results

This methodology provides a robust foundation for customer segmentation, enabling data-driven marketing decisions and personalized customer experiences.