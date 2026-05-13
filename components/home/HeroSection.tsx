import {
  ArrowRight,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Network,
  Server,
  Terminal,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";

type HeroSectionProps = {
  cvHref: string | null;
};

const signalItems = [
  "C#/.NET full-stack development",
  "Linux, Docker and Kubernetes focus",
  "Distributed systems and platform concepts",
];

export function HeroSection({ cvHref }: HeroSectionProps) {
  return (
    <section id="top" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_34rem),linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.92)_82%)]" />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge className="mb-6">Junior software engineer portfolio</Badge>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-100 sm:text-2xl">
            {profile.role}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I build practical software systems with a strong interest in platform engineering,
            backend architecture and infrastructure automation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary" icon={ArrowRight}>
              View Projects
            </Button>
            <Button
              href={profile.github}
              external
              icon={Code2}
              ariaLabel="Open Lukas Stumpfel on GitHub"
            >
              GitHub
            </Button>
            <Button
              href={profile.linkedin}
              external
              icon={ExternalLink}
              ariaLabel="Open Lukas Stumpfel on LinkedIn"
            >
              LinkedIn
            </Button>
            <Button href={`mailto:${profile.email}`} icon={Mail}>
              Email
            </Button>
            {cvHref ? (
              <Button href={cvHref} icon={Download} download>
                Download CV
              </Button>
            ) : null}
          </div>
        </div>

        <Card className="relative overflow-hidden p-0">
          <div className="border-b border-white/10 bg-slate-900/80 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <Terminal aria-hidden="true" className="size-4 text-sky-300" />
              platform-focus.ts
            </div>
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: ".NET", icon: Code2 },
                { label: "Linux", icon: Terminal },
                { label: "K8s", icon: Server },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
                >
                  <item.icon aria-hidden="true" className="mb-4 size-5 text-sky-300" />
                  <p className="font-mono text-sm text-slate-100">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Network aria-hidden="true" className="size-4 text-sky-300" />
                Current direction
              </div>
              <ul className="space-y-3">
                {signalItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
