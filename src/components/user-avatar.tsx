import { cn } from "@/lib/utils";
import { avatarClass, type Creator } from "@/data/buzz";

export function UserAvatar({
  initials,
  color,
  size = "md",
  className,
}: {
  initials: string;
  color: Creator["color"];
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-[11px]",
    lg: "h-16 w-16 text-base",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-mono font-semibold uppercase",
        sizes[size],
        avatarClass[color],
        className,
      )}
    >
      {initials}
    </span>
  );
}
