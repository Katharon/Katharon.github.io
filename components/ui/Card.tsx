import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-slate-950/20 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
