import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import { formatDateToHour } from "../../utils";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

const HourlyForecast = () => {
  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchWeatherData({ lat: 50, lon: 50 }),
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-auto"
    >
      {data?.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
          <p className="whitespace-nowrap">{formatDateToHour(hour.dt)}</p>
          <WeatherIcon
            icon={hour.weather[0].icon}
            alt={hour.weather[0].description}
          />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default HourlyForecast;
