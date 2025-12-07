import React, { useState } from "react";
import { PokedexPage } from "./pages/PokedexPage";
import { AuthDemo } from "./pages/AuthDemo";

export default function App() {
  const [view, setView] = useState<"pokedex" | "auth">("pokedex");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Small switch bar at the top */}
      <div className="border-b border-border bg-background/80">
        <div className="container flex gap-2 py-2 text-xs">
          
          {/* Switch to Pokedex */}
          <button
            type="button"
            onClick={() => setView("pokedex")}
            className={`rounded-full border px-3 py-1 transition ${
              view === "pokedex"
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            Pokedex
          </button>

          {/* Switch to OAuth Demo */}
          <button
            type="button"
            onClick={() => setView("auth")}
            className={`rounded-full border px-3 py-1 transition ${
              view === "auth"
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            OAuth Demo
          </button>
        </div>
      </div>
      {/* Animated View */}
      <div
        key={view}
        className="animate-in fade-in-0 slide-in-from-right duration-300"
      >
        {view === "pokedex" ? <PokedexPage /> : <AuthDemo />}
      </div>
    </div>
  );
}
