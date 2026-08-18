import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
<<<<<<< HEAD
import { Flame, Bookmark, PenLine, TrendingUp, UserPlus } from "lucide-react";
=======
import { Flame, Bookmark, PenLine, TrendingUp } from "lucide-react";
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c

import { PageShell, PageHeading } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
<<<<<<< HEAD
import { creators, fmt } from "@/data/buzz";
=======
import { fmt } from "@/data/buzz";
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Buzzboard" },
      { name: "description", content: "Track your buzz score, posts and saved memes." },
      { property: "og:title", content: "Your dashboard — Buzzboard" },
      { property: "og:description", content: "Your buzz stats, posts and saved board." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, ready } = useAuth();
<<<<<<< HEAD
  const { userPosts, posts, saved, following } = useStore();
=======
  const { userPosts, posts, saved } = useStore();
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

<<<<<<< HEAD
  const totalLikes = userPosts.reduce((a, p) => a + p.likes, 0);
  const savedPosts = posts.filter((p) => saved.includes(p.id));
  const followingCreators = creators.filter((c) => following.includes(c.handle));
=======
  if (!user) return null;

  const totalLikes = userPosts.reduce((a, p) => a + p.likes, 0);
  const savedPosts = posts.filter((p) => saved.includes(p.id));
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c

  const stats = [
    { label: "Buzz score", value: fmt(totalLikes * 3 + userPosts.length * 120), icon: Flame },
    { label: "Posts", value: `${userPosts.length}`, icon: PenLine },
    { label: "Saved", value: `${saved.length}`, icon: Bookmark },
<<<<<<< HEAD
    { label: "Following", value: `${following.length}`, icon: UserPlus },
=======
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
    { label: "Rank", value: `#${Math.max(7 - userPosts.length, 1)}`, icon: TrendingUp },
  ];

  return (
    <PageShell>
<<<<<<< HEAD
      {user ? (
        <>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <UserAvatar initials={user.name.slice(0, 2)} color="yellow" size="lg" />
              <PageHeading kicker="Dashboard" title={user.name} accent={`@${user.handle}`} />
            </div>
            <Link
              to="/submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Create a post
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="card-surface hover-lift animate-rise p-5"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <s.icon className="h-4 w-4 text-primary" />
                <p className="mt-3 text-3xl font-bold">{s.value}</p>
                <p className="label-mono text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Your posts</h2>
            {userPosts.length ? (
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {userPosts.map((p, i) => (
                  <PostCard key={p.id} post={p} index={i} />
                ))}
              </div>
            ) : (
              <p className="card-surface mt-6 p-10 text-center text-muted-foreground">
                No posts yet.{" "}
                <Link to="/submit" className="story-link text-foreground">
                  Make your first one
                </Link>
                .
              </p>
            )}
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Saved board</h2>
            {savedPosts.length ? (
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {savedPosts.map((p, i) => (
                  <PostCard key={p.id} post={p} index={i} />
                ))}
              </div>
            ) : (
              <p className="card-surface mt-6 p-10 text-center text-muted-foreground">
                Nothing saved yet — tap the bookmark on any post.
              </p>
            )}
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Following</h2>
            {followingCreators.length ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {followingCreators.map((c, i) => (
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
                        <h3 className="text-lg font-semibold">{c.name}</h3>
                        <p className="font-mono text-xs text-muted-foreground">@{c.handle}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{c.bio}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="card-surface mt-6 p-10 text-center text-muted-foreground">
                Not following anyone yet — browse creators and hit follow.
              </p>
            )}
          </section>
        </>
      ) : (
        <div className="mt-10">
          <p className="label-mono text-muted-foreground">Redirecting...</p>
        </div>
      )}
=======
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatar initials={user.name.slice(0, 2)} color="yellow" size="lg" />
          <PageHeading kicker="Dashboard" title={user.name} accent={`@${user.handle}`} />
        </div>
        <Link
          to="/submit"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Create a post
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="card-surface hover-lift animate-rise p-5"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <s.icon className="h-4 w-4 text-primary" />
            <p className="mt-3 text-3xl font-bold">{s.value}</p>
            <p className="label-mono text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Your posts</h2>
        {userPosts.length ? (
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {userPosts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="card-surface mt-6 p-10 text-center text-muted-foreground">
            No posts yet.{" "}
            <Link to="/submit" className="story-link text-foreground">
              Make your first one
            </Link>
            .
          </p>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Saved board</h2>
        {savedPosts.length ? (
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {savedPosts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="card-surface mt-6 p-10 text-center text-muted-foreground">
            Nothing saved yet — tap the bookmark on any post.
          </p>
        )}
      </section>
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
    </PageShell>
  );
}
