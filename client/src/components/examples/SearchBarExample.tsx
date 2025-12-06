import { useState } from "react";
import { SearchBar } from "../SearchBar";

export default function SearchBarExample() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 w-full max-w-lg">
      <SearchBar value={search} onChange={setSearch} />
      {search && (
        <p className="mt-4 text-sm text-muted-foreground">
          Searching for: <span className="font-medium text-foreground">{search}</span>
        </p>
      )}
    </div>
  );
}
