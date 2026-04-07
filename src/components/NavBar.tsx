import { site, profile } from "@/content/content";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Linkedin, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="group inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <span className="text-sm font-semibold text-[var(--text)]">AS</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-[var(--text)]">{profile.name}</div>
              <div className="text-xs text-[var(--muted)]">{profile.roles.join(" • ")}</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm transition hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40",
                  isActive ? "bg-zinc-100/70 text-[var(--text)] dark:bg-zinc-900/50" : "text-[var(--muted)]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="px-3 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--muted)] transition hover:text-[var(--text)] sm:inline-flex"
            aria-label="Open GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--muted)] transition hover:text-[var(--text)] sm:inline-flex"
            aria-label="Open LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Button
            type="button"
            variant="secondary"
            onClick={toggleTheme}
            className="px-3"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
          </Button>
          <a
            href={profile.socials.canvaProjects}
            target="_blank"
            rel="noreferrer"
            className="inline-flex"
          >
            <Button type="button" className="px-3">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Project Docs</span>
              <span className="sm:hidden">Docs</span>
            </Button>
          </a>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6" role="navigation" aria-label="Mobile">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm transition hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40",
                    isActive ? "bg-zinc-100/70 text-[var(--text)] dark:bg-zinc-900/50" : "text-[var(--muted)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

