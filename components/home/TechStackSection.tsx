import { getLocalizedSkillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
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
    <MotionSection id="stack" className="py-12 sm:py-16 lg:py-20" ariaLabelledby="stack-title">
      <Container>
        <SectionHeading
          eyebrow={techStack.eyebrow}
          title={techStack.title}
          description={techStack.description}
          titleId="stack-title"
        />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.title} className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-[var(--site-heading)]">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="border-[color:var(--site-border)] bg-[var(--site-card-strong-bg)] text-[var(--site-muted)]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
