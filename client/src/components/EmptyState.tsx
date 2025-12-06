import { SearchX, Heart, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "no-results" | "no-favorites" | "error";
  message?: string;
  onRetry?: () => void;
}

export function EmptyState({ type, message, onRetry }: EmptyStateProps) {
  const config = {
    "no-results": {
      icon: SearchX,
      title: "No Pokemon Found",
      description: message || "Try adjusting your search or filters to find what you're looking for.",
    },
    "no-favorites": {
      icon: Heart,
      title: "No Favorites Yet",
      description: "Start exploring and add some Pokemon to your favorites collection!",
    },
    error: {
      icon: AlertCircle,
      title: "Something Went Wrong",
      description: message || "We couldn't load the Pokemon data. Please try again.",
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      data-testid={`empty-state-${type}`}
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2" data-testid="button-retry">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
