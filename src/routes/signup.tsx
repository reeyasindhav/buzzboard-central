import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { MemeTile } from "@/components/meme-tile";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Buzzboard account" },
      {
        name: "description",
        content: "Join Buzzboard to post memes, build a buzz score and climb the leaderboard.",
      },
      { property: "og:title", content: "Create your Buzzboard account" },
      { property: "og:description", content: "Post memes. Earn buzz. Climb the board." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PageShell>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="hidden md:block">
          <MemeTile
            tile={{ bg: "purple", kicker: "NEW HERE", big: "GM", sub: "post your first meme" }}
            size="lg"
            className="rounded-lg"
          />
        </div>
        <div className="animate-rise">
          <p className="label-mono text-muted-foreground">Join the board</p>
          <h1 className="mt-3 text-5xl font-bold leading-[0.95] md:text-6xl">
            Make an
            <span className="block text-primary">account.</span>
          </h1>
          <form
            className="card-surface mt-8 space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim() || !handle.trim() || password.length < 6) {
                toast.error("Fill everything in (password needs 6+ characters)");
                return;
              }
              signIn(name.trim(), handle.trim().toLowerCase().replace(/^@/, ""));
              toast.success("Account created — welcome to Buzzboard");
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="block">
              <span className="label-mono text-muted-foreground">Display name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maya Chen"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="label-mono text-muted-foreground">Handle</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="mayamakes"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="label-mono text-muted-foreground">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Zap className="h-4 w-4" />
              Create account
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Already buzzing?{" "}
              <Link to="/login" className="story-link text-foreground">
                Log in
              </Link>
            </p>
            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="story-link underline">Terms</Link> and{" "}
              <Link to="/privacy" className="story-link underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
