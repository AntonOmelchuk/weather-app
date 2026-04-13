import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "../../api";
import Cloud from "../../assets/cloud.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Uv from "../../assets/uv.svg?react";
import Wind from "../../assets/wind.svg?react";
import { formatAddInfoData } from "../../utils";
import Card from "./Card";

type Props = {
  coordinates: { lat: number; lon: number };
};

const rows = [
  { label: "Cloudiness", value: "clouds", Icon: Cloud },
  { label: "UV Index", value: "uvi", Icon: Uv },
  { label: "Wind Direction", value: "wind_deg", Icon: Wind },
  { label: "Pressure", value: "pressure", Icon: Pressure },
  { label: "Sunrise", value: "sunrise", Icon: Sunrise },
  { label: "Sunset", value: "sunset", Icon: Sunset },
] as const;

const AdditionalInfo = ({ coordinates }: Props) => {
  const { lat, lon } = coordinates;

  const { data } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeatherData({ lat, lon }),
  });

  const { current } = data || {};

  return (
    <Card
      title="Additional Information"
      childrenClassName="flex flex-col gap-8"
    >
      {current &&
        rows.map(({ label, value, Icon }) => (
          <div key={label} className="flex justify-between">
            <div className="flex gap-4">
              <span className="text-gray-500">{label}</span>
              <Icon className="w-6 h-6 invert" />
            </div>
            <span>{formatAddInfoData(current?.[value], value)}</span>
          </div>
        ))}
    </Card>
  );
};

export default AdditionalInfo;
