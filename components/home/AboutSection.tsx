import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type AboutSectionProps = {
  locale: Locale;
};

export function AboutSection({ locale }: AboutSectionProps) {
  const { about } = portfolioContent[locale];

  return (
    <section
      id="about"
      tabIndex={-1}
      className="section portfolio-about"
      aria-labelledby="about-title"
    >
      <Container>
        <div className="about-layout">
          <div className="about-overview">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} titleId="about-title" />
            <ul className="about-highlights accent-list" role="list">
              {about.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="about-prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
