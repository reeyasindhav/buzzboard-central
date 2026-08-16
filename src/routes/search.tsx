import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { PageShell, PageHeading } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { posts } from "@/data/buzz";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search Buzzboard" },
      { name: "description", content: "Search memes, captions and categories across Buzzboard." },
      { property: "og:title", content: "Search Buzzboard" },
      { property: "og:description", content: "Find the meme you half remember." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const results = term
    ? posts.filter((p) =>
        `${p.title} ${p.caption} ${p.category} ${p.authorHandle}`.toLowerCase().includes(term),
      )
    : posts;

  return (
    <PageShell>
      <PageHeading
        kicker={term ? `Results for “${q}”` : "Search"}
        title={term ? `${results.length} matches` : "Find the meme"}
        accent={term ? undefined : "you half remember."}
      />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {results.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
      </div>
      {results.length === 0 ? (
        <p className="card-surface mt-10 p-10 text-center text-muted-foreground">
          Nothing matched. Try “gaming”, “wholesome” or a creator handle.
        </p>
      ) : null}
    </PageShell>
  );
}
