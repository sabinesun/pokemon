// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { PokemonList } from "@/components/pokemon-list";
import { Button } from "@/components/ui/button";
import { ComboboxPopover } from "@/components/ui/combobox";
import * as React from "react";
import { useState } from "react";

const PokedexPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const pokemonTypes = [
    "all",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')]  font-pokemon-classic">
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="p-4 text-6xl">MY POKEDEX</h1>
        <div className="flex sm:hidden">
          <ComboboxPopover
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <ul className="hidden flex-row flex-wrap gap-1 sm:flex ">
          {pokemonTypes.map((pokemonType) => (
            <li key={pokemonType}>
              <Button onClick={() => setSelectedType(pokemonType)} size="sm">
                {pokemonType}
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex h-5/6 w-full gap-5">
          <PokemonList />
        </div>
      </div>
    </main>
  );
};

export default PokedexPage;
