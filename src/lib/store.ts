import { create } from "zustand";
import { posts as allPosts, type Post, type Tile } from "@/data/buzz";

type Store = {
  userPosts: Post[];
  posts: Post[];
  saved: string[];
  following: string[];
  addPost: (post: Post) => void;
  toggleSave: (id: string) => void;
  toggleFollow: (handle: string) => void;
};

export const useStore = create<Store>((set) => ({
  userPosts: [],
  posts: allPosts,
  saved: [],
  following: [],
  addPost: (post) =>
    set((state) => ({
      userPosts: [post, ...state.userPosts],
      posts: [post, ...state.posts],
    })),
  toggleSave: (id) =>
    set((state) => ({
      saved: state.saved.includes(id)
        ? state.saved.filter((s) => s !== id)
        : [...state.saved, id],
    })),
  toggleFollow: (handle) =>
    set((state) => ({
      following: state.following.includes(handle)
        ? state.following.filter((h) => h !== handle)
        : [...state.following, handle],
    })),
}));
