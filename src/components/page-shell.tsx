import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeading({
  kicker,
  title,
  accent,
  intro,
}: {
  kicker: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <div className="animate-rise max-w-3xl">
      <p className="label-mono flex items-center gap-2 text-muted-foreground">
        <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-primary" />
        {kicker}
      </p>
      <h1 className="mt-3 text-5xl font-bold leading-[0.95] md:text-6xl">
        {title}
        {accent ? <span className="block text-primary">{accent}</span> : null}
      </h1>
      {intro ? <p className="mt-4 max-w-xl text-muted-foreground">{intro}</p> : null}
    </div>
  );
}
