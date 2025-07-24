import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

Chart.register(...registerables);

interface LineChartProps {
  data: { k: number; value: number }[];
  title: string;
  yAxisLabel: string;
  color: string;
}

export function LineChart({ data, title, yAxisLabel, color }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.map(d => d.k.toString()),
        datasets: [{
          label: yAxisLabel,
          data: data.map(d => d.value),
          borderColor: color,
          backgroundColor: `${color}20`,
          borderWidth: 3,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          fill: true,
          tension: 0.4
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
            title: { 
              display: true, 
              text: 'Number of Clusters (k)', 
              color: '#6b7280',
              font: { size: 12, weight: 'bold' }
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
  }, [data, yAxisLabel, color]);

  return <canvas ref={canvasRef} />;
}
