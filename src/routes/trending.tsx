import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { MemeTile } from "@/components/meme-tile";
import { creatorOf, fmt, posts } from "@/data/buzz";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending on Buzzboard — the fastest movers" },
      {
        name: "description",
        content: "Live velocity charts and the memes climbing hardest on Buzzboard right now.",
      },
      { property: "og:title", content: "Trending on Buzzboard" },
      { property: "og:description", content: "The memes climbing hardest right now." },
    ],
  }),
  component: Trending,
});

function Trending() {
  const ranked = [...posts].sort((a, b) => b.likes - a.likes);
  const [first, second, third, ...rest] = ranked;

  return (
    <PageShell>
      <PageHeading
        kicker="Live velocity"
        title="Climbing fast,"
        accent="right this second."
        intro="Ranked by engagement velocity in the last 6 hours. No ads, no sponsored slots, no algorithm you can't see."
      />

      <div className="animate-rise mt-10 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex whitespace-nowrap py-3">
          <div className="animate-marquee flex shrink-0 gap-10 pr-10">
            {[...ranked, ...ranked].map((p, i) => (
              <span key={i} className="label-mono text-muted-foreground">
                <span className="text-primary">#{(i % ranked.length) + 1}</span> {p.title} ·{" "}
                {fmt(p.likes)} likes
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[first, second, third].map((p, i) =>
          p ? (
            <Link
              key={p.id}
              to="/post/$postId"
              params={{ postId: p.id }}
              className="card-surface hover-lift animate-rise overflow-hidden"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <MemeTile tile={p.tile} size="sm" />
              <div className="p-5">
                <span className="label-mono flex items-center gap-1 text-primary">
                  <Flame className="h-3.5 w-3.5" /> #{i + 1} {p.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  @{creatorOf(p.authorHandle).handle} · {fmt(p.likes)} likes
                </p>
              </div>
            </Link>
          ) : null,
        )}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Also heating up</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {rest.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
      </div>
    </PageShell>
  );
}
