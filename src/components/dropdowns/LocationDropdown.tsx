import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATION_DROPDOWN_TITLE, LOCATIONS } from "@/constants";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const LocationDropdown = ({ location, setLocation }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-sm xs:text-2xl font-semibold">Location:</h1>
      <Select
        value={location}
        onValueChange={(value) => setLocation(value as string)}
      >
        <SelectTrigger className="w-40 xl:w-45">
          <SelectValue placeholder={LOCATION_DROPDOWN_TITLE} />
        </SelectTrigger>
        <SelectContent className="z-100">
          <SelectGroup>
            {LOCATIONS.map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationDropdown;
