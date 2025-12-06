import { Heart } from "lucide-react";
import { useState } from "react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

export function FavoriteButton({ isFavorite, onToggle, size = "md" }: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        ${sizeClasses} rounded-full flex items-center justify-center
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
        shadow-md hover:shadow-lg
        transition-all duration-200
        ${isAnimating ? "animate-pulse-heart" : ""}
      `}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      data-testid="button-favorite"
    >
      <Heart
        className={`
          ${iconSize} transition-colors duration-200
          ${isFavorite 
            ? "fill-red-500 text-red-500" 
            : "fill-transparent text-gray-400 hover:text-red-400"
          }
        `}
      />
    </button>
  );
}
