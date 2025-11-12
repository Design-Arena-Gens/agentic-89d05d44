import { BattleRoyaleGame } from "@/lib/apple";
import { GameCard } from "./game-card";

export function GameLeaderboard({ games }: { games: BattleRoyaleGame[] }) {
  return (
    <section className="flex flex-col gap-6">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} rank={index + 1} />
      ))}
    </section>
  );
}
