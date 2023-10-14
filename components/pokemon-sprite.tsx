import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import useSWR from "swr";

export type PokemonSpriteProps = {
  readonly name: string;
};

export const PokemonSprite = ({ name }: PokemonSpriteProps) => {
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher,
  );

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-[96px] w-[96px] animate-pulse flex-wrap content-center justify-center">
        <Image
          alt="pokeball"
          height={32}
          src="/images/poke-ball.png"
          width={32}
        />
      </div>
    );
  }

  return (
    <div>
      <Image
        alt={data?.name}
        height={96}
        src={data?.sprites.front_default}
        width={96}
      />
    </div>
  );
};
