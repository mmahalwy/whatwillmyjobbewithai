export interface Job {
  slug: string;
  title: string;
  transformsTo: string;
  category: string;
  content: string;
}

export interface JobMeta {
  slug: string;
  title: string;
  transformsTo: string;
  category: string;
}

export const CATEGORIES = [
  "Software Development",
  "Data & Analytics",
  "Product & Design",
  "Marketing & Content",
  "Infrastructure & Security",
  "Support & Operations",
] as const;

export type Category = (typeof CATEGORIES)[number];
