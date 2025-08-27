// src/utils.js
export function getHealthAdvice(aqi) {
  if (aqi <= 50)
    return {
      level: "Good 🟢",
      advice: "Air is clean. No precautions needed.",
      color: "#22c55e",
    };
  if (aqi <= 100)
    return {
      level: "Moderate 🟡",
      advice: "Sensitive individuals should limit outdoor activity.",
      color: "#eab308",
    };
  if (aqi <= 150)
    return {
      level: "Unhealthy for Sensitive Groups 🟠",
      advice: "Wear a mask if you have asthma or allergies.",
      color: "#f97316",
    };
  if (aqi <= 200)
    return {
      level: "Unhealthy 🔴",
      advice: "Avoid outdoor exercise. Keep windows closed.",
      color: "#ef4444",
    };
  if (aqi <= 300)
    return {
      level: "Very Unhealthy 🟣",
      advice: "Wear N95 mask. Use air purifier indoors.",
      color: "#9333ea",
    };
  return {
    level: "Hazardous ⚫",
    advice: "Stay indoors. Emergency conditions for sensitive groups.",
    color: "#111827",
  };
}
