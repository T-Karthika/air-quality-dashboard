// src/components/PollutantChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PollutantChart = ({ pollutants }) => {
  if (!pollutants) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Pollutant data will appear here 🌫️
      </div>
    );
  }

  // format data for Recharts
  const data = [
    { name: "PM2.5", value: pollutants.pm2_5 },
    { name: "PM10", value: pollutants.pm10 },
    { name: "CO", value: pollutants.co },
    { name: "NO₂", value: pollutants.no2 },
    { name: "SO₂", value: pollutants.so2 },
    { name: "O₃", value: pollutants.o3 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Pollutant Concentrations (µg/m³)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PollutantChart;
