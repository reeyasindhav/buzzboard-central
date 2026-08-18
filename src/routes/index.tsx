import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, Zap } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { UserAvatar } from "@/components/user-avatar";
import { categories, creators, posts, fmt } from "@/data/buzz";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buzzboard — What's buzzing right now" },
      {
        name: "description",
        content:
          "Buzzboard is the community-curated home for memes and viral culture. Zero noise, just the good stuff.",
      },
      { property: "og:title", content: "Buzzboard — What's buzzing right now" },
      {
        property: "og:description",
        content: "Discover, react to, and curate viral content with a community that moves fast.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [active, setActive] = useState<string>("For you");
  const visible =
    active === "For you" ? posts : posts.filter((p) => p.category === active).concat();

  return (
    <PageShell>
      <section className="flex flex-wrap items-end justify-between gap-6">
        <PageHeading kicker="The internet, curated" title="What's buzzing" accent="right now." />
        <Link
          to="/about"
          className="group flex items-center gap-2 font-mono text-sm text-muted-foreground"
        >
          Zero noise. Just the good stuff.
          <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </section>

      <div className="mt-10 flex flex-wrap gap-3 border-b border-border pb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all duration-200",
              active === c
                ? "border-ink bg-ink text-background"
                : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary",
            )}
          >
            {c}
            {c === "Fresh" ? (
              <span className="animate-pulse-dot ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold">The daily buzz</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {visible.length} posts
            </span>
          </div>
          <div className="mt-6 space-y-8">
            {visible.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
            {visible.length === 0 ? (
              <p className="card-surface p-10 text-center text-muted-foreground">
                Nothing here yet. Be the first to post in {active}.
              </p>
            ) : null}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface animate-rise p-6">
            <div className="flex items-center justify-between">
              <span className="label-mono flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" /> Leaderboard
              </span>
              <Link to="/leaderboard" className="text-xs text-primary hover:underline">
                See all
              </Link>
            </div>
            <h3 className="mt-4 text-2xl font-bold">Creators on fire</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The people shaping the conversation this week.
            </p>
            <ul className="mt-5 space-y-4">
              {creators.slice(0, 4).map((c, i) => (
                <li key={c.handle} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <UserAvatar initials={c.initials} color={c.color} size="sm" />
                  <Link
                    to="/creators/$handle"
                    params={{ handle: c.handle }}
                    className="min-w-0 flex-1"
                  >
                    <p className="truncate text-sm font-semibold hover:text-primary">{c.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">@{c.handle}</p>
                  </Link>
                  <span className="font-mono text-xs">{fmt(c.score)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise rounded-xl bg-ink p-6 text-background">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </span>
            <p className="label-mono mt-5 opacity-70">Make some noise</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Your brain has good taste.</h3>
            <p className="mt-1 text-sm opacity-70">Share the moment before it becomes old news.</p>
            <Link
              to="/submit"
              className="group mt-6 flex items-center justify-between rounded-md bg-background px-4 py-3 text-sm font-medium text-foreground"
            >
              Create a post
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
