import { type PokemonData } from "@/components/pokemon-list";
import { Progress } from "@/components/ui/progress";

type PokemonStat = {
  readonly base_stat: number;
  readonly stat: PokemonData;
};

type PokemonStatsProps = {
  readonly stats: PokemonStat[];
};
export const PokemonStats = ({ stats }: PokemonStatsProps) => {
  const hp = stats.find((stat) => stat.stat.name === "hp")?.base_stat;
  const hpPercentage = hp && (hp * 100) / 250;

  const attack = stats.find((stat) => stat.stat.name === "attack")?.base_stat;
  const attackPercentage = hp && (hp * 100) / 134;

  const defense = stats.find((stat) => stat.stat.name === "defense")?.base_stat;
  const defensePercentage = hp && (hp * 100) / 180;

  const speed = stats.find((stat) => stat.stat.name === "speed")?.base_stat;
  const speedPercentage = hp && (hp * 100) / 180;

  const specialAttack = stats.find(
    (stat) => stat.stat.name === "special-attack",
  )?.base_stat;
  const specialAttackPercentage = hp && (hp * 100) / 194;

  return (
    <table className="m-4">
      <tbody>
        <tr>
          <td>HP</td>
          <td> {hp}</td>
          <td>
            <Progress value={hpPercentage} />
          </td>
        </tr>
        <tr>
          <td className="w-24">Attack</td>
          <td className="w-10">{attack}</td>
          <td>
            <Progress value={attackPercentage} />
          </td>
        </tr>
        <tr>
          <td>Special attack</td>
          <td>{specialAttack}</td>
          <td>
            <Progress value={specialAttackPercentage} />
          </td>
        </tr>
        <tr>
          <td>Defense</td>
          <td>{defense}</td>
          <td>
            <Progress value={defensePercentage} />
          </td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>{speed}</td>
          <td>
            <Progress value={speedPercentage} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
