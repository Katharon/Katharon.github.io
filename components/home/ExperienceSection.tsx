import { BriefcaseBusiness } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type ExperienceSectionProps = {
  locale: Locale;
};

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const { experience } = portfolioContent[locale];

  return (
    <MotionSection
      id="experience"
      className="py-12 sm:py-16 lg:py-20"
      ariaLabelledby="experience-title"
    >
      <Container>
        <SectionHeading
          eyebrow={experience.eyebrow}
          title={experience.title}
          titleId="experience-title"
        />
        <div className="mt-9 grid gap-4">
          {experience.items.map((item) => (
            <Card key={`${item.title}-${item.period}`} className="p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-5">
                <div className="grid size-11 place-items-center rounded-lg border border-[color:var(--site-accent-border)] bg-[var(--site-accent-soft)]">
                  <BriefcaseBusiness aria-hidden="true" className="size-5 text-[var(--site-accent)]" />
                </div>
                <div>
                  <h3 className="text-lg leading-7 font-semibold text-[var(--site-heading)]">
                    {item.title} <span className="text-[var(--site-faint)]">-</span>{" "}
                    <span className="text-[var(--site-muted)]">{item.organization}</span>
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--site-muted)]">
                    {item.description}
                  </p>
                </div>
                <p className="font-mono text-sm text-[var(--site-accent-text)] sm:text-right">
                  {item.period}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
