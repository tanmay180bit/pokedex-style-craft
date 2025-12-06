import { TYPE_COLORS, type PokemonType } from "@/lib/pokemon-types";

interface TypeBadgeProps {
  type: PokemonType;
  size?: "sm" | "md";
  selected?: boolean;
  onClick?: () => void;
}

export function TypeBadge({ type, size = "sm", selected, onClick }: TypeBadgeProps) {
  const colors = TYPE_COLORS[type];
  const isClickable = typeof onClick === "function";
  
  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs" 
    : "px-3 py-1.5 text-sm";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={`
        inline-flex items-center gap-1 rounded-full font-medium capitalize transition-all duration-200
        ${sizeClasses}
        ${colors.bg} ${colors.text}
        ${isClickable ? "cursor-pointer hover-elevate active-elevate-2" : "cursor-default"}
        ${selected ? "ring-2 ring-offset-2 ring-offset-background ring-foreground/50 scale-105" : ""}
        ${!isClickable ? "no-default-hover-elevate no-default-active-elevate" : ""}
      `}
      data-testid={`type-badge-${type}`}
    >
      {type}
    </button>
  );
}
