import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PostCard } from "@/components/post-card";
import { UserAvatar } from "@/components/user-avatar";
import { creators, fmt, posts } from "@/data/buzz";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/creators/$handle")({
  loader: ({ params }) => {
    const creator = creators.find((c) => c.handle === params.handle);
    if (!creator) throw notFound();
    return { creator };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Creator not found — Buzzboard" }, { name: "robots", content: "noindex" }],
      };
    }
    const { creator } = loaderData;
    return {
      meta: [
        { title: `${creator.name} (@${creator.handle}) — Buzzboard` },
        { name: "description", content: creator.bio },
        { property: "og:title", content: `${creator.name} on Buzzboard` },
        { property: "og:description", content: creator.bio },
      ],
    };
  },
  component: CreatorProfile,
});

function CreatorProfile() {
  const { creator } = Route.useLoaderData();
  const following = useStore((state) => state.following.includes(creator.handle));
  const toggleFollow = useStore((state) => state.toggleFollow);
  const mine = posts.filter((p) => p.authorHandle === creator.handle);

  return (
    <div className="animate-rise">
      <Link to="/creators" className="label-mono text-muted-foreground hover:text-foreground">
        ← All creators
      </Link>

      <header className="card-surface animate-rise mt-6 flex flex-wrap items-center gap-6 p-8">
        <UserAvatar initials={creator.initials} color={creator.color} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold">{creator.name}</h1>
          <p className="font-mono text-sm text-muted-foreground">@{creator.handle}</p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{creator.bio}</p>
        </div>
        <button
          onClick={() => toggleFollow(creator.handle)}
          className={cn(
            "rounded-full px-6 py-2.5 text-sm font-medium transition-all active:scale-95",
            following
              ? "border border-border bg-card text-foreground"
              : "bg-primary text-primary-foreground hover:brightness-110",
          )}
        >
          {following ? "Following" : "Follow"}
        </button>
      </header>

      <dl className="mt-6 grid grid-cols-3 gap-4">
        {[
          ["Buzz score", fmt(creator.score)],
          ["Followers", creator.followers],
          ["Posts", String(creator.posts)],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="card-surface animate-rise p-5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <dt className="label-mono text-muted-foreground">{k}</dt>
            <dd className="mt-1 font-display text-3xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-14 text-2xl font-bold">Recent posts</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {mine.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
        {mine.length === 0 ? (
          <p className="card-surface p-10 text-muted-foreground">No posts yet.</p>
        ) : null}
      </div>
    </div>
  );
  // test
}
