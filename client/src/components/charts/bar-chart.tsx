import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import type { ClusterAnalysis } from "@shared/schema";

Chart.register(...registerables);

interface BarChartProps {
  clusters: ClusterAnalysis[];
  dataKey: 'avgAge' | 'avgIncome' | 'avgSpending';
  title: string;
  yAxisLabel: string;
}

export function BarChart({ clusters, dataKey, title, yAxisLabel }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || clusters.length === 0) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: clusters.map(c => `Cluster ${c.cluster}`),
        datasets: [{
          data: clusters.map(c => c[dataKey]),
          backgroundColor: clusters.map(c => c.color),
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
          }
        },
        scales: {
          y: {
            title: { 
              display: true, 
              text: yAxisLabel, 
              color: '#6b7280',
              font: { size: 12, weight: 'bold' }
            },
            grid: { color: 'rgba(107, 114, 128, 0.1)' },
            ticks: { color: '#6b7280' }
          },
          x: {
            grid: { display: false },
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
  }, [clusters, dataKey, yAxisLabel]);

  return <canvas ref={canvasRef} />;
}
