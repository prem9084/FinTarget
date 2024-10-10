import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns"; // Import the date adapter

// Register necessary components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ data, symbol }) => {
  useEffect(() => {
    const ctx = document.getElementById("chart").getContext("2d");

    // Destroy existing chart instance if it exists (to avoid canvas reuse error)
    let chartInstance;
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "candlestick",
      data: {
        datasets: [
          {
            label: `${symbol} Candlestick Chart`,
            data: data,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas id="chart" />;
};

export default CandlestickChart;
