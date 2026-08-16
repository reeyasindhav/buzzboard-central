export type Tile = {
  bg: "purple" | "blue" | "green" | "yellow" | "pink";
  kicker: string;
  big: string;
  sub: string;
  script?: string;
};

export type Post = {
  id: string;
  title: string;
  caption: string;
  category: Category;
  authorHandle: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  badge?: "HOT" | "RISING" | "NEW";
  tile: Tile;
};

export type Creator = {
  handle: string;
  name: string;
  initials: string;
  color: "purple" | "blue" | "green" | "yellow" | "pink";
  score: number;
  followers: string;
  posts: number;
  bio: string;
};

export const categories = [
  "For you",
  "Fresh",
  "Dank",
  "Wholesome",
  "Gaming",
  "Culture",
] as const;
export type Category = "Dank" | "Wholesome" | "Gaming" | "Culture" | "Fresh";

export const creators: Creator[] = [
  {
    handle: "mayamakes",
    name: "Maya Chen",
    initials: "MC",
    color: "purple",
    score: 84200,
    followers: "128K",
    posts: 342,
    bio: "Professional overthinker. Group chat historian. I make the memes you screenshot at 2am.",
  },
  {
    handle: "nwilliams",
    name: "Noah Williams",
    initials: "NW",
    color: "blue",
    score: 71800,
    followers: "96K",
    posts: 288,
    bio: "There is no plan, only vibes. Gaming memes and questionable strategies.",
  },
  {
    handle: "sofiar",
    name: "Sofia Reyes",
    initials: "SR",
    color: "green",
    score: 68400,
    followers: "88K",
    posts: 411,
    bio: "Wholesome content dealer. Small wins count too.",
  },
  {
    handle: "arip",
    name: "Ari Patel",
    initials: "AP",
    color: "yellow",
    score: 52900,
    followers: "61K",
    posts: 197,
    bio: "Culture commentary in 4 panels or less.",
  },
  {
    handle: "deepfriedkev",
    name: "Kev Doyle",
    initials: "KD",
    color: "pink",
    score: 44100,
    followers: "45K",
    posts: 520,
    bio: "Deep fried since 2014. Quality is a spectrum.",
  },
  {
    handle: "luna.exe",
    name: "Luna Ortiz",
    initials: "LO",
    color: "purple",
    score: 38600,
    followers: "39K",
    posts: 164,
    bio: "Terminally online. Reporting live from the timeline.",
  },
];

export const posts: Post[] = [
  {
    id: "1",
    title: 'When the group chat goes silent after you say "I have an idea"',
    caption: "The idea:",
    category: "Culture",
    authorHandle: "mayamakes",
    time: "12 min ago",
    likes: 18400,
    comments: 342,
    shares: 1200,
    badge: "HOT",
    tile: { bg: "purple", kicker: "", big: "ಠ_ಠ", sub: "THIS IS FINE", script: "the idea" },
  },
  {
    id: "2",
    title: "Me explaining to my friends why this is actually a strategy",
    caption: "There is no plan. Only vibes.",
    category: "Gaming",
    authorHandle: "nwilliams",
    time: "28 min ago",
    likes: 12600,
    comments: 198,
    shares: 866,
    badge: "RISING",
    tile: { bg: "blue", kicker: "THE PLAN", big: "???", sub: "it's working" },
  },
  {
    id: "3",
    title: "The little wins count too",
    caption: "Today I answered one email before noon. I am basically unstoppable.",
    category: "Wholesome",
    authorHandle: "sofiar",
    time: "1 hr ago",
    likes: 9800,
    comments: 156,
    shares: 431,
    badge: "RISING",
    tile: { bg: "green", kicker: "SMALL WIN", big: "+1", sub: "keep going" },
  },
  {
    id: "4",
    title: "Nobody: / My browser at 3pm:",
    caption: "47 tabs and none of them are the one playing music.",
    category: "Dank",
    authorHandle: "deepfriedkev",
    time: "2 hr ago",
    likes: 22100,
    comments: 604,
    shares: 2400,
    badge: "HOT",
    tile: { bg: "yellow", kicker: "TABS OPEN", big: "47", sub: "which one is it" },
  },
  {
    id: "5",
    title: "Reading the room and deciding to ignore it",
    caption: "A skill, honestly.",
    category: "Culture",
    authorHandle: "arip",
    time: "3 hr ago",
    likes: 7400,
    comments: 121,
    shares: 288,
    badge: "NEW",
    tile: { bg: "pink", kicker: "THE ROOM", big: "¯\\_(ツ)_/¯", sub: "read. ignored." },
  },
  {
    id: "6",
    title: "Ranked mode has changed me as a person",
    caption: "I used to be nice.",
    category: "Gaming",
    authorHandle: "luna.exe",
    time: "5 hr ago",
    likes: 15300,
    comments: 402,
    shares: 910,
    tile: { bg: "blue", kicker: "RANK", big: "GOLD IV", sub: "forever" },
  },
  {
    id: "7",
    title: "My plant survived a week. We are both healing.",
    caption: "Progress is progress.",
    category: "Wholesome",
    authorHandle: "sofiar",
    time: "7 hr ago",
    likes: 11200,
    comments: 187,
    shares: 340,
    tile: { bg: "green", kicker: "DAY 7", big: "🌱", sub: "still alive" },
  },
  {
    id: "8",
    title: "The algorithm knows too much and I hate that it's right",
    caption: "Stop it. (Do not stop it.)",
    category: "Fresh",
    authorHandle: "mayamakes",
    time: "9 hr ago",
    likes: 19800,
    comments: 512,
    shares: 1700,
    badge: "HOT",
    tile: { bg: "purple", kicker: "FOR YOU", big: "👁", sub: "we know" },
  },
  {
    id: "9",
    title: "Deep fried until the pixels gave up",
    caption: "Quality? Never heard of her.",
    category: "Dank",
    authorHandle: "deepfriedkev",
    time: "11 hr ago",
    likes: 8900,
    comments: 233,
    shares: 512,
    tile: { bg: "yellow", kicker: "JPEG", big: "%$#@", sub: "artifacts everywhere" },
  },
];

export const tileClass: Record<Tile["bg"], string> = {
  purple: "bg-tile-purple text-[oklch(0.42_0.16_315)]",
  blue: "bg-tile-blue text-[oklch(0.42_0.12_245)]",
  green: "bg-tile-green text-[oklch(0.42_0.13_145)]",
  yellow: "bg-tile-yellow text-[oklch(0.45_0.13_75)]",
  pink: "bg-tile-pink text-[oklch(0.45_0.15_20)]",
};

export const avatarClass: Record<Creator["color"], string> = {
  purple: "bg-tile-purple text-[oklch(0.4_0.16_315)]",
  blue: "bg-tile-blue text-[oklch(0.4_0.12_245)]",
  green: "bg-tile-green text-[oklch(0.4_0.13_145)]",
  yellow: "bg-tile-yellow text-[oklch(0.42_0.13_75)]",
  pink: "bg-tile-pink text-[oklch(0.42_0.15_20)]",
};

export function creatorOf(handle: string) {
  return (creators.find((c) => c.handle === handle) ?? creators[0]) as Creator;
}

export function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}
