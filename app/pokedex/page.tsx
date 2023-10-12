"use client";

export type Pokemon = {
  name: string;
  url: string;
};

const PokemonList = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')] p-4 font-pokemon-classic">
      <div className="h-full w-full">
        <h1 className="text-6xl">MY POKEDEX</h1>
        <div className="flex h-full w-full gap-5">
          <div className=" flex h-full w-8/12 flex-wrap overflow-y-scroll "></div>
          <div className="h-5/6 flex-1 rounded border-8 border-double border-black bg-white px-4"></div>
        </div>
      </div>
    </main>
  );
};

export default PokemonList;
