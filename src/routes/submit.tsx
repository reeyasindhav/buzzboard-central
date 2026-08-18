<<<<<<< HEAD
import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";

import { PageShell, PageHeading } from "@/components/page-shell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { categories, type Category, type Post, type Tile } from "@/data/buzz";
=======
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageShell, PageHeading } from "@/components/page-shell";
import { MemeTile } from "@/components/meme-tile";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Category, Tile } from "@/data/buzz";

const cats: Category[] = ["Dank", "Wholesome", "Gaming", "Culture", "Fresh"];
const bgs: Tile["bg"][] = ["purple", "blue", "green", "yellow", "pink"];
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Create a post — Buzzboard" },
<<<<<<< HEAD
      {
        name: "description",
        content: "Share a meme or viral moment with the Buzzboard community.",
      },
=======
      { name: "description", content: "Compose a meme tile, pick a category and post it live." },
      { property: "og:title", content: "Create a post — Buzzboard" },
      { property: "og:description", content: "Build your meme tile and ship it to the feed." },
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
    ],
  }),
  component: SubmitPage,
});

<<<<<<< HEAD
const bgOptions = ["purple", "blue", "green", "yellow", "pink"] as const;

function SubmitPage() {
  const { user } = useAuth();
  const { addPost } = useStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<Category>(categories[1]);
  const [kicker, setKicker] = useState("");
  const [big, setBig] = useState("");
  const [sub, setSub] = useState("");
  const [bg, setBg] = useState<Tile["bg"]>("purple");
  const [publishing, setPublishing] = useState(false);

  if (!user) {
    return (
      <PageShell>
        <div className="mx-auto w-full max-w-md">
          <PageHeading
            kicker="Authentication required"
            title="Log in to post"
            accent="your meme."
            intro="You need an account to share content on Buzzboard."
          />
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Log in
          </Link>
        </div>
      </PageShell>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !big.trim()) return;
    setPublishing(true);
    try {
      const post: Post = {
        id: String(Date.now()),
        title: title.trim(),
        caption: caption.trim(),
        category,
        authorHandle: user.handle,
        time: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        tile: {
          bg,
          kicker: kicker.trim().toUpperCase(),
          big: big.trim(),
          sub: sub.trim(),
        },
      };
      addPost(post);
      toast.success("Post published — it's now live on Buzzboard");
      navigate({ to: "/dashboard" });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-2xl">
        <PageHeading
          kicker="Make some noise"
          title="Create a"
          accent="post."
          intro="Share the moment before it becomes old news."
        />

        <form onSubmit={onSubmit} className="card-surface mt-10 space-y-6 p-6">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's buzzing?"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add some context..."
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {categories.filter((c) => c !== "For you").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Kicker</label>
              <input
                value={kicker}
                onChange={(e) => setKicker(e.target.value)}
                placeholder="HOT"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Big text</label>
              <input
                value={big}
                onChange={(e) => setBig(e.target.value)}
                placeholder="MEME"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Sub text</label>
            <input
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              placeholder="the good stuff"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tile color</label>
            <div className="mt-2 flex gap-2">
              {bgOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBg(b)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    bg === b ? "border-foreground" : "border-transparent"
                  } bg-tile-${b}`}
                  aria-label={b}
=======
function SubmitPage() {
  const { user, ready } = useAuth();
  const { addPost } = useStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<Category>("Dank");
  const [tile, setTile] = useState<Tile>({
    bg: "yellow",
    kicker: "TABS OPEN",
    big: "47",
    sub: "which one is it",
  });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  if (!user) return null;

  return (
    <PageShell>
      <PageHeading
        kicker="New post"
        title="Build the tile,"
        accent="ship the buzz."
        intro="Type the copy, pick a colour, and it goes live on your feed and profile."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <form
          className="card-surface space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) {
              toast.error("Give your post a title");
              return;
            }
            const post = addPost({
              title: title.trim(),
              caption: caption.trim(),
              category,
              authorHandle: user.handle,
              tile,
            });
            toast.success("Posted to Buzzboard");
            navigate({ to: "/post/$postId", params: { postId: post.id } });
          }}
        >
          <label className="block">
            <span className="label-mono text-muted-foreground">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="When the group chat goes silent…"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="label-mono text-muted-foreground">Caption</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="A short line under the title"
              className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>

          <div>
            <span className="label-mono text-muted-foreground">Category</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border border-border px-3 py-1.5 text-sm transition-colors",
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="label-mono text-muted-foreground">Kicker</span>
              <input
                value={tile.kicker}
                onChange={(e) => setTile((t) => ({ ...t, kicker: e.target.value.toUpperCase() }))}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="label-mono text-muted-foreground">Big text</span>
              <input
                value={tile.big}
                onChange={(e) => setTile((t) => ({ ...t, big: e.target.value }))}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="label-mono text-muted-foreground">Sub text</span>
              <input
                value={tile.sub}
                onChange={(e) => setTile((t) => ({ ...t, sub: e.target.value }))}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>

          <div>
            <span className="label-mono text-muted-foreground">Tile colour</span>
            <div className="mt-2 flex gap-2">
              {bgs.map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-label={b}
                  onClick={() => setTile((t) => ({ ...t, bg: b }))}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                    `bg-tile-${b}`,
                    tile.bg === b ? "border-foreground" : "border-transparent",
                  )}
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
                />
              ))}
            </div>
          </div>
<<<<<<< HEAD
          <button
            type="submit"
            disabled={publishing}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
              <Zap className="h-4 w-4" />
            {publishing ? "Publishing..." : "Publish post"}
          </button>
        </form>
=======

          <button
            type="submit"
            className="w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Publish post
          </button>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="label-mono text-muted-foreground">Live preview</p>
          <div className="card-surface mt-3 overflow-hidden">
            <div className="px-5 pt-5">
              <span className="label-mono text-primary">{category}</span>
              <h3 className="mt-2 text-xl font-semibold leading-snug">
                {title || "Your title goes here"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {caption || "And your caption sits right here."}
              </p>
            </div>
            <div className="mt-4 px-5 pb-5">
              <MemeTile tile={tile} />
            </div>
          </div>
        </div>
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
      </div>
    </PageShell>
  );
}
