import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  Trigger: ReactNode;
  text: string;
};

const CustomTooltilp = ({ Trigger, text }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer">{Trigger}</TooltipTrigger>
      <TooltipContent className="z-2000">
        <p className="max-w-xs">{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltilp;
