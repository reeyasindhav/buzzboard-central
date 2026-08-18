import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { MemeTile } from "@/components/meme-tile";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Buzzboard" },
      { name: "description", content: "Log back into Buzzboard to react, save and post memes." },
      { property: "og:title", content: "Log in — Buzzboard" },
      { property: "og:description", content: "Your feed, your board, your buzz score." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PageShell>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="animate-rise">
          <p className="label-mono text-muted-foreground">Welcome back</p>
          <h1 className="mt-3 text-5xl font-bold leading-[0.95] md:text-6xl">
            Log in to
            <span className="block text-primary">the buzz.</span>
          </h1>
          <form
            className="card-surface mt-8 space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (!handle.trim() || !password) {
                toast.error("Enter your handle and password");
                return;
              }
              signIn(handle.trim(), handle.trim().toLowerCase().replace(/\s+/g, ""));
              toast.success("Welcome back to Buzzboard");
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="block">
              <span className="label-mono text-muted-foreground">Handle or email</span>
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
                placeholder="••••••••"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              <Zap className="h-4 w-4 fill-current" />
              Log in
            </button>
            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="story-link text-foreground">
                Create an account
              </Link>
            </p>
<<<<<<< HEAD
            <p className="text-center text-xs text-muted-foreground">
              By logging in, you agree to our{" "}
              <Link to="/terms" className="story-link underline">Terms</Link> and{" "}
              <Link to="/privacy" className="story-link underline">Privacy Policy</Link>.
            </p>
=======
>>>>>>> 0d4ec58c09a4d3d2f04725b8a3fae466d037dd0c
          </form>
        </div>
        <div className="hidden md:block">
          <MemeTile
            tile={{ bg: "yellow", kicker: "STATUS", big: "ONLINE", sub: "the timeline missed you" }}
            size="lg"
            className="rounded-lg"
          />
        </div>
      </div>
    </PageShell>
  );
}
