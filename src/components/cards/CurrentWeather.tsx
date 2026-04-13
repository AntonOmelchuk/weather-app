import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import { getLocalTime } from "../../utils";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coordinates: { lat: number; lon: number };
};

const CurrentWeather = ({ coordinates }: Props) => {
  const { lat, lon } = coordinates;

  const { data } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData({ lat, lon }),
  });

  const { current } = data || {};

  if (!current || !data) {
    return (
      <Card
        title="Current Weather"
        childrenClassName="flex flex-col items-center"
      >
        <h2 className="text-6xl font-semibold text-center">Loading...</h2>
      </Card>
    );
  }

  const { timezone } = data;
  const { temp, weather, dt, feels_like, humidity, wind_speed } = current;

  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(temp)}°C
        </h2>
        <WeatherIcon
          icon={weather[0].icon}
          className="size-14"
          alt={weather[0].description}
        />
        <h3 className="capitalize text-xl">{weather[0].description}</h3>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xl font-semibold text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold text-center">
          {getLocalTime(timezone, dt)}
        </h3>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <p className="text-2xl font-bold">{Math.round(feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p className="text-2xl font-bold">{Math.round(humidity)}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p className="text-2xl font-bold">{wind_speed} m/s</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
