// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { PokemonAbout } from "@/components/pokemon-about";
import { PokemonEvolution } from "@/components/pokemon-evolution";
import { PokemonStats } from "@/components/pokemon-stats";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import useSWR from "swr";

const Page = ({ params }: { readonly params: { pokemonName: string } }) => {
  const [menu, setMenu] = useState<string>("about");
  const { data, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="absolute left-0 top-0 flex h-full sm:relative">
        loading
      </div>
    );
  }

  let aboutBorder = "";
  switch (menu) {
    case "about":
      aboutBorder = "border-0 rounded-none";
      break;
    case "stats":
      aboutBorder = "border-r border-b rounded-br";
      break;
    case "evolution":
      aboutBorder = "border-b border-r-0 rounded-none";
      break;
    default:
      aboutBorder = "border-0 rounded-none";
      break;
  }

  let statsBorder = "";
  switch (menu) {
    case "about":
      statsBorder = "border-l border-b rounded-bl ";
      break;
    case "stats":
      statsBorder = "border-0 rounded-none";
      break;
    case "evolution":
      statsBorder = "border-b border-r rounded-br";
      break;
    default:
      statsBorder = "border-0 rounded-none";
      break;
  }

  let evolutionBorder = "";
  switch (menu) {
    case "about":
      evolutionBorder = "border-b border-l-0";
      break;
    case "stats":
      evolutionBorder = "border-l border-b rounded-bl";
      break;
    case "evolution":
      evolutionBorder = "border-0 rounded-none";
      break;
    default:
      evolutionBorder = "border-0 rounded-none";
      break;
  }

  const id = "#" + String(data?.id).padStart(3, "0");

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full sm:relative sm:z-0 sm:max-w-[455px]">
      <div
        className="flex h-full w-full flex-col p-4 font-pokemon-classic sm:h-full sm:p-4  md:rounded md:border-2 md:border-black"
        style={{ backgroundColor: `var(--color-${data?.types[0].type.name})` }}
      >
        <div
          className="flex h-1/2 flex-row  flex-wrap content-start items-center justify-between bg-cover bg-no-repeat p-2 md:p-4"
          style={{ backgroundImage: `url(${data?.sprites.front_default}` }}
        >
          <div className=" flex items-baseline gap-2">
            <h1 className="text-4xl">{data?.name}</h1>
            <h2 className="text-2xl">{id}</h2>
          </div>
          <Link className="md:hidden" href="/pokedex">
            <Button className="p-2"> Back </Button>
          </Link>
        </div>
        <div className="flex flex-1 flex-col rounded border-2 border-black bg-white text-lg">
          <ul className="flex flex-row flex-wrap justify-around">
            <li
              className={`flex w-1/3 justify-center ${aboutBorder} cursor-pointer`}
              onClick={() => setMenu("about")}
            >
              About
            </li>
            <li
              className={`flex w-1/3 justify-center ${statsBorder} cursor-pointer`}
              onClick={() => setMenu("stats")}
            >
              Stats{" "}
            </li>
            <li
              className={`flex w-1/3 justify-center ${evolutionBorder} cursor-pointer`}
              onClick={() => setMenu("evolution")}
            >
              Evolution
            </li>
          </ul>

          {menu === "about" && (
            <PokemonAbout
              height={data?.height}
              species={data?.species.url}
              types={data?.types}
              weight={data?.weight}
            />
          )}
          {menu === "stats" && <PokemonStats stats={data?.stats} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
