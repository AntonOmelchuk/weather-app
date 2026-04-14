import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

import { getGeocode } from "./api";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import Map from "./components/Map";
import AdditionalSkeleton from "./components/skeletons/AdditionalSkeleton";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import { LOCATION_DROPDOWN_TITLE, MAP_TYPES } from "./constants";
import MapLegend from "./MapLegend";

const App = () => {
  const [coords, setCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 41.8933203, lon: 12.4829321 }); // Default to Rome
  const [location, setLocation] = useState<string>(LOCATION_DROPDOWN_TITLE);
  const [mapType, setMapType] = useState<string>(MAP_TYPES[0]);

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
    setLocation(LOCATION_DROPDOWN_TITLE);
  };

  const { lat, lon } = geocodeData || { lat: 0, lon: 0 };
  const coordinates =
    location === LOCATION_DROPDOWN_TITLE ? coords : { lat, lon };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8 p-4">
        <LocationDropdown location={location} setLocation={setLocation} />
        <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
      </div>
      <div className="relative">
        <Map
          coordinates={coordinates}
          onMapClick={onMapClick}
          mapType={mapType}
        />
        <MapLegend mapType={mapType} />
      </div>
      <Suspense fallback={<CurrentSkeleton />}>
        <CurrentWeather coordinates={coordinates} />
      </Suspense>
      <Suspense fallback={<HourlySkeleton />}>
        <HourlyForecast coordinates={coordinates} />
      </Suspense>
      <Suspense fallback={<DailySkeleton />}>
        <DailyForecast coordinates={coordinates} />
      </Suspense>
      <Suspense fallback={<AdditionalSkeleton />}>
        <AdditionalInfo coordinates={coordinates} />
      </Suspense>
    </div>
  );
};

export default App;
