import { type PokemonType } from "@/app/pokedex/page";
import { FilterType } from "@/components/filter-type";
import { PokemonList } from "@/components/pokemon-list";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState } from "react";

export const PokemonSide = () => {
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
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
        <PokemonList inputValue={inputValue} selectedType={selectedType} />
      </div>
    </>
  );
};
