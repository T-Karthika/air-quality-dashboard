import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PollutionChart = ({ data }) => {
  if (!data || !data.list) return <p>No pollution data available.</p>;

  const chartData = {
    labels: data.list.map((item, index) => `Hour ${index + 1}`),
    datasets: [
      {
        label: "PM2.5 Levels",
        data: data.list.map((item) => item.components.pm2_5),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Line data={chartData} />
    </div>
  );
};

export default PollutionChart;
