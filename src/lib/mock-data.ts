export type Note = {
  id: string;
  title: string;
  preview: string;
  content: string;
  tags: string[];
  favorite: boolean;
  updatedAt: string;
  linked: string[];
};

export type Tag = { id: string; name: string; color: string; count: number };

export type Activity = {
  id: string;
  type: "created" | "edited" | "linked" | "tagged" | "favorited";
  noteTitle: string;
  time: string;
};

export const mockTags: Tag[] = [
  { id: "t1", name: "research", color: "neon-blue", count: 14 },
  { id: "t2", name: "ideas", color: "neon-purple", count: 21 },
  { id: "t3", name: "books", color: "neon-pink", count: 9 },
  { id: "t4", name: "projects", color: "neon-green", count: 12 },
  { id: "t5", name: "daily", color: "neon-blue", count: 33 },
  { id: "t6", name: "philosophy", color: "neon-purple", count: 7 },
  { id: "t7", name: "design", color: "neon-pink", count: 11 },
  { id: "t8", name: "ml", color: "neon-green", count: 18 },
];

export const mockNotes: Note[] = [
  {
    id: "n1",
    title: "The Second Brain Method",
    preview: "Capture, organize, distill, express. A simple loop to build durable knowledge over years.",
    content:
      "The Second Brain methodology is built on four pillars: Capture interesting ideas, Organize them by actionability, Distill the essence, and Express your unique synthesis. The compound effect over years is staggering.",
    tags: ["ideas", "research"],
    favorite: true,
    updatedAt: "2h ago",
    linked: ["n2", "n5", "n7"],
  },
  {
    id: "n2",
    title: "Atomic Notes",
    preview: "One idea per note. Link generously. Let structure emerge instead of forcing it.",
    content: "Atomic notes are single-concept units. Their power lies in composability — small pieces that connect into emergent structures.",
    tags: ["ideas", "philosophy"],
    favorite: true,
    updatedAt: "Yesterday",
    linked: ["n1", "n3"],
  },
  {
    id: "n3",
    title: "Zettelkasten in Practice",
    preview: "Luhmann produced 90k notes and 70 books. The system scales with discipline.",
    content: "Niklas Luhmann's slip-box method shows what's possible when notes talk to each other.",
    tags: ["research", "books"],
    favorite: false,
    updatedAt: "3d ago",
    linked: ["n1", "n2"],
  },
  {
    id: "n4",
    title: "Transformer Attention",
    preview: "Q, K, V matrices. Scaled dot product. Softmax. Why it changed NLP forever.",
    content: "Attention is all you need — a paper that rewrote the field. Self-attention computes weighted importance across tokens.",
    tags: ["ml", "research"],
    favorite: true,
    updatedAt: "5d ago",
    linked: ["n6"],
  },
  {
    id: "n5",
    title: "Daily Review Ritual",
    preview: "15 minutes each evening. Skim the day. Promote captures into permanent notes.",
    content: "A quiet 15 minutes compounds. Review captures, link them, drop the noise.",
    tags: ["daily", "projects"],
    favorite: false,
    updatedAt: "1w ago",
    linked: ["n1"],
  },
  {
    id: "n6",
    title: "Vector Embeddings 101",
    preview: "From sparse one-hot to dense semantic vectors. Cosine similarity beats Levenshtein.",
    content: "Embeddings collapse high dimensional symbols into meaningful geometry.",
    tags: ["ml", "research"],
    favorite: false,
    updatedAt: "1w ago",
    linked: ["n4"],
  },
  {
    id: "n7",
    title: "Designing for Focus",
    preview: "Reduce surface area. Lower contrast on chrome, raise it on content.",
    content: "Calm interfaces let the work breathe. Strip until only the necessary remains.",
    tags: ["design", "ideas"],
    favorite: true,
    updatedAt: "2w ago",
    linked: ["n1", "n8"],
  },
  {
    id: "n8",
    title: "Color in Dark UIs",
    preview: "Avoid pure black. Use desaturated surfaces. Reserve saturation for action.",
    content: "Dark mode lives or dies by hierarchy. Saturated accents earn attention.",
    tags: ["design"],
    favorite: false,
    updatedAt: "2w ago",
    linked: ["n7"],
  },
  {
    id: "n9",
    title: "Stoic Reading List",
    preview: "Meditations, Letters from a Stoic, Discourses. Read slowly, return often.",
    content: "Marcus, Seneca, Epictetus. The classics still hit.",
    tags: ["books", "philosophy"],
    favorite: false,
    updatedAt: "3w ago",
    linked: [],
  },
  {
    id: "n10",
    title: "Project: Second Brain App",
    preview: "Build a dark, fast, opinionated knowledge tool. Ship in 30 days.",
    content: "Goals, milestones, risks. Keep scope tight.",
    tags: ["projects"],
    favorite: true,
    updatedAt: "3w ago",
    linked: ["n1", "n5"],
  },
  {
    id: "n11",
    title: "Reading: Range by Epstein",
    preview: "Generalists triumph in a specialized world. Late specialization wins long term.",
    content: "Sampling broadly builds match quality between person and pursuit.",
    tags: ["books"],
    favorite: false,
    updatedAt: "1mo ago",
    linked: [],
  },
  {
    id: "n12",
    title: "RAG Architectures",
    preview: "Chunk, embed, retrieve, augment, generate. Pitfalls at every step.",
    content: "Retrieval Augmented Generation is a system, not a single model.",
    tags: ["ml", "projects"],
    favorite: false,
    updatedAt: "1mo ago",
    linked: ["n4", "n6"],
  },
];

export const mockTrash: Note[] = [
  { id: "d1", title: "Old draft - newsletter v0", preview: "Abandoned tone, restart from scratch.", content: "", tags: ["ideas"], favorite: false, updatedAt: "deleted 2d ago", linked: [] },
  { id: "d2", title: "Meeting notes 12 May", preview: "Superseded by project brief.", content: "", tags: ["projects"], favorite: false, updatedAt: "deleted 5d ago", linked: [] },
  { id: "d3", title: "Random idea: pomodoro plant", preview: "Cute but unfocused.", content: "", tags: ["ideas"], favorite: false, updatedAt: "deleted 1w ago", linked: [] },
];

export const mockActivity: Activity[] = [
  { id: "a1", type: "created", noteTitle: "The Second Brain Method", time: "2h ago" },
  { id: "a2", type: "linked", noteTitle: "Atomic Notes → Zettelkasten in Practice", time: "5h ago" },
  { id: "a3", type: "edited", noteTitle: "Transformer Attention", time: "Yesterday" },
  { id: "a4", type: "favorited", noteTitle: "Designing for Focus", time: "Yesterday" },
  { id: "a5", type: "tagged", noteTitle: "RAG Architectures + #ml", time: "2d ago" },
  { id: "a6", type: "created", noteTitle: "Daily Review Ritual", time: "3d ago" },
  { id: "a7", type: "linked", noteTitle: "Vector Embeddings 101 → Transformer Attention", time: "5d ago" },
  { id: "a8", type: "edited", noteTitle: "Color in Dark UIs", time: "1w ago" },
];

export const mockStats = {
  totalNotes: mockNotes.length,
  totalTags: mockTags.length,
  connections: mockNotes.reduce((a, n) => a + n.linked.length, 0),
  activity: mockActivity.length,
};
