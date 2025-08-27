// src/components/SearchBar.js
import React, { useState } from "react";
import { Grid, TextField, Button, Paper } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    if (city.trim() === "" && country.trim() === "") {
      alert("Please enter at least a city or country.");
      return;
    }
    onSearch(city, state, country);
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
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
            label="Country"
            variant="outlined"
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Paper>
  );
};

export default SearchBar;
