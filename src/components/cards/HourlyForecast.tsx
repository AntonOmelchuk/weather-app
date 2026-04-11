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

  const { hourly } = data || {};

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-auto"
    >
      {hourly?.map(({ dt, weather, temp }) => (
        <div key={dt} className="flex flex-col gap-2 items-center p-2">
          <p className="whitespace-nowrap">{formatDateToHour(dt)}</p>
          <WeatherIcon icon={weather[0].icon} alt={weather[0].description} />
          <p>{Math.round(temp)}°C</p>
        </div>
      ))}
    </Card>
  );
};

export default HourlyForecast;
