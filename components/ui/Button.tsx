import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  href: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  primary:
    "border-sky-400/60 bg-sky-400 text-slate-950 shadow-lg shadow-sky-950/25 hover:bg-sky-300",
  secondary:
    "border-white/12 bg-white/[0.06] text-slate-100 hover:border-sky-300/40 hover:bg-sky-400/10",
  ghost: "border-transparent bg-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white",
};

export function Button({
  children,
  href,
  icon: Icon,
  variant = "secondary",
  external = false,
  download = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const trailingIcon = Icon ?? (variant === "primary" ? ArrowRight : undefined);

  return (
    <a
      aria-label={ariaLabel}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition duration-200 focus:ring-2 focus:ring-sky-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none",
        variants[variant],
        className,
      )}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={download || undefined}
    >
      <span>{children}</span>
      {trailingIcon ? <IconRenderer icon={trailingIcon} /> : null}
    </a>
  );
}

function IconRenderer({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />;
}
