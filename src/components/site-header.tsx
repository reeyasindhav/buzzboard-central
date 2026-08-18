import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Zap, Menu, X } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const nav = [
  { to: "/", label: "Explore" },
  { to: "/trending", label: "Trending" },
  { to: "/creators", label: "Creators" },
  { to: "/leaderboard", label: "Leaderboard" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-4 w-4 fill-current" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            BUZZ<span className="text-primary">BOARD</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-foreground border-primary" }}
              inactiveProps={{ className: "text-muted-foreground border-transparent" }}
              className="border-b-2 pb-1 text-sm transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/search", search: { q } });
            }}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the buzz"
              aria-label="Search"
              className="w-28 bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:w-40"
            />
          </form>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" aria-label="Dashboard">
                <UserAvatar
                  initials={user.name.slice(0, 2)}
                  color="yellow"
                  className="hover-lift"
                />
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
                    Log out
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be signed out of Buzzboard on this device.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        signOut();
                        navigate({ to: "/" });
                      }}
                    >
                      Log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              Log in
            </Link>
          )}

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent",
        )}
      >
        <nav className="min-h-0 flex-col px-5">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
