import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10">
        <p className="font-display text-lg">
          BUZZ<span className="text-primary">BOARD</span>
          <span className="label-mono ml-3 text-muted-foreground">the internet, curated</span>
        </p>
        <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="story-link hover:text-foreground">
            About
          </Link>
          <Link to="/trending" className="story-link hover:text-foreground">
            Trending
          </Link>
          <Link to="/creators" className="story-link hover:text-foreground">
            Creators
          </Link>
          <Link to="/signup" className="story-link hover:text-foreground">
            Join
          </Link>
        </nav>
      </div>
    </footer>
  );
}
