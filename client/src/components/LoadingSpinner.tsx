interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={`flex items-center justify-center ${className}`} data-testid="loading-spinner">
      <div className={`${sizes[size]} relative animate-spin-pokeball`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500 to-red-600" style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }} />
        <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-200" style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }} />
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-900 dark:bg-gray-800 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full bg-white border-4 border-gray-900 dark:border-gray-800" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div 
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 aspect-square"
      data-testid="skeleton-card"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" 
        style={{ backgroundSize: "200% 100%" }} 
      />
      <div className="p-4 h-full flex flex-col justify-end gap-2">
        <div className="h-4 w-2/3 rounded bg-muted-foreground/20" />
        <div className="flex gap-1">
          <div className="h-5 w-16 rounded-full bg-muted-foreground/20" />
          <div className="h-5 w-16 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}
