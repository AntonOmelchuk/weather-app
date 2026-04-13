import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const locations = [
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

const LocationDropdown = ({ location, setLocation }: Props) => {
  return (
    <Select
      value={location}
      onValueChange={(value) => setLocation(value as string)}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent className="z-100">
        <SelectGroup>
          {locations.map(({ name }) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
