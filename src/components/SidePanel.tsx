import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { type Dispatch, type SetStateAction, Suspense } from "react";

import { getAirPollution } from "@/api";
import {
  AIR_QUALITY_LEVELS,
  AIR_QUALITY_RANGES,
  POLLUTANT_NAME_MAPPING,
} from "@/constants";

import ChevronIcon from "../assets/chevron-left.svg?react";
import InfoIcon from "../assets/info.svg?react";
import Card from "./cards/Card";
import CustomTooltilp from "./CustomTooltilp";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";
import { Progress } from "./ui/progress";

type Props = {
  coordinates: {
    lat: number;
    lon: number;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SidePanel = ({ coordinates, isOpen, setIsOpen }: Props) => {
  const { lat, lon } = coordinates;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-30 py-8 px-4 overflow-y-scroll transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsOpen(false)}>
        <ChevronIcon className="size-8 -ml-2 cursor-pointer" />
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution lat={lat} lon={lon} />
      </Suspense>
    </div>
  );
};

const AirPollution = ({ lat, lon }: Props["coordinates"]) => {
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
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <CustomTooltilp
          Trigger={<InfoIcon className="size-3" />}
          text="Air Quality Index.
            Possible values: 1, 2, 3, 4, 5.
            Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor."
        />
      </div>
      {Object.entries(components).map(([key, value]) => {
        const pollutant =
          AIR_QUALITY_RANGES[
            key.toUpperCase() as keyof typeof AIR_QUALITY_RANGES
          ];
        if (!pollutant) return null;

        const max = Math.max(pollutant.very_poor.min, value);
        const percentage = (value / max) * 100;

        const pollutantName =
          POLLUTANT_NAME_MAPPING[
            key.toUpperCase() as keyof typeof POLLUTANT_NAME_MAPPING
          ];

        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <CustomTooltilp
                  Trigger={<InfoIcon className="size-3" />}
                  text={`Concentration of ${pollutantName}`}
                />
              </div>
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
