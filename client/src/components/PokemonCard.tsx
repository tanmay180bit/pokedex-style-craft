import { TYPE_COLORS, type Pokemon, type PokemonType } from "@/lib/pokemon-types";
import { TypeBadge } from "./TypeBadge";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  animationDelay?: number;
}

export function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
  animationDelay = 0,
}: PokemonCardProps) {
  const primaryType = pokemon.types[0] as PokemonType;
  const gradient = TYPE_COLORS[primaryType]?.gradient || TYPE_COLORS.normal.gradient;

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl overflow-visible cursor-pointer
        bg-gradient-to-br ${gradient}
        aspect-square
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        opacity-0 animate-fade-in-up
        group
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`card-pokemon-${pokemon.id}`}
    >
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
      </div>

      <div className="absolute top-2 left-3 text-white/30 font-bold text-lg">
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4 pt-8">
        <img
          src={pokemon.officialArtwork || pokemon.sprite}
          alt={pokemon.name}
          className="w-full h-full object-contain drop-shadow-lg 
            transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="font-display font-bold text-white capitalize text-sm md:text-base truncate">
          {pokemon.name}
        </h3>
        <div className="flex gap-1 mt-1 flex-wrap">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
