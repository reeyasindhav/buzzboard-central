export type Tile = {
  bg: "purple" | "blue" | "green" | "yellow" | "pink";
  kicker: string;
  big: string;
  sub: string;
  script?: string;
  imageUrl?: string;
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
    title: "Just adopted this little guy from the shelter. He's been sitting in the corner for 3 hours.",
    caption: "Reddit, meet Barnaby. He's a 2 year old lab mix who was found as a stray. Update: he's already playing with toys!",
    category: "Wholesome",
    authorHandle: "sofiar",
    time: "45 min ago",
    likes: 28400,
    comments: 1243,
    shares: 3400,
    badge: "HOT",
    tile: {
      bg: "green",
      kicker: "ADOPTION",
      big: "Barnaby's first day home",
      sub: "r/aww",
      imageUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop",
    },
  },
  {
    id: "2",
    title: "I built a tiny home office in my apartment's unused closet. It's 3ft deep but it works.",
    caption: "Details in comments. Monitor is 27\", desk is custom IKEA hack. The chair is a Herman Miller knockoff.",
    category: "Culture",
    authorHandle: "mayamakes",
    time: "1 hr ago",
    likes: 15600,
    comments: 892,
    shares: 2100,
    badge: "RISING",
    tile: {
      bg: "purple",
      kicker: "DIY",
      big: "Closet Office",
      sub: "r/lifeprotips",
      imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop",
    },
  },
  {
    id: "3",
    title: "This street food vendor in Bangkok makes the best Pad Thai I've ever had. $2 a plate.",
    caption: "Found her stall behind the temple. She's been there for 35 years. The secret is the tamarind paste.",
    category: "Fresh",
    authorHandle: "arip",
    time: "2 hr ago",
    likes: 22100,
    comments: 1567,
    shares: 4100,
    badge: "HOT",
    tile: {
      bg: "yellow",
      kicker: "FOOD",
      big: "Bangkok Street Food",
      sub: "r/food",
      imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=500&fit=crop",
    },
  },
  {
    id: "4",
    title: "My neighborhood library has a 'mystery book' section where the covers are wrapped in brown paper.",
    caption: "You only know the genre and a short description written by the librarian. Best thing my town ever did.",
    category: "Wholesome",
    authorHandle: "nwilliams",
    time: "3 hr ago",
    likes: 18900,
    comments: 923,
    shares: 2800,
    badge: "RISING",
    tile: {
      bg: "blue",
      kicker: "LIBRARY",
      big: "Mystery Books",
      sub: "r/books",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
    },
  },
  {
    id: "5",
    title: "My cat learned to open doors. This is now my life.",
    caption: "He knows which doors I hide the treats behind. He stares at me until I give in.",
    category: "Dank",
    authorHandle: "deepfriedkev",
    time: "4 hr ago",
    likes: 31200,
    comments: 2100,
    shares: 5600,
    badge: "HOT",
    tile: {
      bg: "pink",
      kicker: "CAT LIFE",
      big: "Door Opener",
      sub: "r/cats",
      imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=500&fit=crop",
    },
  },
  {
    id: "6",
    title: "Finally beat Elden Ring after 147 attempts. Here's my exact build for anyone stuck.",
    caption: "Sword of Night and Flame, 40 INT, 40 FTH. The strategy is in the comments.",
    category: "Gaming",
    authorHandle: "luna.exe",
    time: "5 hr ago",
    likes: 9400,
    comments: 756,
    shares: 1200,
    badge: "NEW",
    tile: {
      bg: "blue",
      kicker: "GAMING",
      big: "Elden Ring Victory",
      sub: "r/gaming",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    },
  },
  {
    id: "7",
    title: "My wife and I planted 200 trees on our wedding day instead of having a guest list.",
    caption: "3 years later we visited. 87% survival rate. The forest is growing.",
    category: "Wholesome",
    authorHandle: "sofiar",
    time: "6 hr ago",
    likes: 42100,
    comments: 3100,
    shares: 8900,
    badge: "HOT",
    tile: {
      bg: "green",
      kicker: "WEDDING",
      big: "200 Trees",
      sub: "r/upliftingnews",
      imageUrl: "https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop",
    },
  },
  {
    id: "8",
    title: "The 'check engine' light was on for 3 weeks. Turns out it was just the gas cap.",
    caption: "Mechanic charged me $80 to tell me that. Never forget to tighten the cap.",
    category: "Dank",
    authorHandle: "deepfriedkev",
    time: "8 hr ago",
    likes: 27800,
    comments: 1890,
    shares: 4200,
    badge: "RISING",
    tile: {
      bg: "yellow",
      kicker: "CAR LIFE",
      big: "Gas Cap",
      sub: "r/mechanicalhead",
      imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop",
    },
  },
  {
    id: "9",
    title: "My sourdough finally worked after 12 failed attempts. Here's the crumb shot.",
    caption: "The trick was temperature control and patience. No more dense bricks.",
    category: "Fresh",
    authorHandle: "mayamakes",
    time: "10 hr ago",
    likes: 14300,
    comments: 634,
    shares: 1900,
    badge: "NEW",
    tile: {
      bg: "purple",
      kicker: "BAKING",
      big: "Sourdough Success",
      sub: "r/breadit",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop",
    },
  },
  {
    id: "10",
    title: "This tiny frog has been sitting on the same leaf in my garden for 3 days.",
    caption: "Is he guarding something? Is he just tired? The internet needs to know.",
    category: "Fresh",
    authorHandle: "arip",
    time: "12 hr ago",
    likes: 36700,
    comments: 2450,
    shares: 6700,
    badge: "HOT",
    tile: {
      bg: "green",
      kicker: "NATURE",
      big: "Tiny Frog",
      sub: "r/natureisfuckinglit",
      imageUrl: "https://images.pexels.com/photos/247822/pexels-photo-247822.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop",
    },
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
