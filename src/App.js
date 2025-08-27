import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import AQICard from "./components/AQICard";
import PollutantChart from "./components/PollutantChart";
import MapView from "./components/MapView";

const App = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [aqi, setAqi] = useState(null);
  const [pollutants, setPollutants] = useState(null);
  const [coords, setCoords] = useState(null);
  const [locationLabel, setLocationLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 🌙 toggle

  const API_KEY = "d77583817021c60fe7a81e55c92a9d8f";

  const handleSearch = async () => {
    let query = city;
    if (state) query += `,${state}`;
    if (country) query += `,${country}`;

    if (!query) {
      alert("Please enter at least a city or country");
      return;
    }

    setLocationLabel(query);
    setLoading(true);

    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );

      if (geoRes.data.length === 0) {
        alert("City/State/Country not found ❌");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoRes.data[0];
      setCoords({ lat, lon });

      const airRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const airData = airRes.data.list[0];
      setAqi(airData.main.aqi * 50);
      setPollutants(airData.components);
    } catch (err) {
      console.error(err);
      alert("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* ☁️ Clouds (light mode) */}
      {!darkMode && (
        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="cloud cloud4"></div>
          <div className="cloud cloud3"></div> 
        </div>
      )}

      {/* 🌙 Moon + Stars (dark mode) */}
      {darkMode && (
        <div className="night-sky">
          <div className="moon"></div>
          <div className="stars"></div>

          {/* ✨ Random stars */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <Container
        maxWidth="md"
        style={{ marginTop: "20px", position: "relative", zIndex: 1 }}
      >
        <Paper
          className="frosted"
          style={{ padding: "20px", borderRadius: "20px" }}
        >
          <Typography variant="h5" gutterBottom>
            🌦 AIR QUALITY DASHBOARD 🌦
          </Typography>

          {/* 🌞/🌙 toggle button */}
          <Button
            variant="outlined"
            onClick={() => setDarkMode(!darkMode)}
            style={{ marginBottom: "15px" }}
          >
            {darkMode ? "☀️ Switch to Day" : "🌙 Switch to Night"}
          </Button>

          {/* Search Fields */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="State (optional)"
                variant="outlined"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Country Code"
                variant="outlined"
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Paper>

        {loading && (
          <Typography align="center" style={{ marginTop: "20px" }}>
            <CircularProgress /> Fetching data...
          </Typography>
        )}

        {aqi && <AQICard aqi={aqi} />}
        {pollutants && <PollutantChart pollutants={pollutants} />}
        {coords && <MapView lat={coords.lat} lon={coords.lon} city={locationLabel} />}
      </Container>
    </div>
  );
};

export default App;
