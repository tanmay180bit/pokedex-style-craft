import { useState } from "react";
import { PokemonModal } from "../PokemonModal";
import { Button } from "@/components/ui/button";
import type { Pokemon } from "@/lib/pokemon-types";

const mockPokemon: Pokemon = {
  id: 6,
  name: "charizard",
  types: ["fire", "flying"],
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  officialArtwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  stats: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
  abilities: ["Blaze", "Solar Power"],
  height: 17,
  weight: 905,
};

export default function PokemonModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Charizard Details
      </Button>
      <PokemonModal
        pokemon={mockPokemon}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />
    </div>
  );
}
