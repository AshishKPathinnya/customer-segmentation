import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  ShoppingCart, 
  Sun, 
  Moon, 
  Download,
  PieChart
} from "lucide-react";

import { GlassCard } from "@/components/glass-card";
import { MetricCard } from "@/components/metric-card";

import { ClusterLegend } from "@/components/cluster-legend";
import { MarketingStrategies } from "@/components/marketing-strategies";
import { ScatterChart } from "@/components/charts/scatter-chart";
import { ScatterChart3D } from "@/components/charts/scatter-chart-3d";
import { BarChart } from "@/components/charts/bar-chart";
import { DoughnutChart } from "@/components/charts/doughnut-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";

import { 
  useCustomers, 
  useClusters, 
  useModelPerformance, 
  useSummary 
} from "@/hooks/use-customer-data";
import { exportToCSV } from "@/lib/customer-data";

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  const [viewMode, setViewMode] = useState<'scatter' | '3d'>('scatter');

  const { data: allCustomers, isLoading: customersLoading } = useCustomers();

  const { data: clusters, isLoading: clustersLoading } = useClusters();
  const { data: modelPerformance, isLoading: performanceLoading } = useModelPerformance();
  const { data: summary, isLoading: summaryLoading } = useSummary();

  // Use all customers and original cluster data
  const displayCustomers = allCustomers || [];
  const displayClusters = clusters || [];

  const handleExport = () => {
    exportToCSV();
  };

  if (customersLoading || clustersLoading || performanceLoading || summaryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-700 ease-in-out overflow-x-hidden scroll-smooth page-transition">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <PieChart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Customer Analytics
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Mall Customer Segmentation</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative backdrop-blur-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:scale-105 transition-all duration-300 rounded-xl shadow-md"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </Button>
              
              <Button
                onClick={handleExport}
                className="backdrop-blur-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 text-white font-semibold px-6 py-2 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <section className="py-16 text-center">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="relative">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
                  Customer Segmentation
                  <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"> 
                    Intelligence Dashboard
                  </span>
                </h2>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl dark:from-indigo-400/10 dark:to-purple-400/10"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl dark:from-blue-400/10 dark:to-indigo-400/10"></div>
              </div>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed"
              >
                Unlock powerful insights from <span className="font-semibold text-indigo-600 dark:text-indigo-400">{summary?.totalCustomers || 200} mall customers</span> using 
                advanced K-Means clustering analysis and interactive visualizations
              </motion.p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 pt-4"
              >
                <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Machine Learning
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                  Data Visualization
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                  Business Intelligence
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Key Metrics */}
          <motion.section 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Customers"
                value={summary?.totalCustomers || 0}
                icon={<Users className="w-6 h-6" />}
                color="bg-blue-100 dark:bg-blue-900"
                delay={0}
              />
              <MetricCard
                title="Customer Segments"
                value={summary?.totalClusters || 5}
                icon={<BarChart3 className="w-6 h-6" />}
                color="bg-purple-100 dark:bg-purple-900"
                delay={0.1}
              />
              <MetricCard
                title="Avg Income"
                value={`$${summary?.avgIncome?.toFixed(1) || 60.6}k`}
                icon={<DollarSign className="w-6 h-6" />}
                color="bg-green-100 dark:bg-green-900"
                delay={0.2}
              />
              <MetricCard
                title="Avg Spending Score"
                value={summary?.avgSpending?.toFixed(1) || 50.2}
                icon={<ShoppingCart className="w-6 h-6" />}
                color="bg-orange-100 dark:bg-orange-900"
                delay={0.3}
              />
            </div>
          </motion.section>

          {/* Main Visualization */}
          <motion.section 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <GlassCard className="p-8 shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Customer Segmentation Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Interactive visualization of customer clusters</p>
                </div>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'scatter' | '3d')} className="mt-6 sm:mt-0">
                  <TabsList className="backdrop-blur-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                    <TabsTrigger value="scatter" className="font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                      Scatter Plot
                    </TabsTrigger>
                    <TabsTrigger value="3d" className="font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                      3D View
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="h-[500px] mb-6 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                {displayCustomers.length > 0 ? (
                  viewMode === 'scatter' ? (
                    <ScatterChart customers={displayCustomers} />
                  ) : (
                    <ScatterChart3D customers={displayCustomers} />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400">Loading customer data...</p>
                  </div>
                )}
              </div>
              
              {displayClusters && <ClusterLegend clusters={displayClusters} />}
            </GlassCard>
          </motion.section>

          {/* Cluster Analysis */}
          <motion.section 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
                Cluster Characteristics
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Detailed analysis of customer segments and their behavioral patterns
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <GlassCard className="p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                      Average Age by Cluster
                    </h4>
                  </div>
                  <div className="h-72 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50 p-4">
                    {displayClusters && <BarChart clusters={displayClusters} dataKey="avgAge" title="Age" yAxisLabel="Average Age" />}
                  </div>
                </GlassCard>
              </motion.div>
              
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <GlassCard className="p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                      Average Income by Cluster
                    </h4>
                  </div>
                  <div className="h-72 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50 p-4">
                    {displayClusters && <BarChart clusters={displayClusters} dataKey="avgIncome" title="Income" yAxisLabel="Average Income (k$)" />}
                  </div>
                </GlassCard>
              </motion.div>
              
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <GlassCard className="p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                      Average Spending Score by Cluster
                    </h4>
                  </div>
                  <div className="h-72 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50 p-4">
                    {displayClusters && <BarChart clusters={displayClusters} dataKey="avgSpending" title="Spending" yAxisLabel="Average Spending Score" />}
                  </div>
                </GlassCard>
              </motion.div>
              
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <GlassCard className="p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                      Cluster Distribution
                    </h4>
                  </div>
                  <div className="h-72 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50 p-4">
                    {displayClusters && <DoughnutChart clusters={displayClusters} />}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.section>

          {/* Model Performance */}
          <motion.section 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
                Model Performance Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Evaluation metrics to validate the optimal number of clusters
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard className="p-6" delay={0}>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Elbow Method
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Optimal number of clusters determination
                </p>
                <div className="h-64">
                  {modelPerformance && (
                    <LineChart 
                      data={modelPerformance.elbowData.map(d => ({ k: d.k, value: d.sse }))}
                      title="Elbow Method"
                      yAxisLabel="Sum of Squared Errors"
                      color="#8b5cf6"
                    />
                  )}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6" delay={0.1}>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Silhouette Score
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Cluster quality assessment
                </p>
                <div className="h-64">
                  {modelPerformance && (
                    <LineChart 
                      data={modelPerformance.silhouetteData.map(d => ({ k: d.k, value: d.score }))}
                      title="Silhouette Score"
                      yAxisLabel="Silhouette Score"
                      color="#06b6d4"
                    />
                  )}
                </div>
              </GlassCard>
            </div>
          </motion.section>

          {/* Marketing Strategies */}
          <MarketingStrategies />

          {/* Footer */}
          <footer className="py-12">
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Ready to implement these insights?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Transform your customer data into actionable marketing strategies
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform">
                <PieChart className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </GlassCard>
          </footer>

        </div>
      </div>
    </div>
  );
}
