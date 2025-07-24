import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  gender: text("gender").notNull(),
  age: integer("age").notNull(),
  annualIncome: real("annual_income").notNull(),
  spendingScore: real("spending_score").notNull(),
  cluster: integer("cluster"),
});

export const clusterAnalysis = pgTable("cluster_analysis", {
  id: serial("id").primaryKey(),
  cluster: integer("cluster").notNull(),
  avgAge: real("avg_age").notNull(),
  avgIncome: real("avg_income").notNull(),
  avgSpending: real("avg_spending").notNull(),
  size: integer("size").notNull(),
  color: text("color").notNull(),
  label: text("label").notNull(),
  description: text("description").notNull(),
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
});

export const insertClusterAnalysisSchema = createInsertSchema(clusterAnalysis).omit({
  id: true,
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type ClusterAnalysis = typeof clusterAnalysis.$inferSelect;
export type InsertClusterAnalysis = z.infer<typeof insertClusterAnalysisSchema>;

export interface CustomerFilters {
  ageGroup?: string;
  gender?: string;
  cluster?: number;
}

export interface ModelPerformance {
  elbowData: { k: number; sse: number }[];
  silhouetteData: { k: number; score: number }[];
}
