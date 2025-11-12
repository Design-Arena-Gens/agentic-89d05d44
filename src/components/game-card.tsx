import Image from "next/image";
import Link from "next/link";
import { BattleRoyaleGame } from "@/lib/apple";
import {
  classNames,
  formatDateDistance,
  formatFileSize,
  formatRatingCount,
} from "@/lib/format";

function buildTags(game: BattleRoyaleGame): string[] {
  const tags = new Set<string>();
  if (game.price === 0) {
    tags.add("Free-to-Play");
  }
  if (game.supportsGameCenter) {
    tags.add("Game Center");
  }
  if (game.isNewcomer) {
    tags.add("Newcomer");
  }
  if (game.features.some((feature) => /multiplayer/i.test(feature))) {
    tags.add("Multiplayer");
  }
  if (game.features.some((feature) => /pvp/i.test(feature))) {
    tags.add("PvP");
  }
  if (game.keywordsMatched.length > 0) {
    tags.add("Keyword match");
  }
  return Array.from(tags);
}

function ratingLabel(game: BattleRoyaleGame): string {
  if (!game.rating) {
    return "Not yet rated";
  }
  return `${game.rating.toFixed(1)} • ${formatRatingCount(game.ratingCount)} ratings`;
}

function snippet(text: string, max = 180): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function GameCard({ game, rank }: { game: BattleRoyaleGame; rank: number }) {
  const tags = buildTags(game);
  const rankHighlight = rank <= 3;

  return (
    <article
      className={classNames(
        "relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-card",
        rankHighlight && "card-highlight border-brand-400/40 shadow-card"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800/60 text-2xl font-semibold text-brand-300">
          {rank}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-2xl font-semibold text-slate-50">
                {game.name}
              </h2>
              <p className="text-sm text-slate-400">{game.artistName}</p>
            </div>
            <Link
              href={game.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-brand-400"
            >
              View on App Store
            </Link>
          </header>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span className="flex items-center gap-1 text-amber-300">
              <span aria-hidden="true">⭐</span>
              <span>{ratingLabel(game)}</span>
            </span>
            <span className="text-slate-400">{game.formattedPrice}</span>
            <span className="text-slate-400">Updated {formatDateDistance(game.currentVersionReleaseDate)}</span>
            <span className="text-slate-500">{formatFileSize(game.sizeInMB)}</span>
          </div>

          <p className="text-sm text-slate-200/90">{snippet(game.description)}</p>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-xs text-brand-200">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 uppercase tracking-wide"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-2 md:flex">
          <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src={game.iconUrl}
              alt={game.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-xs text-slate-500">
            {game.genres.slice(0, 2).join(" · ")}
          </div>
        </div>
      </div>
    </article>
  );
}
