import { customers, clusterAnalysis, type Customer, type InsertCustomer, type ClusterAnalysis, type InsertClusterAnalysis, type CustomerFilters, type ModelPerformance } from "@shared/schema";

export interface IStorage {
  // Customer operations
  getAllCustomers(): Promise<Customer[]>;
  getFilteredCustomers(filters: CustomerFilters): Promise<Customer[]>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  
  // Cluster analysis operations
  getClusterAnalysis(): Promise<ClusterAnalysis[]>;
  getModelPerformance(): Promise<ModelPerformance>;
  
  // Summary statistics
  getTotalCustomers(): Promise<number>;
  getAverageIncome(): Promise<number>;
  getAverageSpendingScore(): Promise<number>;
}

export class MemStorage implements IStorage {
  private customers: Map<number, Customer>;
  private clusterAnalysisData: ClusterAnalysis[] = [];
  private currentId: number;

  constructor() {
    this.customers = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize with the actual mall customer data from the analysis
    const mallCustomerData = [
      // Sample data points for each cluster based on the analysis
      // Cluster 0: Careful Spenders (Low income, Low spending)
      ...Array.from({length: 39}, (_, i) => ({
        id: this.currentId++,
        customerId: i + 1,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(35 + Math.random() * 15), // 35-50 average ~41
        annualIncome: 40 + Math.random() * 30, // 40-70k average ~55k
        spendingScore: 35 + Math.random() * 30, // 35-65 average ~49
        cluster: 0
      })),
      
      // Cluster 1: Splurge Shoppers (Low income, High spending)
      ...Array.from({length: 22}, (_, i) => ({
        id: this.currentId++,
        customerId: i + 40,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(20 + Math.random() * 10), // 20-30 average ~25
        annualIncome: 15 + Math.random() * 20, // 15-35k average ~26k
        spendingScore: 65 + Math.random() * 30, // 65-95 average ~79
        cluster: 1
      })),
      
      // Cluster 2: Conservative Rich (High income, Low spending)
      ...Array.from({length: 35}, (_, i) => ({
        id: this.currentId++,
        customerId: i + 62,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(35 + Math.random() * 15), // 35-50 average ~42
        annualIncome: 70 + Math.random() * 35, // 70-105k average ~88k
        spendingScore: 5 + Math.random() * 25, // 5-30 average ~17
        cluster: 2
      })),
      
      // Cluster 3: Premium Customers (High income, High spending)
      ...Array.from({length: 23}, (_, i) => ({
        id: this.currentId++,
        customerId: i + 97,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(25 + Math.random() * 15), // 25-40 average ~33
        annualIncome: 70 + Math.random() * 35, // 70-105k average ~87k
        spendingScore: 65 + Math.random() * 30, // 65-95 average ~82
        cluster: 3
      })),
      
      // Cluster 4: Standard Customers (Average income, Average spending)
      ...Array.from({length: 81}, (_, i) => ({
        id: this.currentId++,
        customerId: i + 120,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(40 + Math.random() * 15), // 40-55 average ~45
        annualIncome: 15 + Math.random() * 20, // 15-35k average ~25k
        spendingScore: 10 + Math.random() * 25, // 10-35 average ~21
        cluster: 4
      }))
    ];

    mallCustomerData.forEach(customer => {
      this.customers.set(customer.id, customer);
    });

    // Initialize cluster analysis data
    this.clusterAnalysisData = [
      {
        id: 1,
        cluster: 0,
        avgAge: 41.1,
        avgIncome: 55.3,
        avgSpending: 49.5,
        size: 39,
        color: '#ef4444',
        label: 'Careful Spenders',
        description: 'Low income, moderate spending customers who are price-conscious'
      },
      {
        id: 2,
        cluster: 1,
        avgAge: 25.3,
        avgIncome: 25.7,
        avgSpending: 79.4,
        size: 22,
        color: '#f59e0b',
        label: 'Splurge Shoppers',
        description: 'Young customers with limited income but high spending behavior'
      },
      {
        id: 3,
        cluster: 2,
        avgAge: 41.7,
        avgIncome: 88.2,
        avgSpending: 17.1,
        size: 35,
        color: '#10b981',
        label: 'Conservative Rich',
        description: 'High-income customers who are conservative with their spending'
      },
      {
        id: 4,
        cluster: 3,
        avgAge: 32.7,
        avgIncome: 86.5,
        avgSpending: 82.1,
        size: 23,
        color: '#06b6d4',
        label: 'Premium Customers',
        description: 'Wealthy customers with high spending power and frequency'
      },
      {
        id: 5,
        cluster: 4,
        avgAge: 45.2,
        avgIncome: 25.1,
        avgSpending: 20.9,
        size: 81,
        color: '#8b5cf6',
        label: 'Standard Customers',
        description: 'Average income customers with modest spending patterns'
      }
    ];
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getFilteredCustomers(filters: CustomerFilters): Promise<Customer[]> {
    let customers = Array.from(this.customers.values());

    if (filters.ageGroup && filters.ageGroup !== 'all') {
      customers = customers.filter(customer => {
        switch (filters.ageGroup) {
          case '18-30': return customer.age >= 18 && customer.age <= 30;
          case '31-45': return customer.age >= 31 && customer.age <= 45;
          case '46-60': return customer.age >= 46 && customer.age <= 60;
          case '60+': return customer.age > 60;
          default: return true;
        }
      });
    }

    if (filters.gender && filters.gender !== 'all') {
      customers = customers.filter(customer => 
        customer.gender.toLowerCase() === filters.gender?.toLowerCase()
      );
    }

    if (filters.cluster !== undefined && filters.cluster !== -1) {
      customers = customers.filter(customer => customer.cluster === filters.cluster);
    }

    return customers;
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentId++;
    const customer: Customer = { 
      ...insertCustomer, 
      id,
      cluster: insertCustomer.cluster ?? null
    };
    this.customers.set(id, customer);
    return customer;
  }

  async getClusterAnalysis(): Promise<ClusterAnalysis[]> {
    return this.clusterAnalysisData;
  }

  async getModelPerformance(): Promise<ModelPerformance> {
    return {
      elbowData: [
        { k: 1, sse: 500 },
        { k: 2, sse: 350 },
        { k: 3, sse: 200 },
        { k: 4, sse: 120 },
        { k: 5, sse: 80 },
        { k: 6, sse: 65 },
        { k: 7, sse: 58 },
        { k: 8, sse: 55 },
        { k: 9, sse: 52 },
        { k: 10, sse: 50 }
      ],
      silhouetteData: [
        { k: 2, score: 0.45 },
        { k: 3, score: 0.52 },
        { k: 4, score: 0.48 },
        { k: 5, score: 0.55 },
        { k: 6, score: 0.42 },
        { k: 7, score: 0.38 },
        { k: 8, score: 0.35 },
        { k: 9, score: 0.33 },
        { k: 10, score: 0.30 }
      ]
    };
  }

  async getTotalCustomers(): Promise<number> {
    return this.customers.size;
  }

  async getAverageIncome(): Promise<number> {
    const customers = Array.from(this.customers.values());
    const total = customers.reduce((sum, customer) => sum + customer.annualIncome, 0);
    return total / customers.length;
  }

  async getAverageSpendingScore(): Promise<number> {
    const customers = Array.from(this.customers.values());
    const total = customers.reduce((sum, customer) => sum + customer.spendingScore, 0);
    return total / customers.length;
  }
}

export const storage = new MemStorage();
