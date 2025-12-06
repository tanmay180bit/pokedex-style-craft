import { useState } from "react";
import { Header } from "../Header";

export default function HeaderExample() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showFav, setShowFav] = useState(false);

  return (
    <div className="w-full">
      <Header
        searchValue={search}
        onSearchChange={setSearch}
        favoritesCount={5}
        onFavoritesClick={() => setShowFav(!showFav)}
        theme={theme}
        onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        showFavoritesOnly={showFav}
      />
    </div>
  );
}
