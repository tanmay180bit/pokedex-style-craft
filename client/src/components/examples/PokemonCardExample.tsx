import { useState } from "react";
import { PokemonCard } from "../PokemonCard";
import type { Pokemon } from "@/lib/pokemon-types";

const mockPokemon: Pokemon[] = [
  {
    id: 6,
    name: "charizard",
    types: ["fire", "flying"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    officialArtwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    stats: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
    abilities: ["Blaze", "Solar Power"],
    height: 17,
    weight: 905,
  },
  {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    officialArtwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
    abilities: ["Static", "Lightning Rod"],
    height: 4,
    weight: 60,
  },
  {
    id: 150,
    name: "mewtwo",
    types: ["psychic"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    officialArtwork: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    stats: { hp: 106, attack: 110, defense: 90, specialAttack: 154, specialDefense: 90, speed: 130 },
    abilities: ["Pressure", "Unnerve"],
    height: 20,
    weight: 1220,
  },
];

export default function PokemonCardExample() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set([25]));

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-w-2xl">
      {mockPokemon.map((pokemon, i) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.has(pokemon.id)}
          onToggleFavorite={() => toggleFavorite(pokemon.id)}
          onClick={() => console.log(`Clicked ${pokemon.name}`)}
          animationDelay={i * 100}
        />
      ))}
    </div>
  );
}
