// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { PokemonList } from "@/components/pokemon-list";

const PokedexPage = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')]  font-pokemon-classic">
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="p-4 text-6xl">MY POKEDEX</h1>
        <div className="flex h-5/6 w-full gap-5">
          <PokemonList />
        </div>
      </div>
    </main>
  );
};

export default PokedexPage;
