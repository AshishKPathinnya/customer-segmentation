import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import type { Customer } from "@shared/schema";

Chart.register(...registerables);

interface ScatterChartProps {
  customers: Customer[];
}

export function ScatterChart({ customers }: ScatterChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || customers.length === 0) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const clusterColors = {
      0: '#ef4444',
      1: '#f59e0b',
      2: '#10b981',
      3: '#06b6d4',
      4: '#8b5cf6'
    };

    // Group customers by cluster
    const clusters = customers.reduce((acc, customer) => {
      const cluster = customer.cluster ?? 0;
      if (!acc[cluster]) acc[cluster] = [];
      acc[cluster].push(customer);
      return acc;
    }, {} as Record<number, Customer[]>);

    const datasets = Object.entries(clusters).map(([clusterNum, clusterCustomers]) => ({
      label: `Cluster ${clusterNum}`,
      data: clusterCustomers.map(customer => ({
        x: customer.annualIncome,
        y: customer.spendingScore
      })),
      backgroundColor: clusterColors[parseInt(clusterNum) as keyof typeof clusterColors],
      borderColor: clusterColors[parseInt(clusterNum) as keyof typeof clusterColors],
      pointRadius: 6,
      pointHoverRadius: 8,
    }));

    const config: ChartConfiguration = {
      type: 'scatter',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            callbacks: {
              label: function(context: any) {
                return `Income: $${context.parsed.x.toFixed(1)}k, Spending: ${context.parsed.y.toFixed(1)}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { 
              display: true, 
              text: 'Annual Income (k$)', 
              color: '#6b7280',
              font: { size: 14, weight: 'bold' }
            },
            grid: { color: 'rgba(107, 114, 128, 0.1)' },
            ticks: { color: '#6b7280' }
          },
          y: {
            title: { 
              display: true, 
              text: 'Spending Score (1-100)', 
              color: '#6b7280',
              font: { size: 14, weight: 'bold' }
            },
            grid: { color: 'rgba(107, 114, 128, 0.1)' },
            ticks: { color: '#6b7280' }
          }
        }
      }
    };

    chartRef.current = new Chart(ctx, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [customers]);

  return <canvas ref={canvasRef} />;
}
