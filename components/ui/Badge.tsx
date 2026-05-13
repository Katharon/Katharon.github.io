import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-[color:var(--site-accent-border)] bg-[var(--site-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--site-accent-text)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
