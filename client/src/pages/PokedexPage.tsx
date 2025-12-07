import React, { useEffect, useMemo, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  baseExperience: number;
  abilities: string[];
  stats: { name: string; value: number }[];
};

const PAGE_SIZE = 20;
const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const PokedexPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDark, setIsDark] = useState(false);


  // load favorites from localStorage
  // load theme preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("pokedex-theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const enabled = saved ? saved === "dark" : prefersDark;
    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  // apply theme when isDark changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("pokedex-theme", isDark ? "dark" : "light");
  }, [isDark]);


  // fetch first 151 Pokémon
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!res.ok) throw new Error("Failed to load Pokemon");

        const data = await res.json();

        const detailed: Pokemon[] = await Promise.all(
          data.results.map(async (item: any) => {
            const dRes = await fetch(item.url);
            const d = await dRes.json();

            const image =
              d.sprites.other?.["official-artwork"]?.front_default ??
              d.sprites.front_default ??
              "";

            const types = d.types.map(
              (t: { type: { name: string } }) => t.type.name
            );

            const abilities = d.abilities.map(
              (a: { ability: { name: string } }) => a.ability.name
            );

            const stats = d.stats.map(
              (s: { stat: { name: string }; base_stat: number }) => ({
                name: s.stat.name,
                value: s.base_stat,
              })
            );

            return {
              id: d.id,
              name: d.name,
              image,
              types,
              height: d.height,
              weight: d.weight,
              baseExperience: d.base_experience,
              abilities,
              stats,
            };
          })
        );

        setPokemons(detailed);
      } catch (err: any) {
        setError(err?.message ?? "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // filtered + paginated list
  const filtered = useMemo(() => {
    let list = pokemons;

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.id.toString().padStart(3, "0").includes(s)
      );
    }

    if (selectedTypes.length > 0) {
      list = list.filter((p) =>
        selectedTypes.every((t) => p.types.includes(t))
      );
    }

    if (showOnlyFavorites) {
      list = list.filter((p) => favorites.includes(p.id));
    }

    return list;
  }, [pokemons, search, selectedTypes, showOnlyFavorites, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleType = (type: string) => {
    setPage(1);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSearch("");
    setShowOnlyFavorites(false);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex items-center gap-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/40">
              <span className="h-4 w-4 rounded-full bg-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Pokedex Lite</h1>
              <p className="text-xs text-muted-foreground">
                Browse the original 151 Pokémon
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="relative w-full max-w-lg">
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search Pokemon by name or ID..."
                className="w-full rounded-full border border-border bg-background px-10 py-2 text-sm outline-none ring-offset-background transition focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                🔍
              </span>
            </div>

            <button
              onClick={() => setShowOnlyFavorites((v) => !v)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow ${
                showOnlyFavorites
                  ? "border-yellow-400 bg-yellow-400/10 text-yellow-700"
                  : "border-border bg-background"
              }`}
            >
              <span>{showOnlyFavorites ? "★" : "☆"}</span>
              <span>Favorites</span>
            </button>
<button
  type="button"
  onClick={() => setIsDark((v) => !v)}
  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow"
>
  <span>{isDark ? "🌙" : "☀️"}</span>
  <span className="hidden text-xs sm:inline">
    {isDark ? "Dark" : "Light"} mode
  </span>
</button>
          </div>
        </div>
      </header>

      <main className="container space-y-6 py-6">
        {/* Filters */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>⚙</span>
            <span className="font-medium text-foreground">Filter by Type</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_TYPES.map((type) => {
              const isActive = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                    isActive
                      ? "border-sky-500 bg-sky-500/10 text-sky-700"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
          >
            Clear filters
          </button>
        </section>

        {/* Status line */}
        <section className="text-sm text-muted-foreground">
          {isLoading && <span>Loading Pokémon…</span>}
          {!isLoading && error && (
            <span className="text-red-500">Error: {error}</span>
          )}
          {!isLoading && !error && (
            <span>
              Showing{" "}
              <span className="font-semibold">{pageItems.length}</span> of{" "}
              <span className="font-semibold">{filtered.length}</span> Pokémon
            </span>
          )}
        </section>

        {/* Grid */}
       <section
  key={currentPage} // re-mount when page changes → triggers animation
  className="
    grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    animate-in fade-in-0 slide-in-from-bottom duration-300
  "
>
  {!isLoading &&
    !error &&
    pageItems.map((p) => {
      const fav = favorites.includes(p.id);
      return (
        <article
          key={p.id}
          onClick={() => setSelectedPokemon(p)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // don't open modal when star clicked
              toggleFavorite(p.id);
            }}
            className="absolute right-3 top-3 z-10 rounded-full bg-background/80 px-2 py-1 text-xs shadow"
          >
            <span className={fav ? "text-yellow-400" : "text-muted-foreground"}>
              {fav ? "★" : "☆"}
            </span>
          </button>

          <div className="flex flex-col items-center gap-3">
            <div className="relative h-32 w-32">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-contain drop-shadow-lg transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            <div className="w-full space-y-1 text-center">
              <p className="text-xs text-muted-foreground">
                #{String(p.id).padStart(3, "0")}
              </p>
              <h2 className="text-sm font-semibold capitalize">
                {p.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-1 pt-1">
                {p.types.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] capitalize text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      );
    })}
</section>


        {/* Empty state */}
        {!isLoading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-sm text-muted-foreground">
            <span>Nothing matches your filters.</span>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && filtered.length > 0 && (
          <section className="flex items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="text-xs text-muted-foreground">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </section>
        )}
      </main>

      {/* Detail modal */}
      {selectedPokemon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-in fade-in-0"
          onClick={() => setSelectedPokemon(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedPokemon(null)}
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-2">
                <div className="h-32 w-32">
                  {selectedPokemon.image && (
                    <img
                      src={selectedPokemon.image}
                      alt={selectedPokemon.name}
                      className="h-full w-full object-contain drop-shadow-lg"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  #{String(selectedPokemon.id).padStart(3, "0")}
                </p>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-xl font-semibold capitalize">
                    {selectedPokemon.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-1 text-xs">
                    {selectedPokemon.types.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-muted px-2 py-0.5 capitalize text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Height
                    </p>
                    <p className="font-medium">
                      {selectedPokemon.height / 10} m
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Weight
                    </p>
                    <p className="font-medium">
                      {selectedPokemon.weight / 10} kg
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Base XP
                    </p>
                    <p className="font-medium">
                      {selectedPokemon.baseExperience}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Abilities
                    </p>
                    <p className="font-medium capitalize">
                      {selectedPokemon.abilities.join(", ")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    Stats
                  </p>
                  <div className="space-y-1">
                    {selectedPokemon.stats.map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span className="w-20 capitalize text-muted-foreground">
                          {s.name}
                        </span>
                        <div className="flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-sky-500"
                            style={{
                              width: `${Math.min(
                                100,
                                (s.value / 160) * 100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-right text-[10px] text-muted-foreground">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
