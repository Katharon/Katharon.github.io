import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type EducationSectionProps = {
  locale: Locale;
};

export function EducationSection({ locale }: EducationSectionProps) {
  const { education } = portfolioContent[locale];

  return (
    <section
      id="education"
      className="section section--muted portfolio-education"
      aria-labelledby="education-title"
    >
      <Container>
        <SectionHeading
          eyebrow={education.eyebrow}
          title={education.title}
          titleId="education-title"
        />
        <div className="education-grid">
          {education.items.map((item) => (
            <article key={item.degree} className="education-entry">
              <p className="entry-period">{item.period}</p>
              <h3>{item.degree}</h3>
              <p className="education-institution">{item.institution}</p>
              <p className="education-description">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
