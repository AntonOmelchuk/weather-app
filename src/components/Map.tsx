import "leaflet/dist/leaflet.css";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type Props = {
  coordinates: { lat: number; lon: number };
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

const Map = ({ coordinates, onMapClick, mapType }: Props) => {
  const { lat, lon } = coordinates;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{
        marginLeft: "16px",
        marginRight: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
      className="h-75 xs:h-125"
    >
      <MapClick onMapClick={onMapClick} coordinates={coordinates} />
      <MapTileLayer />
      <TileLayer
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        attribution='&copy; <a href="https://www.openweathermap.org/">OpenWeatherMap</a>'
        zIndex={2}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

const MapClick = ({
  onMapClick,
  coordinates,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coordinates: { lat: number; lon: number };
}) => {
  const map = useMap();

  const { lat, lon } = coordinates;

  map.panTo([lat, lon]);

  map.on("click", ({ latlng }) => {
    const { lat, lng } = latlng;
    onMapClick(lat, lng);
  });

  return null;
};

const MapTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: MAPTILER_API_KEY,
    });

    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

export default Map;
