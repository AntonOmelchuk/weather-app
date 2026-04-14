import Cloud from "./assets/cloud.svg?react";
import Pressure from "./assets/pressure.svg?react";
import Sunrise from "./assets/sunrise.svg?react";
import Sunset from "./assets/sunset.svg?react";
import Uv from "./assets/uv.svg?react";
import Wind from "./assets/wind.svg?react";

export const LOCATION_DROPDOWN_TITLE = "Select a location";

export const ADDITIONAL_INFO_ROWS = [
  { label: "Cloudiness", value: "clouds", Icon: Cloud },
  { label: "UV Index", value: "uvi", Icon: Uv },
  { label: "Wind Direction", value: "wind_deg", Icon: Wind },
  { label: "Pressure", value: "pressure", Icon: Pressure },
  { label: "Sunrise", value: "sunrise", Icon: Sunrise },
  { label: "Sunset", value: "sunset", Icon: Sunset },
] as const;

export const LOCATIONS = [
  { name: "New York" },
  { name: "London" },
  { name: "Tokyo" },
  { name: "Sydney" },
  { name: "Paris" },
  { name: "Rome" },
  { name: "Beijing" },
  { name: "Mumbai" },
  { name: "Dubai" },
  { name: "Los Angeles" },
  { name: "Berlin" },
  { name: "Madrid" },
];

export const MAP_TYPES = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
