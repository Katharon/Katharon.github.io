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
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type HeroSectionProps = {
  locale: Locale;
  cvHref: string | null;
};

const personalDetailIcons = [MapPin, GraduationCap, BriefcaseBusiness];

export function HeroSection({ locale, cvHref }: HeroSectionProps) {
  const { aria, hero } = portfolioContent[locale];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-12 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-24"
    >
      <div className="absolute inset-0 -z-10 bg-[image:var(--site-hero-bg)]" />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge className="mb-5 sm:mb-6">{hero.badge}</Badge>
          <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-[var(--site-heading)] sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-[var(--site-heading)] sm:mt-6 sm:text-2xl sm:leading-9">
            {profile.role[locale]}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--site-muted)] sm:text-lg">
            {hero.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="#projects"
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              {hero.buttons.projects}
            </Button>
            <Button
              href={profile.github}
              external
              icon={Code2}
              ariaLabel={aria.openGithub}
              className="min-w-32 flex-1 sm:flex-none"
            >
              {hero.buttons.github}
            </Button>
            <Button
              href={profile.linkedin}
              external
              icon={ExternalLink}
              ariaLabel={aria.openLinkedin}
              className="min-w-32 flex-1 sm:flex-none"
            >
              {hero.buttons.linkedin}
            </Button>
            <Button
              href={`mailto:${profile.email}`}
              icon={Mail}
              ariaLabel={aria.emailProfile}
              className="min-w-32 flex-1 sm:flex-none"
            >
              {hero.buttons.email}
            </Button>
            {cvHref ? (
              <Button
                href={cvHref}
                icon={Download}
                download
                className="min-w-32 flex-1 sm:flex-none"
              >
                {hero.buttons.cv}
              </Button>
            ) : null}
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {hero.details.map((detail, index) => {
              const Icon = personalDetailIcons[index] ?? MapPin;
              const value = "valueKey" in detail ? profile.location[locale] : detail.value;

              return (
                <div
                  key={detail.label}
                  className="rounded-lg border border-[color:var(--site-border)] bg-[var(--site-card-bg)] p-4"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--site-accent-text)]">
                    <Icon aria-hidden="true" className="size-4" />
                    <dt>{detail.label}</dt>
                  </div>
                  <dd className="mt-2 text-sm leading-6 text-[var(--site-muted)]">{value}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <Card className="relative overflow-hidden p-0 shadow-[var(--site-shadow-accent)]">
          <div className="border-b border-[color:var(--site-border)] bg-[var(--site-card-strong-bg)] px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--site-muted)]">
              <Terminal aria-hidden="true" className="size-4 text-[var(--site-accent)]" />
              {hero.profileFile}
            </div>
          </div>
          <div className="space-y-4 p-5 sm:space-y-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: ".NET", icon: Code2 },
                { label: "Linux", icon: Terminal },
                { label: "K8s", icon: Server },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-[color:var(--site-border)] bg-[var(--site-card-strong-bg)] p-4"
                >
                  <item.icon aria-hidden="true" className="mb-4 size-5 text-[var(--site-accent)]" />
                  <p className="font-mono text-sm text-[var(--site-heading)]">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-[color:var(--site-border)] bg-[var(--site-card-deep-bg)] p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--site-heading)]">
                <Network aria-hidden="true" className="size-4 text-[var(--site-accent)]" />
                {hero.currentFocusTitle}
              </div>
              <ul className="space-y-3">
                {hero.signalItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--site-muted)]">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--site-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[color:var(--site-accent-border)] bg-[var(--site-accent-muted)] p-5">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--site-accent-text)] uppercase">
                {hero.thesisLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--site-muted)]">{hero.thesisText}</p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
