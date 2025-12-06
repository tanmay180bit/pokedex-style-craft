import { useState, useEffect, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { TypeFilter } from "@/components/TypeFilter";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonModal } from "@/components/PokemonModal";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner, SkeletonCard } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { useFavorites } from "@/hooks/use-favorites";
import { useTheme } from "@/hooks/use-theme";
import { fetchPokemonList, filterByTypes } from "@/lib/pokeapi";
import type { Pokemon, PokemonType } from "@/lib/pokemon-types";

const POKEMON_PER_PAGE = 20;
const TOTAL_POKEMON = 151;

export default function Pokedex() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  const loadPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { pokemon } = await fetchPokemonList(TOTAL_POKEMON, 0);
      setAllPokemon(pokemon);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  const filteredPokemon = useMemo(() => {
    let result = allPokemon;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.toString() === query.trim()
      );
    }

    result = filterByTypes(result, selectedTypes);

    if (showFavoritesOnly) {
      result = result.filter((p) => favorites.has(p.id));
    }

    return result;
  }, [allPokemon, searchQuery, selectedTypes, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);
  
  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * POKEMON_PER_PAGE;
    return filteredPokemon.slice(start, start + POKEMON_PER_PAGE);
  }, [filteredPokemon, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTypes, showFavoritesOnly]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredPokemon.length, currentPage]);

  const handleTypeToggle = useCallback((type: PokemonType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedTypes([]);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="pokedex-page">
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favoritesCount}
        onFavoritesClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        theme={theme}
        onThemeToggle={toggleTheme}
        showFavoritesOnly={showFavoritesOnly}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <TypeFilter
            selectedTypes={selectedTypes}
            onToggle={handleTypeToggle}
            onClear={handleClearFilters}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center gap-8 py-16">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground">Loading Pokemon...</p>
          </div>
        ) : error ? (
          <EmptyState type="error" message={error} onRetry={loadPokemon} />
        ) : paginatedPokemon.length === 0 ? (
          showFavoritesOnly ? (
            <EmptyState type="no-favorites" />
          ) : (
            <EmptyState type="no-results" />
          )
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {paginatedPokemon.length} of {filteredPokemon.length} Pokemon
              {showFavoritesOnly && " (Favorites only)"}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {paginatedPokemon.map((pokemon, index) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFavorite(pokemon.id)}
                  onToggleFavorite={() => toggleFavorite(pokemon.id)}
                  onClick={() => setSelectedPokemon(pokemon)}
                  animationDelay={index * 50}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 mb-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </main>

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        isFavorite={selectedPokemon ? isFavorite(selectedPokemon.id) : false}
        onToggleFavorite={() => selectedPokemon && toggleFavorite(selectedPokemon.id)}
      />

      <footer className="border-t border-border py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            Data provided by{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              PokeAPI
            </a>
          </p>
          <p className="mt-1">Pokedex Lite - A Pokemon Explorer</p>
        </div>
      </footer>
    </div>
  );
}
