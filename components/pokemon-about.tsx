import { type PokemonData } from "@/components/pokemon-list";
import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/fetcher";
import * as React from "react";
import { PiGenderFemale, PiGenderMale } from "react-icons/pi";
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

export type PokemonFlavorText = {
  readonly flavor_text: string;
  readonly language: PokemonData;
};
export const PokemonAbout = ({
  species,
  height,
  weight,
  types,
}: PokemonAboutProps) => {
  const { data, isLoading } = useSWR(species, fetcher);

  const femaleRate = (data?.gender_rate / 8) * 100;

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex max-h-56 flex-1 flex-col justify-between p-4 ">
      <div className="leading-5">
        {
          data?.flavor_text_entries.find(
            (flavorText: PokemonFlavorText) =>
              flavorText.language.name === "en",
          ).flavor_text
        }
      </div>
      <div>
        <div className="flex items-center ">
          <div className="w-1/3">Type </div>
          <div className="flex flex-1 gap-1">
            {types?.map((value) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <Badge key={value.type.name} variant={value.type.name}>
                {value.type.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center ">
          <div className="w-1/3">Height </div>
          <div className="flex flex-1 gap-1">
            {" "}
            {(height * 0.1).toFixed(2)} m
          </div>
        </div>
        <div className="flex items-center ">
          <div className="w-1/3"> Weight</div>
          <div className="flex flex-1 gap-1">{(weight * 0.1).toFixed(2)}kg</div>
        </div>
        <div className="flex items-center ">
          <div className="w-1/3">Gender</div>
          <div className="flex flex-1 gap-3">
            <div className="flex items-center ">
              <PiGenderFemale className="text-[#D8308A]" />
              {femaleRate} %
            </div>
            <div className="flex items-center ">
              <PiGenderMale className="text-[#54A9DD]" /> {100 - femaleRate} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
