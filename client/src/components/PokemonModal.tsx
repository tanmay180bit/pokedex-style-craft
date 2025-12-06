import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TYPE_COLORS, type Pokemon, type PokemonType } from "@/lib/pokemon-types";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { FavoriteButton } from "./FavoriteButton";
import { Ruler, Weight, Sparkles } from "lucide-react";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function PokemonModal({
  pokemon,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PokemonModalProps) {
  if (!pokemon) return null;

  const primaryType = pokemon.types[0] as PokemonType;
  const gradient = TYPE_COLORS[primaryType]?.gradient || TYPE_COLORS.normal.gradient;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl p-0 overflow-hidden bg-card border-0 shadow-2xl"
        data-testid="modal-pokemon-detail"
      >
        <div className="flex flex-col md:flex-row">
          <div className={`relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[400px] bg-gradient-to-br ${gradient} p-6`}>
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            </div>
            <div className="absolute top-4 left-4 text-white/40 font-bold text-2xl">
              #{String(pokemon.id).padStart(3, "0")}
            </div>
            <img
              src={pokemon.officialArtwork || pokemon.sprite}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle className="font-display text-3xl font-bold capitalize">
                {pokemon.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details for {pokemon.name} including stats, abilities, and more
              </DialogDescription>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} size="md" />
                ))}
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Ruler className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Weight className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Abilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="px-3 py-1 rounded-full bg-muted text-sm capitalize"
                  >
                    {ability.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Base Stats</h4>
              <div className="space-y-2">
                <StatBar label="hp" value={pokemon.stats.hp} />
                <StatBar label="attack" value={pokemon.stats.attack} />
                <StatBar label="defense" value={pokemon.stats.defense} />
                <StatBar label="specialAttack" value={pokemon.stats.specialAttack} />
                <StatBar label="specialDefense" value={pokemon.stats.specialDefense} />
                <StatBar label="speed" value={pokemon.stats.speed} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
