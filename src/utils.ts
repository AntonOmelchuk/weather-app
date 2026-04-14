import Arrow from "./assets/arrow.svg?react";

export const formatDateToDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const formatDateToHour = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const getLocalTime = (timeZone: string, dt: number) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(dt * 1000));
};

export const formatAddInfoData = (
  data: number,
  type: "uvi" | "sunrise" | "sunset" | "clouds" | "wind_deg" | "pressure",
) => {
  if (type === "uvi") {
    return data.toString();
  }

  if (type === "clouds") {
    return `${data}%`;
  }

  if (type === "wind_deg") {
    return Arrow({
      style: { transform: `rotate(${data}deg)` },
      className: "size-4 invert",
    });
  }

  if (type === "pressure") {
    return `${data} hPa`;
  }

  return getLocalTime("UTC", data);
};

export const formatMapType = (mapType: string) => {
  // remove _new suffix if present and capitalize first letter
  const baseType = mapType.replace("_new", "");
  return baseType.charAt(0).toUpperCase() + baseType.slice(1);
};
