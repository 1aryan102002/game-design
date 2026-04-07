import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<Variant, string> = {
    primary: "bg-[var(--accent)] text-zinc-950 hover:opacity-90",
    secondary:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40",
    ghost: "text-[var(--text)] hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}

