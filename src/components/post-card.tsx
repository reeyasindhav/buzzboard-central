import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { MemeTile } from "@/components/meme-tile";
import { UserAvatar } from "@/components/user-avatar";
import { creatorOf, fmt, type Post } from "@/data/buzz";
import { useStore } from "@/lib/store";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const author = creatorOf(post.authorHandle);
  const [liked, setLiked] = useState(false);
  const saved = useStore((state) => state.saved.includes(post.id));
  const toggleSave = useStore((state) => state.toggleSave);

  return (
    <article
      className="card-surface hover-lift animate-rise overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <header className="flex items-center gap-3 px-5 pt-5">
        <Link to="/creators/$handle" params={{ handle: author.handle }}>
          <UserAvatar initials={author.initials} color={author.color} />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            to="/creators/$handle"
            params={{ handle: author.handle }}
            className="story-link text-sm font-semibold"
          >
            {author.name}
          </Link>
          <p className="font-mono text-xs text-muted-foreground">
            @{author.handle} · {post.time}
          </p>
        </div>
        <button
          onClick={() => toast("Post options coming soon")}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Post options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      <div className="px-5 pt-4">
        <Link
          to="/post/$postId"
          params={{ postId: post.id }}
          className="label-mono text-primary hover:opacity-70"
        >
          {post.category}
        </Link>
        <Link to="/post/$postId" params={{ postId: post.id }} className="block">
          <h3 className="mt-2 text-xl font-semibold leading-snug transition-colors hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{post.caption}</p>
      </div>

      <Link to="/post/$postId" params={{ postId: post.id }} className="mt-4 block px-5">
        <MemeTile tile={post.tile} />
      </Link>

      <footer className="flex items-center gap-5 px-5 py-4">
        <button
          onClick={() => setLiked((v) => !v)}
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground transition-transform active:scale-90",
            liked && "text-primary",
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          {fmt(post.likes + (liked ? 1 : 0))}
        </button>
        <Link
          to="/post/$postId"
          params={{ postId: post.id }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </Link>
        <button
          onClick={() => toast.success("Link copied to clipboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Share2 className="h-4 w-4" />
          {fmt(post.shares)}
        </button>
        {post.badge ? (
          <span
            className={cn(
              "label-mono rounded-full px-3 py-1 text-xs font-semibold",
              post.badge === "HOT" && "bg-primary text-primary-foreground",
              post.badge === "RISING" && "bg-foreground text-background",
              post.badge === "NEW" && "border border-border bg-card text-foreground",
            )}
          >
            {post.badge}
          </span>
        ) : null}
        <button
          onClick={() => {
            toggleSave(post.id);
            toast(saved ? "Removed from dashboard" : "Added to dashboard");
          }}
          className={cn(
            "ml-auto text-muted-foreground transition-colors hover:text-foreground",
            saved && "text-primary",
          )}
          aria-label="Save post"
        >
          <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
        </button>
      </footer>
    </article>
  );
}
