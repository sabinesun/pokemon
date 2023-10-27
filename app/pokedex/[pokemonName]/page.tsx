// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { PokemonAbout } from "@/components/pokemon-about";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";

const Page = ({ params }: { readonly params: { pokemonName: string } }) => {
  const { data, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`,
    fetcher,
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  const id = "#" + String(data?.id).padStart(3, "0");

  return (
    <div className="flex h-full ">
      <div
        className="flex h-full flex-col p-4 font-pokemon-classic sm:h-full sm:p-4  md:rounded md:border-2 md:border-black"
        style={{ backgroundColor: `var(--color-${data.types[0].type.name})` }}
      >
        <div className="flex flex-wrap items-center justify-between p-2 md:p-4">
          <div className=" flex items-baseline gap-2">
            <h1 className="text-4xl">{data.name}</h1>
            <h2 className="text-2xl">{id}</h2>
          </div>
          <Link className="md:hidden" href="/pokedex">
            <Button className="p-2"> Back </Button>
          </Link>
        </div>
        <div className="flex h-1/2 justify-center">
          <div
            className="flex h-full w-full flex-wrap  justify-center bg-cover bg-no-repeat text-3xl"
            style={{ backgroundImage: `url(${data?.sprites.front_default}` }}
          />
        </div>
        <div className="flex flex-1 flex-col rounded border-2 border-black bg-white text-lg">
          <ul className="flex flex-row flex-wrap justify-around border-b p-1">
            <li>About</li>
            <li>Stats</li>
            <li>Evolution</li>
          </ul>
          <PokemonAbout
            height={data.height}
            species={data.species.url}
            types={data.types}
            weight={data.weight}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
