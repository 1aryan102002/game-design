import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className, children }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

