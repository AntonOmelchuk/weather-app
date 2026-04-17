import { useSuspenseQuery } from "@tanstack/react-query";

import { ADDITIONAL_INFO_ROWS } from "@/constants";

import { fetchWeatherData } from "../../api";
import { formatAddInfoData } from "../../utils";
import Card from "./Card";

type Props = {
  coordinates: { lat: number; lon: number };
};

const AdditionalInfo = ({ coordinates }: Props) => {
  const { lat, lon } = coordinates;

  const { data } = useSuspenseQuery({
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
        ADDITIONAL_INFO_ROWS.map(({ label, value, Icon }) => (
          <div key={label} className="flex justify-between">
            <div className="flex gap-4">
              <span className="text-gray-500">{label}</span>
              <Icon className="w-6 h-6" />
            </div>
            <span>{formatAddInfoData(current?.[value], value)}</span>
          </div>
        ))}
    </Card>
  );
};

export default AdditionalInfo;
