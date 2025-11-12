import { BattleRoyaleGame } from "@/lib/apple";
import { formatRatingCount } from "@/lib/format";

export function LeaderboardSummary({
  games,
  generatedAt,
}: {
  games: BattleRoyaleGame[];
  generatedAt: string;
}) {
  const ratedGames = games.filter((game) => game.rating !== null);
  const averageRating = ratedGames.length
    ? ratedGames.reduce((sum, game) => sum + (game.rating ?? 0), 0) / ratedGames.length
    : 0;
  const combinedRatings = ratedGames.reduce((sum, game) => sum + game.ratingCount, 0);
  const freeCount = games.filter((game) => game.price === 0).length;
  const newcomers = games.filter((game) => game.isNewcomer).length;
  const topGame = games[0];

  return (
    <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Sampled</p>
        <p className="text-lg font-semibold text-slate-100">{games.length} games</p>
        <p className="text-xs text-slate-500">Generated {new Date(generatedAt).toLocaleString()}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Average rating</p>
        <p className="text-lg font-semibold text-slate-100">
          {averageRating ? averageRating.toFixed(2) : "No data"}
        </p>
        <p className="text-xs text-slate-500">
          {combinedRatings ? `${formatRatingCount(combinedRatings)} total ratings` : "—"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Free-to-play</p>
        <p className="text-lg font-semibold text-slate-100">{freeCount}</p>
        <p className="text-xs text-slate-500">
          {freeCount ? `${Math.round((freeCount / games.length) * 100)}% of list` : "—"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Trending picks</p>
        <p className="text-lg font-semibold text-slate-100">
          {topGame ? topGame.name : "Pending"}
        </p>
        <p className="text-xs text-slate-500">{newcomers} newly released</p>
      </div>
    </section>
  );
}
