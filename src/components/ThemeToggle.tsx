import { useTheme } from "@/ThemeProvider";

import MoonIcon from "../assets/moon.svg?react";
import SunIcon from "../assets/sun.svg?react";
import { Switch } from "./ui/switch";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 pl-4 xs:pl-0">
      <SunIcon className="size-5" />
      <Switch
        className="cursor:poiner"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <MoonIcon className="size-5" />
    </div>
  );
};

export default ThemeToggle;
