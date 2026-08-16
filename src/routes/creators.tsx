import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell, PageHeading } from "@/components/page-shell";
import { UserAvatar } from "@/components/user-avatar";
import { creators, fmt, posts } from "@/data/buzz";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creators on Buzzboard — the people behind the memes" },
      {
        name: "description",
        content:
          "Meet the Buzzboard creators building recognised identities through consistently great memes.",
      },
      { property: "og:title", content: "Creators on Buzzboard" },
      { property: "og:description", content: "Meet the people behind the memes." },
    ],
  }),
  component: Creators,
});

function Creators() {
  return (
    <PageShell>
      <PageHeading
        kicker="The people"
        title="Faces behind"
        accent="the feed."
        intro="Every creator on Buzzboard earns their place through community reactions, not follower counts bought elsewhere."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((c, i) => (
          <Link
            key={c.handle}
            to="/creators/$handle"
            params={{ handle: c.handle }}
            className="card-surface hover-lift animate-rise p-6"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex items-center gap-4">
              <UserAvatar initials={c.initials} color={c.color} size="lg" />
              <div>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="font-mono text-xs text-muted-foreground">@{c.handle}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{c.bio}</p>
            <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div>
                <dt className="label-mono text-muted-foreground">Buzz</dt>
                <dd className="font-display text-lg font-bold">{fmt(c.score)}</dd>
              </div>
              <div>
                <dt className="label-mono text-muted-foreground">Fans</dt>
                <dd className="font-display text-lg font-bold">{c.followers}</dd>
              </div>
              <div>
                <dt className="label-mono text-muted-foreground">Posts</dt>
                <dd className="font-display text-lg font-bold">
                  {posts.filter((p) => p.authorHandle === c.handle).length || c.posts}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
