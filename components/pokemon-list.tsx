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
  readonly inputValue: string;
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
  const numberWidthPokemon = Math.trunc(dimensions.width / 96);
  const numberHeightPokemon = Math.trunc(
    (dimensions.height * (5 / 6) - 30) / 96,
  );

  const [totalPokemonByPage, setTotalPokemonByPage] = useState(
    numberWidthPokemon * numberHeightPokemon,
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        height: window.innerHeight,
        width: window.innerWidth < 640 ? window.innerWidth : 863,
      };
      setDimensions(newDimensions);
      setTotalPokemonByPage(numberWidthPokemon * numberHeightPokemon);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const api =
    selectedType === null || selectedType?.label === "all"
      ? `https://pokeapi.co/api/v2/pokemon/?limit=151`
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

  const displayedPokemon = () => {
    const startIndex = (currentPage - 1) * totalPokemonByPage;
    const endIndex = startIndex + totalPokemonByPage;

    const isTypeSelected = selectedType && selectedType.label !== "all";
    const isSearchingPokemon = inputValue.trim() === "";
    let listDisplayedPokemon;

    if (isTypeSelected) {
      listDisplayedPokemon = isSearchingPokemon
        ? (listDisplayedPokemon = data.pokemon)
        : data?.pokemon?.filter((pokemonByType: PokemonDataByType) =>
            pokemonByType.pokemon.name.includes(inputValue.trim()),
          );
    } else {
      listDisplayedPokemon = isSearchingPokemon
        ? (listDisplayedPokemon = data.results)
        : data?.results?.filter((pokemon: PokemonData) =>
            pokemon.name.includes(inputValue.trim()),
          );
    }

    return listDisplayedPokemon.slice(startIndex, endIndex);
  };

  return (
    <div className="flex w-full flex-col md:w-[768px]">
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
              ? currentPage === Math.ceil(151 / totalPokemonByPage)
              : currentPage ===
                Math.ceil(totalPokemonByType / totalPokemonByPage)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <Image alt="arrow" height={24} src="/images/arrow.png" width={24} />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex w-full flex-1 flex-wrap content-center justify-center md:w-[768px]">
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
        <div className="flex w-full flex-wrap justify-center md:w-[768px]">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(" + numberWidthPokemon + " , minmax(0, 96px))",
            }}
          >
            {selectedType?.label === undefined || selectedType?.label === "all"
              ? displayedPokemon().map((pokemon: PokemonData) => (
                  <div key={pokemon.name}>
                    <PokemonSprite url={pokemon.url} />
                  </div>
                ))
              : displayedPokemon().map(
                  (pokemonByType: PokemonDataByType, index: number) =>
                    index < totalPokemonByPage && (
                      <div key={pokemonByType.pokemon.name}>
                        <PokemonSprite url={pokemonByType.pokemon.url} />
                      </div>
                    ),
                )}
          </div>
        </div>
      )}
    </div>
  );
};
