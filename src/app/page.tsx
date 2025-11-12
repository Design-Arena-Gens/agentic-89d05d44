import { CountrySwitcher } from "@/components/country-switcher";
import { GameLeaderboard } from "@/components/game-leaderboard";
import { LeaderboardSummary } from "@/components/leaderboard-summary";
import { fetchBattleRoyaleGames } from "@/lib/apple";
import { COUNTRIES, pickCountryName } from "@/lib/format";

export const dynamic = "force-dynamic";

function normalizeCountry(code: string | undefined): string {
  if (!code) return "us";
  const lowered = code.toLowerCase();
  const matches = COUNTRIES.some((country) => country.code === lowered);
  return matches ? lowered : "us";
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { country?: string; limit?: string };
}) {
  const country = normalizeCountry(searchParams?.country);
  const limitParam = searchParams?.limit ? Number(searchParams.limit) : 15;
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(Math.floor(limitParam), 5), 30) : 15;

  const data = await fetchBattleRoyaleGames({ country, limit });

  if (data.games.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:px-0">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="flex flex-col gap-4">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-brand-300/80">
              Battle Royale Pulse
            </p>
            <h1 className="font-display text-4xl font-semibold text-slate-50 sm:text-5xl">
              No battle royale results for {pickCountryName(country)}
            </h1>
            <p className="max-w-3xl text-base text-slate-300">
              We couldn&apos;t find any active battle royale titles in this storefront right now. Try a
              different region.
            </p>
          </div>
          <CountrySwitcher country={country} />
        </header>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:px-0">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-col gap-4">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-brand-300/80">
            Battle Royale Pulse
          </p>
          <h1 className="font-display text-4xl font-semibold text-slate-50 sm:text-5xl">
            Top battle royale games on the {pickCountryName(country)} App Store
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Real-time snapshot of high-performing battle royale titles, blending store signals
            and live engagement metadata to spotlight what&apos;s winning the drop right now.
          </p>
        </div>
        <CountrySwitcher country={country} />
        <LeaderboardSummary games={data.games} generatedAt={data.generatedAt} />
      </header>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-semibold text-slate-100">
            Live ranking · refreshed on demand
          </h2>
          <p className="text-sm text-slate-400">
            Score combines App Store ratings velocity, recency, and accessibility (free-to-play bonus).
          </p>
        </div>
        <GameLeaderboard games={data.games} />
      </section>

      <footer className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-xs text-slate-500">
        <p>
          Rankings approximate App Store momentum using public search data and heuristics. For the
          official chart, visit Apple&apos;s App Store. Icons and metadata © Apple.
        </p>
      </footer>
    </main>
  );
}
