import { profile } from "@/content/content";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium text-[var(--text)]">{profile.name}</div>
        </div>

        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)]"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)]"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

