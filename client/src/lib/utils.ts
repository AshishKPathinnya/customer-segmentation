import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Customer, ClusterAnalysis } from "@shared/schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate cluster statistics from filtered customers
export function calculateClusterStats(customers: Customer[]): ClusterAnalysis[] {
  if (!customers || customers.length === 0) return [];

  const clusterColors = {
    0: '#ef4444',
    1: '#f59e0b', 
    2: '#10b981',
    3: '#06b6d4',
    4: '#8b5cf6'
  };

  // Group customers by cluster
  const clusterGroups = customers.reduce((acc, customer) => {
    const cluster = customer.cluster ?? 0;
    if (!acc[cluster]) acc[cluster] = [];
    acc[cluster].push(customer);
    return acc;
  }, {} as Record<number, Customer[]>);

  // Calculate statistics for each cluster
  const clusterLabels = {
    0: 'Careful Spenders',
    1: 'Splurge Shoppers',
    2: 'Conservative Rich',
    3: 'Premium Customers',
    4: 'Other'
  };

  const clusterDescriptions = {
    0: 'Low income, low spending customers',
    1: 'Low income, high spending customers',
    2: 'High income, low spending customers',
    3: 'High income, high spending customers',
    4: 'Other customer segment'
  };

  return Object.entries(clusterGroups).map(([clusterNum, clusterCustomers]) => {
    const cluster = parseInt(clusterNum);
    const size = clusterCustomers.length;
    
    const avgAge = clusterCustomers.reduce((sum, c) => sum + c.age, 0) / size;
    const avgIncome = clusterCustomers.reduce((sum, c) => sum + c.annualIncome, 0) / size;
    const avgSpending = clusterCustomers.reduce((sum, c) => sum + c.spendingScore, 0) / size;

    return {
      id: cluster + 1,
      cluster,
      avgAge: Math.round(avgAge * 10) / 10,
      avgIncome: Math.round(avgIncome * 10) / 10,
      avgSpending: Math.round(avgSpending * 10) / 10,
      size,
      color: clusterColors[cluster as keyof typeof clusterColors] || '#6b7280',
      label: clusterLabels[cluster as keyof typeof clusterLabels] || 'Other',
      description: clusterDescriptions[cluster as keyof typeof clusterDescriptions] || 'Other customer segment'
    };
  }).sort((a, b) => a.cluster - b.cluster);
}
