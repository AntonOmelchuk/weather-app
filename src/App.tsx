import { useEffect, useState } from "react";

import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import Map from "./components/Map";

const App = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8">
      <Map coordinates={coordinates} onMapClick={onMapClick} />
      <CurrentWeather coordinates={coordinates} />
      <HourlyForecast coordinates={coordinates} />
      <DailyForecast coordinates={coordinates} />
      <AdditionalInfo coordinates={coordinates} />
    </div>
  );
};

export default App;
