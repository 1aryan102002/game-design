import Card from "@/components/ui/Card";
import { projects } from "@/content/content";
import { useEffect, useMemo } from "react";

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

export default function LevelDesignerDraft() {
  const items = useMemo(
    () =>
      projects
        .filter((p) => p.writeup)
        .map((p) => ({
          id: p.id,
          title: p.title,
          blocks: p.writeup ? splitWriteup(p.writeup) : [],
        })),
    [],
  );

  useEffect(() => {
    const prev = document.title;
    document.title = "Level Designer (Draft) | Aryan Sharma";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="p-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Draft preview</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">Level Designer</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This page is a copy-style rewrite-up view of the content, kept separate (not linked in navigation).
        </p>
      </Card>

      {items.map((p) => (
        <Card key={p.id} className="p-8">
          <div className="text-lg font-semibold tracking-tight text-[var(--text)]">{p.title}</div>
          <div className="mt-4 space-y-4">
            {p.blocks.map((b, idx) => {
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
      ))}
    </div>
  );
}

