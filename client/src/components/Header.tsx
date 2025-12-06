import { Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  showFavoritesOnly: boolean;
}

export function Header({
  searchValue,
  onSearchChange,
  favoritesCount,
  onFavoritesClick,
  theme,
  onThemeToggle,
  showFavoritesOnly,
}: HeaderProps) {
  return (
    <header 
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-800" />
            </div>
            <h1 className="font-display font-bold text-lg md:text-xl hidden sm:block">
              Pokedex Lite
            </h1>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="default"
              onClick={onFavoritesClick}
              className="relative gap-2"
              data-testid="button-favorites"
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Favorites</span>
              {favoritesCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 min-w-[1.25rem] h-5">
                  {favoritesCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
}
