export type Highlight = {
  title: string;
  value: string;
  description?: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  canvaProjects: string;
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export type TimelineEntry = {
  title: string;
  org?: string;
  location?: string;
  period?: string;
  bullets: string[];
};

export type ProfileContent = {
  name: string;
  avatar?: string;
  roles: string[];
  location: string;
  phone: string;
  emails: string[];
  headline: string;
  summary: string;
  about: string[];
  socials: SocialLinks;
  highlights: Highlight[];
  skills: SkillCategory[];
  timeline: TimelineEntry[];
};

export type ProjectMedia = {
  kind: "image" | "video";
  url: string;
  caption?: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type ContentSource = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  roles: string[];
  tools: string[];
  summary: string;
  responsibilities: string[];
  outcomes: string[];
  tags: string[];
  featured?: boolean;
  media?: ProjectMedia[];
  links?: ProjectLink[];
  writeup?: string;
  source?: ContentSource;
};

export type SiteContent = {
  title: string;
  description: string;
  accentLabel: string;
  nav: { label: string; to: string }[];
  footerNote: string;
};

