export type Accent = "teal" | "orange" | "slate";

export type Section = {
  id: string;
  title: string;
  category: string;
  accent?: Accent;
  screenshot?: string;
  tags?: string[];
};

export type HeroStat = {
  label: string;
  value: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  heroEyebrow?: string;
  heroStats?: HeroStat[];
  tags?: string[];
  sections: Section[];
  body: string;
};

export type SectionWithProse = Section & {
  prose: string;
};
