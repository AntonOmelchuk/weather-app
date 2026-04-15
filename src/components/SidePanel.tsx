import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Suspense } from "react";

import { getAirPollution } from "@/api";
import { AIR_QUALITY_LEVELS, AIR_QUALITY_RANGES } from "@/constants";

import Card from "./cards/Card";
import { Progress } from "./ui/progress";

type Props = {
  coordinates: {
    lat: number;
    lon: number;
  };
};

const SidePanel = ({ coordinates }: Props) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-30 py-8 px-4 overflow-y-scroll">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <AirPollution coordinates={coordinates} />
      </Suspense>
    </div>
  );
};

const AirPollution = ({ coordinates }: Props) => {
  const { lat, lon } = coordinates;

  const { data } = useSuspenseQuery({
    queryKey: ["airPollution", lat, lon],
    queryFn: () => getAirPollution({ lat, lon }),
  });

  const {
    main: { aqi },
    components,
  } = data.list[0];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{aqi}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {Object.entries(components).map(([key, value]) => {
        const pollutant =
          AIR_QUALITY_RANGES[
            key.toUpperCase() as keyof typeof AIR_QUALITY_RANGES
          ];
        if (!pollutant) return null;

        const max = Math.max(pollutant.very_poor.min, value);
        const percentage = (value / max) * 100;

        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
          >
            <div className="flex justify-between">
              <span className="text-lg font-bold capitalize">{key}</span>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Progress value={percentage} />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(pollutant).map((level) => {
                // determine the current level of pollution based on the value and the ranges defined in AIR_QUALITY_RANGES
                const currentLevel = Object.entries(pollutant).find(
                  ([, range]) => {
                    if (range.max === null) {
                      return value >= range.min;
                    }
                    return value >= range.min && value < range.max;
                  },
                )?.[0];

                return (
                  <span
                    key={level}
                    className={clsx(
                      "px-1 py-1 rounded-md text-xs font-medium capitalize",
                      // set background color based on the current level of pollution
                      currentLevel === level
                        ? level === AIR_QUALITY_LEVELS.good
                          ? "bg-green-500"
                          : level === AIR_QUALITY_LEVELS.fair
                            ? "bg-yellow-500"
                            : level === AIR_QUALITY_LEVELS.moderate
                              ? "bg-orange-500"
                              : level === AIR_QUALITY_LEVELS.poor
                                ? "bg-red-500"
                                : "bg-red-700"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {level.replace("_", " ")}
                  </span>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SidePanel;
