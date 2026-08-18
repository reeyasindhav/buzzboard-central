import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Users, ShieldAlert, Ban, Gavel } from "lucide-react";

import { PageShell, PageHeading } from "@/components/page-shell";

const sections = [
  {
    icon: FileText,
    title: "Acceptance of terms",
    body: "By accessing or using Buzzboard, you agree to these terms. If you do not agree with any part of them, you may not use the service. Continued use after changes means you accept the updated terms.",
  },
  {
    icon: Users,
    title: "User conduct",
    body: "Share memes, react, and engage respectfully. Do not post illegal content, harass others, or attempt to disrupt the platform. We may remove content or suspend accounts that violate these standards.",
  },
  {
    icon: ShieldAlert,
    title: "Content responsibility",
    body: "You retain ownership of what you post, but you are responsible for it. Buzzboard does not pre-screen content and is not liable for user-submitted material. We reserve the right to remove content that breaks these terms.",
  },
  {
    icon: Ban,
    title: "Prohibited use",
    body: "No scraping, automated abuse, reverse engineering, or using the service to distribute malware. No impersonation, spam, or misleading claims. Respect the community and the platform infrastructure.",
  },
  {
    icon: Gavel,
    title: "Disclaimer and liability",
    body: "Buzzboard is provided as-is without warranties. We are not liable for lost data, service interruptions, or third-party content. Maximum liability is limited to the amount you paid us, which is usually zero.",
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Buzzboard" },
      {
        name: "description",
        content: "The rules and responsibilities for using Buzzboard.",
      },
      { property: "og:title", content: "Terms of use — Buzzboard" },
      { property: "og:description", content: "Community standards and legal terms for Buzzboard." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell>
      <PageHeading
        kicker="Community rules"
        title="Terms of"
        accent="use."
        intro="A short, plain-English agreement between you and Buzzboard. Read it, respect it, and enjoy the board."
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
        <h2 className="font-display text-3xl font-bold">Questions about these terms?</h2>
        <p className="mt-2 max-w-md opacity-70">
          If you need clarification, reach out through the app or contact support directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Back to Buzzboard
          </Link>
          <Link
            to="/privacy"
            className="rounded-full border border-background/30 px-6 py-3 text-sm font-medium"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
