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

type ColorStop = {
  value: number;
  color: string;
};

export const MAP_TYPES_COLORS: Record<
  string,
  { title: string; unit: string; stops: ColorStop[] }
> = {
  precipitation_new: {
    title: "Rain (mm)",
    unit: "mm",
    stops: [
      { value: 0, color: "rgba(225, 200, 100, 0)" },
      { value: 0.1, color: "rgba(200, 150, 150, 0)" },
      { value: 0.2, color: "rgba(150, 150, 170, 0)" },
      { value: 0.5, color: "rgba(120, 120, 190, 0)" },
      { value: 1, color: "rgba(110, 110, 205, 0.3)" },
      { value: 10, color: "rgba(80, 80, 225, 0.7)" },
      { value: 140, color: "rgba(20, 20, 255, 0.9)" },
    ],
  },
  temp_new: {
    title: "Temperature (°C)",
    unit: "°C",
    stops: [
      { value: -65, color: "rgba(130, 22, 146, 1)" },
      { value: -55, color: "rgba(130, 22, 146, 1)" },
      { value: -45, color: "rgba(130, 22, 146, 1)" },
      { value: -40, color: "rgba(130, 22, 146, 1)" },
      { value: -30, color: "rgba(130, 87, 219, 1)" },
      { value: -20, color: "rgba(32, 140, 236, 1)" },
      { value: -10, color: "rgba(32, 196, 232, 1)" },
      { value: 0, color: "rgba(35, 221, 221, 1)" },
      { value: 10, color: "rgba(194, 255, 40, 1)" },
      { value: 20, color: "rgba(255, 240, 40, 1)" },
      { value: 25, color: "rgba(255, 194, 40, 1)" },
      { value: 30, color: "rgba(252, 128, 20, 1)" },
    ],
  },
  clouds_new: {
    title: "Clouds (%)",
    unit: "%",
    stops: [
      { value: 0, color: "rgba(255, 255, 255, 0)" },
      { value: 10, color: "rgba(253, 253, 255, 0.1)" },
      { value: 20, color: "rgba(252, 251, 255, 0.2)" },
      { value: 30, color: "rgba(250, 250, 255, 0.3)" },
      { value: 40, color: "rgba(249, 248, 255, 0.4)" },
      { value: 50, color: "rgba(247, 247, 255, 0.5)" },
      { value: 60, color: "rgba(246, 245, 255, 0.75)" },
      { value: 70, color: "rgba(244, 244, 255, 1)" },
      { value: 80, color: "rgba(243, 242, 255, 1)" },
      { value: 90, color: "rgba(242, 241, 255, 1)" },
      { value: 100, color: "rgba(240, 240, 255, 1)" },
    ],
  },
  pressure_new: {
    title: "Pressure (Pa)",
    unit: "Pa",
    stops: [
      { value: 94000, color: "rgba(0, 115, 255, 1)" },
      { value: 96000, color: "rgba(0, 170, 255, 1)" },
      { value: 98000, color: "rgba(75, 208, 214, 1)" },
      { value: 100000, color: "rgba(141, 231, 199, 1)" },
      { value: 101000, color: "rgba(176, 247, 32, 1)" },
      { value: 102000, color: "rgba(240, 184, 0, 1)" },
      { value: 104000, color: "rgba(251, 85, 21, 1)" },
      { value: 106000, color: "rgba(243, 54, 59, 1)" },
      { value: 108000, color: "rgba(198, 0, 0, 1)" },
    ],
  },
  wind_new: {
    title: "Wind (m/s)",
    unit: "m/s",
    stops: [
      { value: 1, color: "rgba(255, 255, 255, 0)" },
      { value: 5, color: "rgba(238, 206, 206, 0.4)" },
      { value: 15, color: "rgba(179, 100, 188, 0.7)" },
      { value: 25, color: "rgba(63, 33, 59, 0.8)" },
      { value: 50, color: "rgba(116, 76, 172, 0.9)" },
      { value: 100, color: "rgba(70, 0, 175, 1)" },
      { value: 200, color: "rgba(13, 17, 38, 1)" },
    ],
  },
};

export const AIR_QUALITY_LEVELS = {
  poor: "poor",
  moderate: "moderate",
  good: "good",
  fair: "fair",
  very_poor: "very_poor",
};

export const AIR_QUALITY_RANGES = {
  SO2: {
    good: { min: 0, max: 20 },
    fair: { min: 20, max: 80 },
    moderate: { min: 80, max: 250 },
    poor: { min: 250, max: 350 },
    very_poor: { min: 350, max: null },
  },
  NO2: {
    good: { min: 0, max: 40 },
    fair: { min: 40, max: 70 },
    moderate: { min: 70, max: 150 },
    poor: { min: 150, max: 200 },
    very_poor: { min: 200, max: null },
  },
  PM10: {
    good: { min: 0, max: 20 },
    fair: { min: 20, max: 50 },
    moderate: { min: 50, max: 100 },
    poor: { min: 100, max: 200 },
    very_poor: { min: 200, max: null },
  },
  PM2_5: {
    good: { min: 0, max: 10 },
    fair: { min: 10, max: 25 },
    moderate: { min: 25, max: 50 },
    poor: { min: 50, max: 75 },
    very_poor: { min: 75, max: null },
  },
  O3: {
    good: { min: 0, max: 60 },
    fair: { min: 60, max: 100 },
    moderate: { min: 100, max: 140 },
    poor: { min: 140, max: 180 },
    very_poor: { min: 180, max: null },
  },
  CO: {
    good: { min: 0, max: 4400 },
    fair: { min: 4400, max: 9400 },
    moderate: { min: 9400, max: 12400 },
    poor: { min: 12400, max: 15400 },
    very_poor: { min: 15400, max: null },
  },
};
