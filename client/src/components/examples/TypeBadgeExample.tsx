import { TypeBadge } from "../TypeBadge";
import { POKEMON_TYPES } from "@/lib/pokemon-types";

export default function TypeBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4 max-w-2xl">
      {POKEMON_TYPES.map((type) => (
        <TypeBadge key={type} type={type} size="md" onClick={() => console.log(`${type} clicked`)} />
      ))}
    </div>
  );
}
