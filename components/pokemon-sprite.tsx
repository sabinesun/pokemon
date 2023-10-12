import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";

export type PokemonSpriteProps = {
  name: string;
};

export const PokemonSprite = ({ name }: PokemonSpriteProps) => {
  const {
    data: pokemonData,
    error: pokemonDataError,
    isLoading: pokemonDataIsLoading,
  } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`, fetcher);

  if (pokemonDataError) {
    return <div>Error</div>;
  }

  if (pokemonDataIsLoading) {
    return (
      <div className="flex h-[96px] w-[96px] animate-pulse flex-wrap content-center justify-center">
        <Image
          src={"/images/poke-ball.png"}
          alt={"pokeball"}
          width={32}
          height={32}
        ></Image>
      </div>
    );
  }
  return (
    <div>
      <Image
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        width={96}
        height={96}
      />
    </div>
  );
};
