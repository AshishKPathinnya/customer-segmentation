import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const filtersSchema = z.object({
  ageGroup: z.string().optional(),
  gender: z.string().optional(),
  cluster: z.coerce.number().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all customers
  app.get("/api/customers", async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  // Get filtered customers
  app.get("/api/customers/filtered", async (req, res) => {
    try {
      const filters = filtersSchema.parse(req.query);
      const customers = await storage.getFilteredCustomers(filters);
      res.json(customers);
    } catch (error) {
      res.status(400).json({ error: "Invalid filters" });
    }
  });

  // Get cluster analysis
  app.get("/api/clusters", async (req, res) => {
    try {
      const clusters = await storage.getClusterAnalysis();
      res.json(clusters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cluster analysis" });
    }
  });

  // Get model performance data
  app.get("/api/model-performance", async (req, res) => {
    try {
      const performance = await storage.getModelPerformance();
      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch model performance data" });
    }
  });

  // Get summary statistics
  app.get("/api/summary", async (req, res) => {
    try {
      const [totalCustomers, avgIncome, avgSpending] = await Promise.all([
        storage.getTotalCustomers(),
        storage.getAverageIncome(),
        storage.getAverageSpendingScore()
      ]);

      res.json({
        totalCustomers,
        avgIncome: Math.round(avgIncome * 10) / 10,
        avgSpending: Math.round(avgSpending * 10) / 10,
        totalClusters: 5
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch summary statistics" });
    }
  });

  // Download CSV file
  app.get("/api/download-csv", async (req, res) => {
    try {
      const csvPath = "./public/Mall_Customers.csv";
      res.download(csvPath, "Mall_Customers.csv", (err) => {
        if (err) {
          res.status(500).json({ error: "Failed to download CSV file" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to download CSV file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
