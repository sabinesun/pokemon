import { type PokemonType } from "@/app/pokedex/page";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import useSWR from "swr";

export type PokemonSpriteProps = {
  readonly url: string;
};

export const PokemonSprite = ({ url }: PokemonSpriteProps) => {
  const { data, error } = useSWR(`${url}`, fetcher);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data?.id < 152 && (
        <Image
          alt={data?.name}
          height={96}
          src={data?.sprites.front_default}
          width={96}
        />
      )}
    </div>
  );
};
