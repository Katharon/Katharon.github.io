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
    "border-[color:var(--site-primary-bg)] bg-[var(--site-primary-bg)] text-[var(--site-primary-text)] shadow-[var(--site-shadow-accent)] hover:bg-[var(--site-primary-hover)]",
  secondary:
    "border-[color:var(--site-border)] bg-[var(--site-control-bg)] text-[var(--site-heading)] hover:border-[color:var(--site-accent-border)] hover:bg-[var(--site-accent-soft)]",
  ghost:
    "border-transparent bg-transparent text-[var(--site-muted)] hover:bg-[var(--site-control-hover)] hover:text-[var(--site-heading)]",
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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition duration-200 focus:ring-2 focus:ring-[color:var(--site-accent)] focus:ring-offset-2 focus:ring-offset-[var(--site-bg)] focus:outline-none",
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
