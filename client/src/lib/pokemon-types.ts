export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export const TYPE_COLORS: Record<PokemonType, { bg: string; text: string; gradient: string }> = {
  normal: { bg: "bg-pokemon-normal", text: "text-white", gradient: "from-pokemon-normal/80 to-pokemon-normal/40" },
  fire: { bg: "bg-pokemon-fire", text: "text-white", gradient: "from-pokemon-fire/80 to-orange-400/40" },
  water: { bg: "bg-pokemon-water", text: "text-white", gradient: "from-pokemon-water/80 to-blue-400/40" },
  electric: { bg: "bg-pokemon-electric", text: "text-gray-900", gradient: "from-pokemon-electric/80 to-yellow-300/40" },
  grass: { bg: "bg-pokemon-grass", text: "text-white", gradient: "from-pokemon-grass/80 to-green-400/40" },
  ice: { bg: "bg-pokemon-ice", text: "text-gray-900", gradient: "from-pokemon-ice/80 to-cyan-300/40" },
  fighting: { bg: "bg-pokemon-fighting", text: "text-white", gradient: "from-pokemon-fighting/80 to-red-600/40" },
  poison: { bg: "bg-pokemon-poison", text: "text-white", gradient: "from-pokemon-poison/80 to-purple-500/40" },
  ground: { bg: "bg-pokemon-ground", text: "text-gray-900", gradient: "from-pokemon-ground/80 to-amber-400/40" },
  flying: { bg: "bg-pokemon-flying", text: "text-white", gradient: "from-pokemon-flying/80 to-indigo-400/40" },
  psychic: { bg: "bg-pokemon-psychic", text: "text-white", gradient: "from-pokemon-psychic/80 to-pink-400/40" },
  bug: { bg: "bg-pokemon-bug", text: "text-white", gradient: "from-pokemon-bug/80 to-lime-500/40" },
  rock: { bg: "bg-pokemon-rock", text: "text-white", gradient: "from-pokemon-rock/80 to-amber-600/40" },
  ghost: { bg: "bg-pokemon-ghost", text: "text-white", gradient: "from-pokemon-ghost/80 to-purple-700/40" },
  dragon: { bg: "bg-pokemon-dragon", text: "text-white", gradient: "from-pokemon-dragon/80 to-violet-600/40" },
  dark: { bg: "bg-pokemon-dark", text: "text-white", gradient: "from-pokemon-dark/80 to-gray-700/40" },
  steel: { bg: "bg-pokemon-steel", text: "text-gray-900", gradient: "from-pokemon-steel/80 to-gray-400/40" },
  fairy: { bg: "bg-pokemon-fairy", text: "text-white", gradient: "from-pokemon-fairy/80 to-pink-300/40" },
};

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  officialArtwork: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}
