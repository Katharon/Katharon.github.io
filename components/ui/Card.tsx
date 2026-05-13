import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-[color:var(--site-border)] bg-[var(--site-card-bg)] p-6 shadow-[var(--site-shadow-card)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
