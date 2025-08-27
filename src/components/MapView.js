import React from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapView = ({ lat, lon, city }) => {
  if (!lat || !lon) return null;

  return (
    <div className="h-[400px] w-full mt-6 rounded-2xl overflow-hidden shadow-md">
      <MapContainer
        center={[lat, lon]}
        zoom={5} // default zoom
        scrollWheelZoom={true}
        zoomControl={false} // disable default so we can reposition
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={[lat, lon]} icon={markerIcon}>
          <Popup>{city || "Selected Location"}</Popup>
        </Marker>

        {/* Zoom Control added (top right corner) */}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default MapView;
