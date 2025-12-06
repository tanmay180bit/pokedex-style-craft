interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

const STAT_COLORS: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

export function StatBar({ label, value, maxValue = 255, color }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const barColor = color || STAT_COLORS[label.toLowerCase().replace(" ", "-")] || "bg-primary";
  
  const displayLabel = label
    .replace("special-attack", "Sp. Atk")
    .replace("special-defense", "Sp. Def")
    .replace("specialAttack", "Sp. Atk")
    .replace("specialDefense", "Sp. Def");

  return (
    <div className="flex items-center gap-3" data-testid={`stat-bar-${label}`}>
      <span className="text-xs font-medium text-muted-foreground w-16 capitalize">
        {displayLabel}
      </span>
      <span className="text-xs font-bold w-8 text-right">{value}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
