// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { PokemonList } from "@/components/pokemon-list";
import { ComboboxPopover } from "@/components/ui/combobox";
import * as React from "react";
import { useState } from "react";

export type PokemonType = {
  label: string;
  value: string;
};

const PokedexPage = () => {
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')]  font-pokemon-classic">
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="p-4 text-6xl">MY POKEDEX</h1>
        <div className="flex">
          <ComboboxPopover
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        <div className="flex h-5/6 w-full gap-5">
          <PokemonList />
        </div>
      </div>
    </main>
  );
};

export default PokedexPage;
