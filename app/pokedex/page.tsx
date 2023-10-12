"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PokemonSprite } from "@/components/pokemon-sprite";

const PokemonList = () => {
  const {
    data: pokemonList,
    error: pokemonlistError,
    isLoading: pokemonListIsLoading,
  } = useSWR("https://pokeapi.co/api/v2/pokemon/?limit=151", fetcher);

  if (pokemonlistError) {
    return <div>Error: {pokemonlistError.message}</div>;
  }

  if (pokemonListIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')] p-4 font-pokemon-classic">
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="text-6xl">MY POKEDEX</h1>
        <div className="flex h-5/6 w-full gap-5">
          <div className=" flex w-8/12 max-w-[864px] flex-wrap overflow-y-scroll ">
            <ul className="flex flex-wrap">
              {pokemonList.results.map((pokemon: any) => (
                <li key={pokemon.name}>
                  <PokemonSprite name={pokemon.name}></PokemonSprite>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full flex-1 rounded border-8 border-double border-black bg-white px-4"></div>
        </div>
      </div>
    </main>
  );
};

export default PokemonList;
