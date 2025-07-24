import type { Customer } from "@shared/schema";

export function exportToCSV() {
  // Download the original CSV file from the server
  const link = document.createElement("a");
  link.href = "/api/download-csv";
  link.download = "Mall_Customers.csv";
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportFilteredToCSV(customers: Customer[], filename: string = "filtered-customer-data.csv") {
  const headers = ["ID", "Customer ID", "Gender", "Age", "Annual Income", "Spending Score", "Cluster"];
  
  const csvContent = [
    headers.join(","),
    ...customers.map(customer => [
      customer.id,
      customer.customerId,
      customer.gender,
      customer.age,
      customer.annualIncome,
      customer.spendingScore,
      customer.cluster ?? ""
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function getClusterLabel(cluster: number): string {
  const labels = {
    0: "Careful Spenders",
    1: "Splurge Shoppers", 
    2: "Conservative Rich",
    3: "Premium Customers",
    4: "Standard Customers"
  };
  return labels[cluster as keyof typeof labels] || `Cluster ${cluster}`;
}

export function getClusterDescription(cluster: number): string {
  const descriptions = {
    0: "Low income, moderate spending customers who are price-conscious",
    1: "Young customers with limited income but high spending behavior",
    2: "High-income customers who are conservative with their spending",
    3: "Wealthy customers with high spending power and frequency",
    4: "Average income customers with modest spending patterns"
  };
  return descriptions[cluster as keyof typeof descriptions] || "";
}
