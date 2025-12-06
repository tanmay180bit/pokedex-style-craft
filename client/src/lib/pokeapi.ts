import type { Pokemon, PokemonType } from "./pokemon-types";

const BASE_URL = "https://pokeapi.co/api/v2";

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface PokemonApiResponse {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string } }>;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
  height: number;
  weight: number;
}

function transformPokemon(data: PokemonApiResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name as PokemonType),
    sprite: data.sprites.front_default,
    officialArtwork: data.sprites.other["official-artwork"].front_default,
    stats: {
      hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
      attack: data.stats.find((s) => s.stat.name === "attack")?.base_stat || 0,
      defense: data.stats.find((s) => s.stat.name === "defense")?.base_stat || 0,
      specialAttack: data.stats.find((s) => s.stat.name === "special-attack")?.base_stat || 0,
      specialDefense: data.stats.find((s) => s.stat.name === "special-defense")?.base_stat || 0,
      speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat || 0,
    },
    abilities: data.abilities.map((a) => a.ability.name),
    height: data.height,
    weight: data.weight,
  };
}

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<{ pokemon: Pokemon[]; total: number }> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon list");
  
  const data: PokemonListResponse = await response.json();
  
  const pokemonDetails = await Promise.all(
    data.results.map(async (item) => {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`Failed to fetch ${item.name}`);
      const pokemonData: PokemonApiResponse = await res.json();
      return transformPokemon(pokemonData);
    })
  );

  return {
    pokemon: pokemonDetails,
    total: data.count,
  };
}

export async function fetchPokemonById(id: number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch Pokemon #${id}`);
  const data: PokemonApiResponse = await response.json();
  return transformPokemon(data);
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error(`Failed to fetch ${name}`);
  const data: PokemonApiResponse = await response.json();
  return transformPokemon(data);
}

export async function searchPokemon(query: string, allPokemon: Pokemon[]): Promise<Pokemon[]> {
  const lowerQuery = query.toLowerCase();
  return allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(lowerQuery) ||
    pokemon.id.toString() === query
  );
}

export function filterByTypes(pokemon: Pokemon[], types: PokemonType[]): Pokemon[] {
  if (types.length === 0) return pokemon;
  return pokemon.filter((p) => p.types.some((t) => types.includes(t)));
}
