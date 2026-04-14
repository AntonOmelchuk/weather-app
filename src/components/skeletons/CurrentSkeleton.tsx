import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const CurrentSkeleton = () => {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 items-center">
        <Skeleton className="w-30 h-15" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-36 h-7" />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xl font-semibold text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold text-center">
          <Skeleton className="w-36 h-10" />
        </h3>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <Skeleton className="w-16 h-6" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="w-16 h-6" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <Skeleton className="w-16 h-6" />
        </div>
      </div>
    </Card>
  );
};

export default CurrentSkeleton;
