import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { projects } from "@/content/content";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

function splitWriteup(writeup: string) {
  const lines = writeup
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks: { kind: "heading" | "bullet" | "para"; text: string }[] = [];
  for (const line of lines) {
    if (/:$/.test(line) || /^\d+\s*\./.test(line)) {
      blocks.push({ kind: "heading", text: line.replace(/^\d+\s*\.?\s*/, "") });
      continue;
    }
    if (/^[-•]/.test(line)) {
      blocks.push({ kind: "bullet", text: line.replace(/^[-•]\s*/, "") });
      continue;
    }
    blocks.push({ kind: "para", text: line });
  }
  return blocks;
}

export default function Project() {
  const params = useParams();
  const project = useMemo(() => projects.find((p) => p.id === params.id), [params.id]);

  useEffect(() => {
    if (!project) return;
    const prev = document.title;
    document.title = `${project.title} | Aryan Sharma`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-8">
          <div className="text-sm font-semibold text-[var(--text)]">Project not found</div>
          <div className="mt-2 text-sm text-[var(--muted)]">This project id doesn’t exist.</div>
          <div className="mt-6">
            <Link to="/projects">
              <Button type="button" variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const blocks = project.writeup ? splitWriteup(project.writeup) : [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/projects">
          <Button type="button" variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        {project.source ? (
          <a href={project.source.url} target="_blank" rel="noreferrer">
            <Button type="button" variant="secondary">
              <ExternalLink className="h-4 w-4" />
              {project.source.label}
            </Button>
          </a>
        ) : null}
      </div>

      <Card className="p-8">
        <div className="flex flex-wrap gap-2">
          {project.roles.map((r) => (
            <Badge key={r} className="text-[var(--text)]">
              {r}
            </Badge>
          ))}
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text)]">{project.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Responsibilities</div>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
              {project.responsibilities.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Outcomes</div>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
              {project.outcomes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Tools</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {project.links && project.links.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                <Button type="button" variant="secondary">
                  <ExternalLink className="h-4 w-4" />
                  {l.label}
                </Button>
              </a>
            ))}
          </div>
        ) : null}
      </Card>

      {blocks.length ? (
        <Card className="p-8">
          <div className="text-sm font-semibold text-[var(--text)]">Detailed write‑up</div>
          <div className="mt-4 space-y-4">
            {blocks.map((b, idx) => {
              if (b.kind === "heading") {
                return (
                  <div key={idx} className="pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {b.text}
                  </div>
                );
              }
              if (b.kind === "bullet") {
                return (
                  <div key={idx} className="flex gap-2 text-sm text-[var(--text)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{b.text}</span>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-sm text-[var(--text)]">
                  {b.text}
                </p>
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}

