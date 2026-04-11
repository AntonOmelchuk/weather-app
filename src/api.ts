import { type OpenWeather, OpenWeatherSchema } from "./schemes/weatherScheme";

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const fetchWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<OpenWeather> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return OpenWeatherSchema.parse(data);
};
