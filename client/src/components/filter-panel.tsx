import { GlassCard } from "./glass-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";

interface FilterPanelProps {
  filters: {
    ageGroup: string;
    gender: string;
    cluster: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleFilterChange = React.useCallback((key: string, value: string) => {
    try {
      onFilterChange(key, value);
    } catch (error) {
      console.error('Filter change error:', error);
    }
  }, [onFilterChange]);

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Age Group
          </Label>
          <Select value={filters.ageGroup} onValueChange={(value) => handleFilterChange('ageGroup', value)}>
            <SelectTrigger className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="18-30">18-30 years</SelectItem>
              <SelectItem value="31-45">31-45 years</SelectItem>
              <SelectItem value="46-60">46-60 years</SelectItem>
              <SelectItem value="60+">60+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Gender
          </Label>
          <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
            <SelectTrigger className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Cluster
          </Label>
          <Select value={filters.cluster} onValueChange={(value) => handleFilterChange('cluster', value)}>
            <SelectTrigger className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10">
              <SelectValue placeholder="Select cluster" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">All Clusters</SelectItem>
              <SelectItem value="0">Cluster 0 - Careful Spenders</SelectItem>
              <SelectItem value="1">Cluster 1 - Splurge Shoppers</SelectItem>
              <SelectItem value="2">Cluster 2 - Conservative Rich</SelectItem>
              <SelectItem value="3">Cluster 3 - Premium Customers</SelectItem>
              <SelectItem value="4">Cluster 4 - Standard Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </GlassCard>
  );
}
