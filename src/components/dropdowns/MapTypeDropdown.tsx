import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATION_DROPDOWN_TITLE, MAP_TYPES } from "@/constants";
import { formatMapType } from "@/utils";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-semibold">Map Type:</h1>
      <Select
        value={formatMapType(mapType)}
        onValueChange={(value) => setMapType(value as string)}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder={LOCATION_DROPDOWN_TITLE} />
        </SelectTrigger>
        <SelectContent className="z-100">
          <SelectGroup>
            {MAP_TYPES.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {formatMapType(type)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MapTypeDropdown;
