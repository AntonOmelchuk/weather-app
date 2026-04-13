import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type Props = {
  coordinates: { lat: number; lon: number };
  onMapClick: (lat: number, lon: number) => void;
};

const Map = ({ coordinates, onMapClick }: Props) => {
  const { lat, lon } = coordinates;

  return (
    <MapContainer
      key={`${lat}-${lon}`} // Додаємо ключ для примусового оновлення карти при зміні координат
      center={[lat, lon]}
      zoom={5}
      style={{
        width: "98%",
        height: "500px",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const MapClick = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) => {
  const map = useMap();

  map.on("click", ({ latlng }) => {
    const { lat, lng } = latlng;
    onMapClick(lat, lng);

    map.panTo([lat, lng]);
  });

  return null;
};

export default Map;
