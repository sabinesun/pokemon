import { type PokemonData } from "@/components/pokemon-list";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

type ChainLink = {
  readonly evolves_to: ChainLink[];
  readonly species: PokemonData;
};

export type PokemonEvolutionProps = {
  readonly chainLink: ChainLink;
  readonly selectedPokemon: string;
};
export const PokemonEvolution = ({
  chainLink,
  selectedPokemon,
}: PokemonEvolutionProps) => {
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${chainLink.species.name}`,
    fetcher,
  );
  const evolvesTo = chainLink?.evolves_to;

  if (evolvesTo?.length === 0) {
    return (
      <div className="flex h-full w-full justify-around overflow-scroll">
        <table>
          <tbody>
            <tr>
              <td className="flex flex-col items-center">
                {selectedPokemon === chainLink?.species.name && (
                  <Image
                    alt="cursor"
                    className="absolute z-10 -translate-y-5 translate-x-10 -rotate-[135deg]"
                    height={36}
                    src="/images/cursor.svg"
                    width={36}
                  />
                )}
                <Link
                  className="flex flex-col items-center"
                  href={"/pokedex/" + chainLink?.species.name}
                >
                  <Image
                    alt={chainLink?.species.name}
                    height={96}
                    layout="responsive"
                    src={data?.sprites.front_default}
                    width={96}
                  />
                  <span>{chainLink?.species.name}</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-wrap content-center justify-around overflow-scroll">
      <table>
        <tbody>
          <tr>
            <td>
              {selectedPokemon === chainLink?.species.name && (
                <Image
                  alt="cursor"
                  className="absolute z-10  -translate-y-5 translate-x-10 -rotate-[135deg] "
                  height={36}
                  src="/images/cursor.svg"
                  width={36}
                />
              )}
              <Link
                className="flex flex-col items-center"
                href={"/pokedex/" + chainLink?.species.name}
              >
                <Image
                  alt={chainLink?.species.name}
                  height={96}
                  layout="responsive"
                  src={data?.sprites.front_default}
                  width={96}
                />
                <span>{chainLink?.species.name}</span>
              </Link>
            </td>
            <td>
              {chainLink?.evolves_to.map((currentChainLink) => (
                <PokemonEvolution
                  chainLink={currentChainLink}
                  key={currentChainLink.species.name}
                  selectedPokemon={selectedPokemon}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
