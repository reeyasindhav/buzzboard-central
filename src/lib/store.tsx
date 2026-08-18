import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { posts as seedPosts, type Post, type Tile } from "@/data/buzz";

const KEY = "buzzboard.posts";
const SAVED_KEY = "buzzboard.saved";

type StoreValue = {
  posts: Post[];
  userPosts: Post[];
  saved: string[];
  addPost: (input: {
    title: string;
    caption: string;
    category: Post["category"];
    authorHandle: string;
    tile: Tile;
  }) => Post;
  toggleSaved: (id: string) => void;
  following: string[];
  toggleFollow: (handle: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUserPosts(JSON.parse(raw) as Post[]);
      const rawSaved = localStorage.getItem(SAVED_KEY);
      if (rawSaved) setSaved(JSON.parse(rawSaved) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      posts: [...userPosts, ...seedPosts],
      userPosts,
      saved,
      following,
      toggleFollow: (handle) =>
        setFollowing((prev) =>
          prev.includes(handle) ? prev.filter((x) => x !== handle) : [handle, ...prev],
        ),
      addPost: (input) => {
        const post: Post = {
          id: `u${Date.now()}`,
          time: "just now",
          likes: 0,
          comments: 0,
          shares: 0,
          badge: "NEW",
          ...input,
        };
        setUserPosts((prev) => {
          const next = [post, ...prev];
          localStorage.setItem(KEY, JSON.stringify(next));
          return next;
        });
        return post;
      },
      toggleSaved: (id) =>
        setSaved((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
          localStorage.setItem(SAVED_KEY, JSON.stringify(next));
          return next;
        }),
    }),
    [userPosts, saved, following],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
