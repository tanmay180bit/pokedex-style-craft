import { EmptyState } from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="grid md:grid-cols-3 gap-8 p-4">
      <EmptyState type="no-results" />
      <EmptyState type="no-favorites" />
      <EmptyState type="error" onRetry={() => console.log("Retry clicked")} />
    </div>
  );
}
