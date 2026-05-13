import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const { aria, footer } = portfolioContent[locale];

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container className="flex flex-col gap-3 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. {footer.built}
        </p>
        <div className="flex gap-4">
          <a
            aria-label={aria.openGithub}
            className="transition hover:text-white"
            href={profile.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            aria-label={aria.openLinkedin}
            className="transition hover:text-white"
            href={profile.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
