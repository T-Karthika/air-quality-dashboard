// src/components/AQICard.js
import React from "react";
import { getHealthAdvice } from "../utils";



const AQICard = ({ aqi }) => {
  if (!aqi) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Search a city to see air quality 🌍
      </div>
    );
  }

  // get category + advice from helper
  const { level, advice, color } = getHealthAdvice(aqi);

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-2xl shadow-lg text-center`}
      style={{ backgroundColor: color }}
    >
      <h2 className="text-xl font-bold text-white mb-2">
        Current Air Quality Index (AQI)
      </h2>
      <p className="text-4xl font-extrabold text-white">{aqi}</p>
      <p className="text-lg font-medium text-white mt-2">{level}</p>
      <p className="text-white mt-4 italic">{advice}</p>
    </div>
  );
};

export default AQICard;
