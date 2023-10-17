import { PokemonSprite } from "@/components/pokemon-sprite";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export type PokemonData = {
  name: string;
};

export const PokemonList = () => {
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

  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemon}&offset=${
      (currentPage - 1) * totalPokemon
    }`,
    fetcher,
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pokemonData: PokemonData[] | undefined = data?.results;

  const renderLoadingPlaceholders = (count: number) => {
    const placeholders = [];
    for (let index = 0; index < count; index++) {
      placeholders.push(
        <li key={`placeholder-${index}`}>
          <div className="flex h-[96px] w-[96px] flex-wrap content-center justify-center">
            <Image
              alt="pokeball"
              height={32}
              priority
              src="/images/poke-ball.png"
              width={32}
            />
          </div>
        </li>,
      );
    }

    return placeholders;
  };

  return (
    <div className="flex w-full flex-col sm:w-[864px]">
      <div className="flex w-full flex-row justify-center gap-2">
        <Button
          className="w-7"
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
          className="w-7"
          disabled={
            currentPage === Math.ceil(data?.results.count / totalPokemon)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <Image alt="arrow" height={24} src="/images/arrow.png" width={24} />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex w-full flex-wrap sm:w-[864px]">
          <ul className="flex flex-wrap justify-center overflow-hidden">
            {renderLoadingPlaceholders(totalPokemon)}
          </ul>
        </div>
      ) : (
        <div className="flex w-full flex-wrap sm:w-[864px]">
          <ul className="flex flex-wrap justify-center overflow-hidden">
            {pokemonData?.map((pokemon) => (
              <li key={pokemon.name}>
                <PokemonSprite name={pokemon.name} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
