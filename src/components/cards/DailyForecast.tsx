import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import { formatDateToDay } from "../../utils";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coordinates: { lat: number; lon: number };
};

const DailyForecast = ({ coordinates }: Props) => {
  const { lat, lon } = coordinates;

  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData({ lat, lon }),
  });

  const { daily } = data || {};

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-2">
      {daily?.map(({ dt, weather, temp: { day, min, max } }) => (
        <div key={dt} className="flex justify-between">
          <p className="w-9">{formatDateToDay(dt)}</p>
          <WeatherIcon icon={weather[0].icon} alt={weather[0].description} />
          <p>{Math.round(day)}°C</p>
          <p className="text-gray-500/75">{Math.round(min)}°C</p>
          <p className="text-gray-500/75">{Math.round(max)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default DailyForecast;
