import { type PokemonData } from "@/components/pokemon-list";
import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/fetcher";
import * as React from "react";
import useSWR from "swr";

export type PokemonType = {
  readonly type: PokemonData;
};

export type PokemonAboutProps = {
  readonly height: number;
  readonly species: string;
  readonly types: PokemonType[];
  readonly weight: number;
};
export const PokemonAbout = ({
  species,
  height,
  weight,
  types,
}: PokemonAboutProps) => {
  const { data, isLoading } = useSWR(species, fetcher);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="p-2">{data.flavor_text_entries[0].flavor_text} </div>
      <div>height : {height}</div>
      <div>weight : {weight}</div>
      <div className="flex gap-1">
        Type :{" "}
        {types.map((value) => (
          <Badge key={value.type.name} variant={value.type.name}>
            {value.type.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
