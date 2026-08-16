import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";
import { UserAvatar } from "@/components/user-avatar";
import { creators, fmt } from "@/data/buzz";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — transparent creator rankings on Buzzboard" },
      {
        name: "description",
        content:
          "See exactly how Buzzboard ranks creators: reactions, shares and saves, all in the open.",
      },
      { property: "og:title", content: "Buzzboard Leaderboard" },
      { property: "og:description", content: "Transparent creator rankings, no hidden algorithm." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  const ranked = [...creators].sort((a, b) => b.score - a.score);
  const max = ranked[0]?.score ?? 1;

  return (
    <PageShell>
      <PageHeading
        kicker="Transparent by design"
        title="The buzz"
        accent="leaderboard."
        intro="Buzz score = reactions + shares + saves, weighted by recency. No paid boosts, ever."
      />

      <div className="card-surface animate-rise mt-12 divide-y divide-border">
        {ranked.map((c, i) => (
          <div
            key={c.handle}
            className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/50"
          >
            <span className="w-8 font-display text-2xl font-bold text-muted-foreground">
              {i === 0 ? <Trophy className="h-6 w-6 text-primary" /> : String(i + 1).padStart(2, "0")}
            </span>
            <UserAvatar initials={c.initials} color={c.color} />
            <Link to="/creators/$handle" params={{ handle: c.handle }} className="min-w-0 flex-1">
              <p className="truncate font-semibold hover:text-primary">{c.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                @{c.handle} · {c.posts} posts
              </p>
            </Link>
            <div className="hidden w-64 sm:block">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-700"
                  style={{ width: `${(c.score / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="w-16 text-right font-mono text-sm">{fmt(c.score)}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
