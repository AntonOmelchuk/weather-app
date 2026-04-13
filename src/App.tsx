import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getGeocode } from "./api";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import Map from "./components/Map";

const App = () => {
  const [coords, setCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });
  const [location, setLocation] = useState<string>("custom");

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

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
    setLocation("");
  };
  console.log("geocodeData: ", geocodeData);
  const { lat, lon } = geocodeData || { lat: 0, lon: 0 };
  const coordinates = location === "custom" ? coords : { lat, lon };

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown location={location} setLocation={setLocation} />
      <Map coordinates={coordinates} onMapClick={onMapClick} />
      <CurrentWeather coordinates={coordinates} />
      <HourlyForecast coordinates={coordinates} />
      <DailyForecast coordinates={coordinates} />
      <AdditionalInfo coordinates={coordinates} />
    </div>
  );
};

export default App;
