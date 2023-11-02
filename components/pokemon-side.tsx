"use client";

import { type PokemonType } from "@/app/pokedex/page";
import { ClientOnly } from "@/components/client-only";
import { FilterType } from "@/components/filter-type";
import { PokemonList } from "@/components/pokemon-list";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState } from "react";

export const PokemonSide = () => {
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div>
      <div className="flex w-full gap-2 px-2 md:w-[768px] ">
        <FilterType
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <Input
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Pokemon name"
          value={inputValue}
        />
      </div>
      <div className="flex h-5/6 w-full gap-5">
        <ClientOnly>
          <PokemonList inputValue={inputValue} selectedType={selectedType} />
        </ClientOnly>
      </div>
    </div>
  );
};
