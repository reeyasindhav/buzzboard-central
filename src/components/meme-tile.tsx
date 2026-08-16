import { cn } from "@/lib/utils";
import { tileClass, type Tile } from "@/data/buzz";

export function MemeTile({
  tile,
  className,
  size = "md",
}: {
  tile: Tile;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = { sm: "h-32", md: "h-56", lg: "h-80" } as const;
  const bigSize = { sm: "text-3xl", md: "text-6xl", lg: "text-7xl" } as const;

  return (
    <div
      className={cn(
        "relative flex w-full select-none flex-col items-center justify-center gap-2 overflow-hidden",
        heights[size],
        tileClass[tile.bg],
        className,
      )}
      role="img"
      aria-label={`${tile.kicker || tile.script || ""} ${tile.big} ${tile.sub}`}
    >
      {tile.script ? (
        <span className="absolute left-5 top-4 font-display text-lg italic opacity-80">
          {tile.script}
        </span>
      ) : null}
      {tile.kicker ? <span className="label-mono opacity-70">{tile.kicker}</span> : null}
      <span className={cn("font-display font-bold leading-none", bigSize[size])}>{tile.big}</span>
      <span className="label-mono opacity-80">{tile.sub}</span>
    </div>
  );
}
