import siteJson from "./site.json";
import profileJson from "./profile.json";
import projectsJson from "./projects.json";
import type { ProfileContent, Project, SiteContent } from "./types";
import { resolveAssetUrl } from "./assets";

export const site = siteJson as SiteContent;
const profileRaw = profileJson as ProfileContent;

export const profile = {
  ...profileRaw,
  avatar: profileRaw.avatar ? resolveAssetUrl(profileRaw.avatar) : undefined,
} as ProfileContent;
export const projects = projectsJson as Project[];

