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
  const TrailingIcon = Icon ?? (variant === "primary" ? ArrowRight : undefined);
  return (
    <a
      className={clsx("button", "button--" + variant, className)}
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
    >
      <span>{children}</span>
      {TrailingIcon && <TrailingIcon aria-hidden="true" />}
    </a>
  );
}
