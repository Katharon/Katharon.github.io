import Image from "next/image";
import { ArrowRight, Code2, Download, ExternalLink, Mail, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { portfolioContent } from "@/data/content";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/data/i18n";

export function HeroSection({ locale, cvHref }: { locale: Locale; cvHref: string | null }) {
  const { aria, hero } = portfolioContent[locale];
  return (
    <>
      <section id="top" tabIndex={-1} className="hero-section" aria-labelledby="hero-title">
        <div className="hero-image hero-image--dark" aria-hidden="true">
          <Image
            src="/images/hero-blackline.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 76vw"
            fetchPriority="high"
          />
        </div>
        <div className="hero-image hero-image--light" aria-hidden="true">
          <Image
            src="/images/hero-light.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 76vw"
            fetchPriority="high"
          />
        </div>
        <div className="hero-body container">
          <div className="hero-copy">
            <p className="eyebrow">{hero.badge}</p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="hero-role">{profile.role[locale]}</p>
            <p className="hero-intro">{hero.intro}</p>
            <div className="hero-actions">
              <Button href="#projects" variant="primary" icon={ArrowRight}>
                {hero.buttons.projects}
              </Button>
              {cvHref && (
                <Button href={cvHref} download icon={Download}>
                  {hero.buttons.cv}
                </Button>
              )}
            </div>
            <div className="hero-social">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria.openGithub}
              >
                {hero.buttons.github}
                <Code2 aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria.openLinkedin}
              >
                {hero.buttons.linkedin}
                <ExternalLink aria-hidden="true" />
              </a>
              <a href={"mailto:" + profile.email} aria-label={aria.emailProfile}>
                {hero.buttons.email}
                <Mail aria-hidden="true" />
              </a>
            </div>
          </div>
          <dl className="hero-details">
            {hero.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{"valueKey" in detail ? profile.location[locale] : detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="profile-panel">
        <div className="profile-grid container">
          <div>
            <p className="profile-file">
              <Terminal aria-hidden="true" />
              {hero.profileFile}
            </p>
            <div className="profile-stack">
              <span>.NET</span>
              <span>Linux</span>
              <span>K8s</span>
            </div>
          </div>
          <div>
            <h2>{hero.currentFocusTitle}</h2>
            <ul>
              {hero.signalItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="profile-thesis">
            <h2>{hero.thesisLabel}</h2>
            <p>{hero.thesisText}</p>
          </div>
        </div>
      </div>
    </>
  );
}
