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

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Create a post — Buzzboard" },
      { name: "description", content: "Compose a meme tile, pick a category and post it live." },
      { property: "og:title", content: "Create a post — Buzzboard" },
      { property: "og:description", content: "Build your meme tile and ship it to the feed." },
    ],
  }),
  component: SubmitPage,
});

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
                />
              ))}
            </div>
          </div>

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
      </div>
    </PageShell>
  );
}
