import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export type PokemonSpriteProps = {
  readonly url: string;
};

export const PokemonSprite = ({ url }: PokemonSpriteProps) => {
  const { data, error } = useSWR(`${url}`, fetcher);

  const pathname = usePathname();

  const currentPokemon =
    pathname.split("/")[pathname.split("/").length - 1] === data?.name;

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="group h-[96px]">
      {currentPokemon && (
        <Image
          alt="cursor"
          className="absolute z-10 hidden -translate-y-6 translate-x-14 -rotate-[135deg] sm:flex"
          height={36}
          src="/images/cursor.svg"
          width={36}
        />
      )}
      {data?.id < 152 && (
        <Link href={"/pokedex/" + data?.name}>
          <Image
            alt={data?.name}
            className={`group-hover:-translate-y-1/3 ${
              currentPokemon && "sm:-translate-y-1/3"
            }`}
            height={96}
            src={data?.sprites.versions["generation-viii"].icons.front_default}
            width={96}
          />
        </Link>
      )}
    </div>
  );
};
