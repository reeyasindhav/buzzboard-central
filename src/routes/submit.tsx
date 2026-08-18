import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";

import { PageShell, PageHeading } from "@/components/page-shell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { categories, type Category, type Post, type Tile } from "@/data/buzz";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Create a post — Buzzboard" },
      {
        name: "description",
        content: "Share a meme or viral moment with the Buzzboard community.",
      },
    ],
  }),
  component: SubmitPage,
});

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
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={publishing}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
              <Zap className="h-4 w-4" />
            {publishing ? "Publishing..." : "Publish post"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}
