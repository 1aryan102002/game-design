import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Project } from "@/content/types";
import { ExternalLink } from "lucide-react";

type Props = {
  project: Project;
};

export default function ProjectDetail({ project }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-base font-semibold text-[var(--text)]">{project.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {project.links && project.links.length ? (
          <div className="flex flex-col gap-2">
            {project.links.slice(0, 2).map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                <Button type="button" variant="secondary" className="w-full justify-between">
                  <span className="truncate">{l.label}</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Responsibilities</div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Outcomes</div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Tools</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

