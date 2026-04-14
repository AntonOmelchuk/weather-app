import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const AdditionalSkeleton = () => {
  return (
    <Card
      title="Additional Information"
      childrenClassName="flex flex-col gap-8"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="size-6 rounded-full" />
          </div>
          <Skeleton className="size-6" />
        </div>
      ))}
    </Card>
  );
};

export default AdditionalSkeleton;
