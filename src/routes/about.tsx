import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Gauge, Users, EyeOff } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";

const pillars = [
  {
    icon: Filter,
    title: "Categorised, not scattered",
    body: "Dank, Wholesome, Gaming, Culture. Pick a lane or take them all — never mixed with someone's holiday album.",
  },
  {
    icon: Gauge,
    title: "Real-time reactions",
    body: "Likes, comments, shares and saves update instantly, so you always see what the room feels right now.",
  },
  {
    icon: Users,
    title: "Creator identity",
    body: "Profiles, buzz scores and post history mean the people making the good stuff get the credit.",
  },
  {
    icon: EyeOff,
    title: "No ad slots",
    body: "No sponsored posts squeezed between jokes. The ranking rules are published and identical for everyone.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Buzzboard — a home for internet culture" },
      {
        name: "description",
        content:
          "Why Buzzboard exists: a fast, community-driven hub for memes and viral culture without algorithmic noise.",
      },
      { property: "og:title", content: "About Buzzboard" },
      { property: "og:description", content: "A dedicated home for internet culture." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHeading
        kicker="Why we exist"
        title="Internet culture deserves"
        accent="its own address."
        intro="Viral moments get buried in feeds built for everything at once. Buzzboard is built for one thing: the good stuff, fast, and the people who make it."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className="card-surface hover-lift animate-rise p-7"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="animate-rise mt-14 rounded-xl bg-ink p-10 text-background">
        <h2 className="font-display text-3xl font-bold">Ready to make some noise?</h2>
        <p className="mt-2 max-w-md opacity-70">
          Join free, pick your categories, and start posting in under a minute.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Create account
          </Link>
          <Link
            to="/"
            className="rounded-full border border-background/30 px-6 py-3 text-sm font-medium"
          >
            Browse first
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
