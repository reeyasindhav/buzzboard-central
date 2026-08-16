import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { MemeTile } from "@/components/meme-tile";
import { UserAvatar } from "@/components/user-avatar";
import { PostCard } from "@/components/post-card";
import { creatorOf, creators, fmt, posts } from "@/data/buzz";
import { cn } from "@/lib/utils";

const seedComments = [
  { handle: "luna.exe", body: "this is unreasonably accurate and I'm unwell about it", time: "4m" },
  { handle: "arip", body: "screenshotting this for the group chat, sorry not sorry", time: "18m" },
  { handle: "deepfriedkev", body: "needs one more layer of jpeg but ok", time: "42m" },
];

export const Route = createFileRoute("/post/$postId")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.id === params.postId);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Post not found — Buzzboard" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Buzzboard` },
        { name: "description", content: post.caption },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.caption },
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { post } = Route.useLoaderData();
  const author = creatorOf(post.authorHandle);
  const [liked, setLiked] = useState(false);
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState(seedComments);
  const related = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <PageShell>
      <Link
        to="/"
        className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to feed
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="animate-rise">
          <span className="label-mono text-primary">{post.category}</span>
          <h1 className="mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-3 text-muted-foreground">{post.caption}</p>

          <div className="card-surface mt-6 overflow-hidden">
            <MemeTile tile={post.tile} size="lg" />
          </div>

          <div className="mt-6 flex items-center gap-6 border-b border-border pb-6">
            <button
              onClick={() => setLiked((v) => !v)}
              className={cn(
                "flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-transform active:scale-90",
                liked && "border-primary text-primary",
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              {fmt(post.likes + (liked ? 1 : 0))}
            </button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" /> {post.comments + comments.length - 3}
            </span>
            <button
              onClick={() => toast.success("Link copied to clipboard")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Share2 className="h-4 w-4" /> {fmt(post.shares)}
            </button>
          </div>

          <h2 className="mt-8 text-xl font-bold">Reactions</h2>
          <form
            className="mt-4 flex gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setComments((c) => [{ handle: "you", body: draft.trim(), time: "now" }, ...c]);
              setDraft("");
              toast.success("Comment posted");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add your take…"
              className="flex-1 rounded-md border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button className="rounded-md bg-ink px-5 text-sm font-medium text-background transition-transform hover:scale-[1.02]">
              Post
            </button>
          </form>

          <ul className="mt-6 space-y-5">
            {comments.map((c, i) => {
              const person = creators.find((x) => x.handle === c.handle);
              return (
                <li key={i} className="animate-pop flex gap-3">
                  <UserAvatar
                    initials={person?.initials ?? "YO"}
                    color={person?.color ?? "yellow"}
                    size="sm"
                  />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      @{c.handle} · {c.time}
                    </p>
                    <p className="mt-1 text-sm">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>

        <aside className="space-y-6">
          <div className="card-surface animate-rise p-6">
            <span className="label-mono text-muted-foreground">Posted by</span>
            <div className="mt-4 flex items-center gap-3">
              <UserAvatar initials={author.initials} color={author.color} />
              <div>
                <p className="text-sm font-semibold">{author.name}</p>
                <p className="font-mono text-xs text-muted-foreground">@{author.handle}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{author.bio}</p>
            <Link
              to="/creators/$handle"
              params={{ handle: author.handle }}
              className="mt-5 block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              View profile
            </Link>
          </div>

          {related.length ? (
            <div>
              <h2 className="label-mono mb-4 text-muted-foreground">More in {post.category}</h2>
              <div className="space-y-6">
                {related.map((p, i) => (
                  <PostCard key={p.id} post={p} index={i} />
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}
