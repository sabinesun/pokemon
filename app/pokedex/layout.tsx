import { Navbar } from "@/components/navbar";
import { PokemonSide } from "@/components/pokemon-side";
import * as React from "react";

const layout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <main className=" h-screen w-screen overflow-hidden bg-[url('/images/grass.png')] font-pokemon-classic ">
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="m-4 flex flex-1 sm:m-12">
          <PokemonSide />

          <div className="flex flex-1 justify-center">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default layout;
