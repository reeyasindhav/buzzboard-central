import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Cookie, Mail, ExternalLink } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";

const sections = [
  {
    icon: Shield,
    title: "What we collect",
    body: "Account details like display name and handle. Post content you publish. Basic usage signals such as likes, saves and follows. We do not collect precise geolocation or contact lists.",
  },
  {
    icon: Lock,
    title: "How we use it",
    body: "To run Buzzboard, show your posts, remember your login, and improve relevance. We do not sell personal data. Access is limited to systems needed to operate the product.",
  },
  {
    icon: Cookie,
    title: "Cookies and local data",
    body: "We use local storage for auth state and preferences. No third-party advertising trackers are loaded by default. External images are loaded directly from providers and may set their own cookies.",
  },
  {
    icon: ExternalLink,
    title: "Third-party services",
    body: "Unsplash and Pexels images are loaded from external CDNs. Those providers have their own privacy practices. We recommend reviewing their policies for hosted media.",
  },
  {
    icon: Mail,
    title: "Your choices",
    body: "You can clear local storage to log out, request account deletion, or stop using saved features. For privacy requests, use the contact method listed in the app settings or reach out through the support channel.",
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Buzzboard" },
      {
        name: "description",
        content: "How Buzzboard handles data, cookies, third-party media, and your privacy choices.",
      },
      { property: "og:title", content: "Privacy policy — Buzzboard" },
      { property: "og:description", content: "Transparent data practices for the Buzzboard community." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell>
      <PageHeading
        kicker="Your data"
        title="Privacy,"
        accent="plain and simple."
        intro="Buzzboard is built for the community, not for harvesting data. Here is exactly what that means."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {sections.map((s, i) => (
          <div
            key={s.title}
            className="card-surface hover-lift animate-rise p-7"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <s.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="animate-rise mt-14 rounded-xl bg-ink p-10 text-background">
        <h2 className="font-display text-3xl font-bold">Still have questions?</h2>
        <p className="mt-2 max-w-md opacity-70">
          If you want clarification about data handling, reach out through the app or contact support directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Back to Buzzboard
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-background/30 px-6 py-3 text-sm font-medium"
          >
            Learn more about us
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
