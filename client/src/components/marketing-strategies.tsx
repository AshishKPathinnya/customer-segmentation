import { GlassCard } from "./glass-card";
import { motion } from "framer-motion";
import { 
  PiggyBank, 
  ShoppingBag, 
  Building2, 
  Crown, 
  Users
} from "lucide-react";

const strategies = [
  {
    cluster: 0,
    title: "Careful Spenders",
    description: "Low income, moderate spending customers",
    icon: PiggyBank,
    color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    strategies: [
      "Budget-friendly promotions",
      "Value-for-money products",
      "Loyalty programs"
    ]
  },
  {
    cluster: 1,
    title: "Splurge Shoppers",
    description: "Low income, high spending customers",
    icon: ShoppingBag,
    color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
    strategies: [
      "Impulse buying triggers",
      "Flash sales and discounts",
      "Credit options"
    ]
  },
  {
    cluster: 2,
    title: "Conservative Rich",
    description: "High income, low spending customers",
    icon: Building2,
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    strategies: [
      "Premium quality emphasis",
      "Investment-focused products",
      "Exclusive experiences"
    ]
  },
  {
    cluster: 3,
    title: "Premium Customers",
    description: "High income, high spending customers",
    icon: Crown,
    color: "bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400",
    strategies: [
      "Luxury products and services",
      "VIP treatment programs",
      "Personal shopping assistance"
    ]
  },
  {
    cluster: 4,
    title: "Standard Customers",
    description: "Average income, average spending customers",
    icon: Users,
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    strategies: [
      "Balanced product offerings",
      "Seasonal promotions",
      "Cross-selling opportunities"
    ]
  }
];

export function MarketingStrategies() {
  return (
    <section className="mb-12">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center"
      >
        Marketing Strategies
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => {
          const Icon = strategy.icon;
          return (
            <GlassCard key={strategy.cluster} delay={index * 0.1} className="p-6">
              <div className={`w-12 h-12 ${strategy.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {strategy.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {strategy.description}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {strategy.strategies.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
