import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({ title, description, className }: Props) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--text)] sm:text-xl">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[var(--muted)]">{description}</p> : null}
      </div>
    </div>
  );
}

