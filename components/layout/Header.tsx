import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <a
          className="group inline-flex items-center gap-3 text-sm font-semibold text-white"
          href="#top"
          aria-label={`${profile.name} home`}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-sky-300/30 bg-sky-300/10 font-mono text-sky-200">
            LS
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
