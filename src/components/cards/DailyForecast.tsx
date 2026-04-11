import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import { formatDateToDay } from "../../utils";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

const DailyForecast = () => {
  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchWeatherData({ lat: 50, lon: 50 }),
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-2">
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">{formatDateToDay(day.dt)}</p>
          <WeatherIcon
            icon={day.weather[0].icon}
            alt={day.weather[0].description}
          />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default DailyForecast;
