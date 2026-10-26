import { profile } from "@/data/profile";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const { aria, footer } = portfolioContent[locale];
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <p>
          © {new Date().getFullYear()} {profile.name}. {footer.built}
        </p>
        <div className="footer-links">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={aria.openGithub}
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={aria.openLinkedin}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
