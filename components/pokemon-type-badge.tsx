import { Badge } from "@/components/ui/badge";

const colorType: { [type: string]: string } = {
  bug: "bg-[#A6B91A]",
  dark: "bg-[#705746]",
  dragon: "bg-[#705746]",
  electric: "bg-[#F7D02C]",
  fairy: "bg-[#D685AD]",
  fighting: "bg-[#C22E28]",
  fire: "bg-[#EE8130]",
  flying: "bg-[#A98FF3]",
  ghost: "bg-[#735797]",
  grass: "bg-[#7AC74C]",
  ground: "bg-[#E2BF65]",
  ice: "bg-[#96D9D6]",
  normal: "bg-[#A8A77A]",
  poison: "bg-[#A33EA1]",
  psychic: "bg-[#F95587]",
  rock: "bg-[#B6A136]",
  steel: "bg-[#B7B7CE]",
  water: "bg-[#6390F0]",
};

type PokemonTypeBadgeProps = {
  readonly type: string;
};

export const PokemonTypeBadge = ({ type }: PokemonTypeBadgeProps) => (
  <Badge className={colorType[type]}>{type}</Badge>
);
