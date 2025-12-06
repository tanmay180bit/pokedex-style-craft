import { useState } from "react";
import { FavoriteButton } from "../FavoriteButton";

export default function FavoriteButtonExample() {
  const [fav1, setFav1] = useState(false);
  const [fav2, setFav2] = useState(true);

  return (
    <div className="flex items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton isFavorite={fav1} onToggle={() => setFav1(!fav1)} size="md" />
        <span className="text-xs text-muted-foreground">Not favorited</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FavoriteButton isFavorite={fav2} onToggle={() => setFav2(!fav2)} size="md" />
        <span className="text-xs text-muted-foreground">Favorited</span>
      </div>
    </div>
  );
}
