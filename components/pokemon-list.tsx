import { type PokemonType } from "@/app/pokedex/page";
import { PokemonSprite } from "@/components/pokemon-sprite";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export type PokemonData = {
  name: string;
  url: string;
};

export type PokemonDataByType = {
  pokemon: PokemonData;
};

export type PokemonSpriteProps = {
  readonly inputValue: string | null;
  readonly selectedType: PokemonType | null;
};

export const PokemonList = ({
  selectedType,
  inputValue,
}: PokemonSpriteProps) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth < 640 ? window.innerWidth : 863,
  });

  const calculateTotalPokemon = () => {
    const numberHeightPokemon = Math.trunc((dimensions.height * (5 / 6)) / 96);
    const numberWidthPokemon = Math.trunc(dimensions.width / 96);
    return numberWidthPokemon * numberHeightPokemon;
  };

  const [totalPokemon, setTotalPokemon] = useState(calculateTotalPokemon());

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        height: window.innerHeight,
        width: window.innerWidth < 640 ? window.innerWidth : 863,
      };
      setDimensions(newDimensions);
      setTotalPokemon(calculateTotalPokemon());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const api =
    selectedType === null || selectedType?.label === "all"
      ? `https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemon}&offset=${
          (currentPage - 1) * totalPokemon
        }`
      : `https://pokeapi.co/api/v2/type/${selectedType?.label}`;

  const { data, error, isLoading } = useSWR(api, fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let totalPokemonByType = 0;

  if (selectedType && selectedType?.label !== "all") {
    data?.pokemon?.map((pokemonByType: PokemonDataByType) => {
      const matches = pokemonByType.pokemon.url.match(/\d+/gu);
      if (matches && Number(matches[1]) < 152) {
        totalPokemonByType++;
      }

      return totalPokemonByType;
    });
  }

  return (
    <div className="flex w-full flex-col sm:w-[864px]">
      <div className="flex w-full flex-row justify-center gap-2">
        <Button
          className="h-10 w-7"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <Image
            alt="arrow"
            className="rotate-180"
            height={24}
            src="/images/arrow.png"
            width={24}
          />
        </Button>

        <div className="flex h-10 w-3/5 flex-wrap content-center justify-center rounded border-2 border-black bg-white text-2xl">
          Box {currentPage}
        </div>
        <Button
          className="h-10 w-7"
          disabled={
            selectedType?.label === undefined || selectedType?.label === "all"
              ? currentPage === Math.ceil(151 / totalPokemon)
              : currentPage === Math.ceil(totalPokemonByType / totalPokemon)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <Image alt="arrow" height={24} src="/images/arrow.png" width={24} />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex w-full flex-1 flex-wrap content-center justify-center sm:w-[864px]">
          <div>
            <Image
              alt="pokeball"
              height={192}
              src="/images/pikachuSprint.gif"
              unoptimized
              width={192}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-wrap justify-center sm:w-[864px]">
          <ul className="flex flex-wrap justify-center overflow-hidden">
            {selectedType?.label === undefined || selectedType?.label === "all"
              ? data?.results?.map((pokemon: PokemonData) => (
                  <li key={pokemon.name}>
                    <PokemonSprite url={pokemon.url} />
                  </li>
                ))
              : data?.pokemon?.map((pokemonByType: PokemonDataByType) => (
                  <li key={pokemonByType.pokemon.name}>
                    <PokemonSprite url={pokemonByType.pokemon.url} />
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};
