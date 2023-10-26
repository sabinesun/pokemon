import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
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
    <div className="h-[96px]">
      {data?.id < 152 && (
        <Link href={"/pokedex/" + data?.name}>
          <Image
            alt={data?.name}
            height={96}
            src={data?.sprites.versions["generation-viii"].icons.front_default}
            width={96}
          />
        </Link>
      )}
    </div>
  );
};
