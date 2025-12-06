import { useState } from "react";
import { TypeFilter } from "../TypeFilter";
import type { PokemonType } from "@/lib/pokemon-types";

export default function TypeFilterExample() {
  const [selected, setSelected] = useState<PokemonType[]>(["fire", "water"]);

  const handleToggle = (type: PokemonType) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="p-4 w-full max-w-3xl">
      <TypeFilter
        selectedTypes={selected}
        onToggle={handleToggle}
        onClear={() => setSelected([])}
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Selected: {selected.length > 0 ? selected.join(", ") : "None"}
      </p>
    </div>
  );
}
