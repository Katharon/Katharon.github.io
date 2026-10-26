import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type ExperienceSectionProps = {
  locale: Locale;
};

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const { experience } = portfolioContent[locale];

  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section portfolio-experience"
      aria-labelledby="experience-title"
    >
      <Container>
        <div className="experience-layout">
          <SectionHeading
            eyebrow={experience.eyebrow}
            title={experience.title}
            titleId="experience-title"
          />
          <div className="experience-list">
            {experience.items.map((item) => (
              <article key={`${item.title}-${item.period}`} className="experience-entry">
                <p className="entry-period">{item.period}</p>
                <div className="experience-detail">
                  <h3>
                    {item.title} <span className="entry-separator">-</span>{" "}
                    <span className="entry-organization">{item.organization}</span>
                  </h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
