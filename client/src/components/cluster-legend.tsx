import { motion } from "framer-motion";
import type { ClusterAnalysis } from "@shared/schema";

interface ClusterLegendProps {
  clusters: ClusterAnalysis[];
}

export function ClusterLegend({ clusters }: ClusterLegendProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6">
      {clusters.map((cluster, index) => (
        <motion.div
          key={cluster.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: cluster.color }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {cluster.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
