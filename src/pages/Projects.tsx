import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { projects, profile } from "@/content/content";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      for (const t of p.tags) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visibleProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Projects"
        description="Browse selected level design and game development work. Open a card for the full case study."
      />

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={activeTag === null ? "primary" : "secondary"}
            onClick={() => setActiveTag(null)}
            className="h-9 px-3"
          >
            All
          </Button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
              className={cn(
                "inline-flex h-9 items-center rounded-lg border px-3 text-sm transition",
                activeTag === t
                  ? "border-[color-mix(in_srgb,var(--accent)_60%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_20%,var(--surface))] text-[var(--text)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]",
              )}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-[var(--muted)]">
            <Badge>{visibleProjects.length} projects</Badge>
            <Badge>{profile.roles.join(" • ")}</Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="block">
            <ProjectCard project={p} rightSlot={<ArrowRight className="mt-1 h-4 w-4 text-[var(--muted)]" />} />
          </Link>
        ))}
      </div>
    </div>
  );
}

