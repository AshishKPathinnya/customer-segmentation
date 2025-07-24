# Customer Segmentation Dashboard

This is a modern full-stack web application for customer segmentation analysis using machine learning clustering techniques. The application provides an interactive dashboard to visualize customer data, analyze purchasing patterns, and generate marketing insights through K-means clustering.

The project implements a comprehensive data science methodology including feature scaling, optimal cluster determination using elbow method and silhouette analysis, and identifies 5 distinct customer segments: Premium customers, Young enthusiasts, Conservative high earners, Budget conscious, and Average customers. Each segment comes with targeted marketing strategy recommendations.

##Live Link: https://customer-segmentation-dashboard-lfec.onrender.com/ 

## Features

- Interactive dashboard with customer data visualization
- **K-means clustering analysis** with 5 distinct customer segments
- Real-time filtering by age group, gender, and cluster
- Multiple chart types: scatter plots, bar charts, doughnut charts
- **Elbow method and silhouette analysis** for optimal cluster determination
- Marketing strategy recommendations per customer segment
- **Professional data science methodology** (see DATA_SCIENCE_METHODOLOGY.md)
- Dark/light mode theme switching
- Responsive design for mobile and desktop

## Data Science Approach

This project implements a comprehensive customer segmentation analysis using:

- **K-Means Clustering**: Unsupervised machine learning for customer grouping
- **Feature Scaling**: StandardScaler for normalized clustering analysis
- **Optimal Cluster Selection**: Elbow method and silhouette score analysis
- **5 Customer Segments**: Premium customers, young enthusiasts, conservative high earners, budget conscious, and average customers
- **Marketing Strategy**: Targeted recommendations for each customer segment

For detailed methodology, see [DATA_SCIENCE_METHODOLOGY.md](DATA_SCIENCE_METHODOLOGY.md)

## Screenshots
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214110" src="https://github.com/user-attachments/assets/c6fa01b9-ad87-4390-a663-be4c33592d8e" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214130" src="https://github.com/user-attachments/assets/d21a8510-ca9b-42e8-81d7-c3c69b8aa368" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214140" src="https://github.com/user-attachments/assets/ab421d53-f83d-41de-9214-b99e70cce00c" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214158" src="https://github.com/user-attachments/assets/fe041530-a451-4a20-9027-166025dada07" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214210" src="https://github.com/user-attachments/assets/5cd3413f-83b7-4ba4-be00-165aec157288" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214236" src="https://github.com/user-attachments/assets/a1e72a5c-7163-4378-a5ae-7f6f1d49ba79" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 214245" src="https://github.com/user-attachments/assets/b449bc0c-5ed7-4aca-99e2-8910b64f4215" />

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth UI transitions
- **Charts**: Chart.js for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Development Server**: TSX for TypeScript execution
- **Production Build**: esbuild for server bundling

## Key Components

### Data Models
- **Customers**: Core customer data including demographics and spending patterns
- **Cluster Analysis**: Machine learning cluster results with metadata
- **Model Performance**: K-means algorithm performance metrics

### API Endpoints
- `GET /api/customers` - Retrieve all customer data
- `GET /api/customers/filtered` - Get filtered customer data with query parameters
- `GET /api/clusters` - Fetch cluster analysis results
- `GET /api/model-performance` - Get model performance metrics for elbow and silhouette analysis

### UI Components
- **Dashboard**: Main analytics interface with multiple visualization tabs
- **Filter Panel**: Dynamic filtering by age group, gender, and cluster
- **Chart Components**: Scatter plots, bar charts, doughnut charts, and line charts
- **Glass Card**: Reusable glassmorphism design component
- **Marketing Strategies**: Targeted recommendations per customer segment

### Development Features
- **Hot Module Replacement**: Vite HMR for rapid development
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Type Safety**: Full TypeScript coverage across frontend and backend

## Data Flow

1. **API Layer**: Express.js serves RESTful endpoints for data access
2. **State Management**: React Query manages server state with caching
3. **Export Functionality**: CSV export capability for analysis results

## External Dependencies

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Shadcn/ui**: Pre-built component library with consistent design
- **Lucide React**: Icon library for UI elements

### Analytics
- **Chart.js**: Canvas-based charting for performance
- **Framer Motion**: Animation library for enhanced UX

### Render Deployment
- **Configuration**: `render.yaml` provides automatic deployment setup
- **Database**: PostgreSQL on Render with automatic connection
- **Build Commands**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: `DATABASE_URL` automatically injected from database service
- **Domain**: Custom `.onrender.com` subdomain provided

## License

MIT
