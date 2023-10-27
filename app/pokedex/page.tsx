// eslint-disable-next-line canonical/filename-match-exported
"use client";
import { Navbar } from "@/components/navbar";
import { PokemonSide } from "@/components/pokemon-side";
import * as React from "react";

export type PokemonType = {
  label: string;
  value: string;
};

const PokedexPage = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')]  font-pokemon-classic">
      <div className="flex h-full w-full flex-col justify-between">
        <Navbar />
        <PokemonSide />
      </div>
    </main>
  );
};

export default PokedexPage;
