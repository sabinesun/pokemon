import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export type PokemonSpriteProps = {
  readonly selectedPokemon: string;
  readonly setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
  readonly url: string;
};

export const PokemonSprite = ({
  url,
  setSelectedPokemon,
  selectedPokemon,
}: PokemonSpriteProps) => {
  const { data, error } = useSWR(`${url}`, fetcher);

  const pathname = usePathname();

  const currentPokemon =
    pathname.split("/")[pathname.split("/").length - 1] === data?.name ||
    selectedPokemon === data?.name;

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div
      className="group h-[96px]"
      onClick={() => setSelectedPokemon(data?.name)}
    >
      {currentPokemon && (
        <Image
          alt="cursor"
          className="absolute z-10 -translate-y-6 translate-x-14 -rotate-[135deg]"
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
              currentPokemon && "-translate-y-1/3"
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
