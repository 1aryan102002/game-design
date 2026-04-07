import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { Project } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  project: Project;
  rightSlot?: React.ReactNode;
};

export default function ProjectCard({ project, rightSlot }: Props) {
  return (
    <Card className="group h-full p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[var(--text)]">{project.title}</div>
          <div className="mt-1 text-sm text-[var(--muted)]">{project.summary}</div>
        </div>
        {rightSlot ?? (
          <ArrowRight className="mt-1 h-4 w-4 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--text)]" />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.roles.slice(0, 2).map((r) => (
          <Badge key={r} className="text-[var(--text)]">
            {r}
          </Badge>
        ))}
        {project.tools.slice(0, 2).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Card>
  );
}

