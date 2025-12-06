import { TypeBadge } from "./TypeBadge";
import { POKEMON_TYPES, type PokemonType } from "@/lib/pokemon-types";
import { Filter } from "lucide-react";

interface TypeFilterProps {
  selectedTypes: PokemonType[];
  onToggle: (type: PokemonType) => void;
  onClear: () => void;
}

export function TypeFilter({ selectedTypes, onToggle, onClear }: TypeFilterProps) {
  return (
    <div className="w-full" data-testid="type-filter-container">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Filter by Type</span>
        {selectedTypes.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto text-xs text-primary hover:underline"
            data-testid="button-clear-filters"
          >
            Clear all ({selectedTypes.length})
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 pb-2 md:pb-0 overflow-x-auto md:overflow-visible scrollbar-hide">
        {POKEMON_TYPES.map((type) => (
          <TypeBadge
            key={type}
            type={type}
            size="md"
            selected={selectedTypes.includes(type)}
            onClick={() => onToggle(type)}
          />
        ))}
      </div>
    </div>
  );
}
