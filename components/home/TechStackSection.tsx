import { getLocalizedSkillGroups } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type TechStackSectionProps = {
  locale: Locale;
};

export function TechStackSection({ locale }: TechStackSectionProps) {
  const { techStack } = portfolioContent[locale];
  const skillGroups = getLocalizedSkillGroups(locale);

  return (
    <section
      id="stack"
      tabIndex={-1}
      className="section portfolio-stack"
      aria-labelledby="stack-title"
    >
      <Container>
        <SectionHeading
          eyebrow={techStack.eyebrow}
          title={techStack.title}
          description={techStack.description}
          titleId="stack-title"
        />
        <div className="stack-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="stack-group">
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
