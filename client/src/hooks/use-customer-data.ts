import { useQuery } from "@tanstack/react-query";
import type { Customer, ClusterAnalysis, CustomerFilters, ModelPerformance } from "@shared/schema";

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["/api/customers"],
  });
}

export function useFilteredCustomers(filters: CustomerFilters) {
  const queryString = new URLSearchParams();
  
  if (filters.ageGroup && filters.ageGroup !== 'all') {
    queryString.set('ageGroup', filters.ageGroup);
  }
  if (filters.gender && filters.gender !== 'all') {
    queryString.set('gender', filters.gender);
  }
  if (filters.cluster !== undefined && filters.cluster !== -1) {
    queryString.set('cluster', filters.cluster.toString());
  }

  const hasFilters = queryString.toString().length > 0;

  return useQuery<Customer[]>({
    queryKey: ["/api/customers/filtered", queryString.toString()],
    enabled: hasFilters,
  });
}

export function useClusters() {
  return useQuery<ClusterAnalysis[]>({
    queryKey: ["/api/clusters"],
  });
}

export function useModelPerformance() {
  return useQuery<ModelPerformance>({
    queryKey: ["/api/model-performance"],
  });
}

export function useSummary() {
  return useQuery<{
    totalCustomers: number;
    avgIncome: number;
    avgSpending: number;
    totalClusters: number;
  }>({
    queryKey: ["/api/summary"],
  });
}
