import { Navbar } from "@/components/navbar";
import { PokemonSide } from "@/components/pokemon-side";
import * as React from "react";

const layout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <main className=" flex h-screen w-screen overflow-hidden bg-[url('/images/grass.png')] font-pokemon-classic">
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="m-12 flex flex-1 justify-between">
          <PokemonSide />
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default layout;
