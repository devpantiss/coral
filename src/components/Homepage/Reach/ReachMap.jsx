import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon with a specific color using L.DivIcon
const customMarker = new L.DivIcon({
  className: "custom-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path fill="#2563eb" d="M12 2C8.1 2 5 5.1 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
        </svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Define the locations for Odisha districts
const locations = [
  {
    name: "Bhubaneswar",
    coords: [20.2961, 85.8245],
    details: "The capital city of Odisha, known for its temples and IT hubs.",
  },
  {
    name: "Cuttack",
    coords: [20.4625, 85.8828],
    details: "A major city and industrial hub, often called the Millennium City.",
  },
  {
    name: "Koraput",
    coords: [18.8166, 82.7103],
    details: "A scenic district with rich tribal culture and natural beauty.",
  },
  {
    name: "Berhampur",
    coords: [19.3115, 84.7929],
    details: "A major commercial city in southern Odisha.",
  },
  {
    name: "Jajapur",
    coords: [20.8378, 86.3377],
    details: "Known for its rich heritage and chromite mining.",
  },
  {
    name: "Baleshwar",
    coords: [21.4934, 86.9332],
    details: "Famous for Chandipur beach and defense research facilities.",
  },
  {
    name: "Bhadrak",
    coords: [21.0574, 86.4958],
    details: "A district known for agriculture and its historic importance.",
  },
];

// API Key
const api_key = "8f741830-1254-408f-a58c-cdbbf7deba3c"; // Replace with your actual API key

const MapComponent = () => {
  return (
    <MapContainer
      center={[20.9517, 85.0985]} // Center the map on Odisha
      zoom={7} // Adjust the zoom level for better focus on Odisha
      style={{ height: "600px", width: "100%" }}
      scrollWheelZoom={false}
    >
      {/* Use a colorful-themed tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url={`https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=${api_key}`} // Colorful-themed tile layer
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.coords} icon={customMarker}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div>
              <strong>{location.name}</strong>
              <br />
              {location.details}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
