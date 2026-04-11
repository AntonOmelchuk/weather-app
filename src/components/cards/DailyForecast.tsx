import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import { formatDateToDay } from "../../utils";
import Card from "./Card";

const DailyForecast = () => {
  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchWeatherData({ lat: 50, lon: 50 }),
  });

  return (
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4">
        {data?.daily.map((day) => (
          <div key={day.dt} className="flex justify-between">
            <p className="w-9">{formatDateToDay(day.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              className="size-8"
              alt={day.weather[0].description}
            />
            <p>{Math.round(day.temp.day)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DailyForecast;
