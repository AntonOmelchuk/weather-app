import {
  AirPollutionSchema,
  type AirPollutionType,
} from "./schemes/airPollutionSchema";
import { GeocodeSchema, type GeocodeSchemaType } from "./schemes/geocodeSchema";
import {
  OpenWeatherSchema,
  type OpenWeatherSchemaType,
} from "./schemes/weatherSchema";

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const fetchWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<OpenWeatherSchemaType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return OpenWeatherSchema.parse(data);
};

export const getGeocode = async (
  location: string,
): Promise<GeocodeSchemaType> => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch geocode data");
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error("Location not found");
  }

  return GeocodeSchema.parse(data[0]);
};

export const getAirPollution = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<AirPollutionType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch air pollution data");
  }

  const data = await response.json();
  return AirPollutionSchema.parse(data);
};
