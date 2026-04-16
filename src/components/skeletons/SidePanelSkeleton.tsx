import { Skeleton } from "../ui/skeleton";
import SideCardSkeleton from "./SideCardSkeleton";

const SidePanelSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <Skeleton className="size-12" />
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SidePanelSkeleton;
