import { LoadingSpinner, SkeletonCard } from "../LoadingSpinner";

export default function LoadingSpinnerExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-end gap-8">
        <LoadingSpinner size="sm" />
        <LoadingSpinner size="md" />
        <LoadingSpinner size="lg" />
      </div>
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
