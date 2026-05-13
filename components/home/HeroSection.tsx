import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
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

const personalDetails = [
  {
    label: "Based in",
    value: profile.location,
    icon: MapPin,
  },
  {
    label: "Studying at",
    value: "FH Wiener Neustadt",
    icon: GraduationCap,
  },
  {
    label: "Background",
    value: "Kitchen lead to software systems",
    icon: BriefcaseBusiness,
  },
];

export function HeroSection({ cvHref }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.18),transparent_32rem),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.12),transparent_28rem),linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.96)_88%)]" />
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
            <Button
              href="#projects"
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
            <Button
              href={profile.github}
              external
              icon={Code2}
              ariaLabel="Open Lukas Stumpfel on GitHub"
              className="w-full sm:w-auto"
            >
              GitHub
            </Button>
            <Button
              href={profile.linkedin}
              external
              icon={ExternalLink}
              ariaLabel="Open Lukas Stumpfel on LinkedIn"
              className="w-full sm:w-auto"
            >
              LinkedIn
            </Button>
            <Button href={`mailto:${profile.email}`} icon={Mail} className="w-full sm:w-auto">
              Email
            </Button>
            {cvHref ? (
              <Button href={cvHref} icon={Download} download className="w-full sm:w-auto">
                Download CV
              </Button>
            ) : null}
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {personalDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-sky-200">
                  <detail.icon aria-hidden="true" className="size-4" />
                  <dt>{detail.label}</dt>
                </div>
                <dd className="mt-2 text-sm leading-6 text-slate-200">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Card className="relative overflow-hidden p-0 shadow-2xl shadow-sky-950/20">
          <div className="border-b border-white/10 bg-slate-900/80 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <Terminal aria-hidden="true" className="size-4 text-sky-300" />
              current-profile.md
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
            <div className="rounded-lg border border-sky-300/15 bg-sky-300/[0.07] p-5">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase">
                Thesis path
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Migrating a Docker Compose based multi-server setup toward Kubernetes with an
                emphasis on recovery, reproducibility and maintainability.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
