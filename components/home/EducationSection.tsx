import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type EducationSectionProps = {
  locale: Locale;
};

export function EducationSection({ locale }: EducationSectionProps) {
  const { education } = portfolioContent[locale];

  return (
    <MotionSection className="border-y border-[color:var(--site-border-soft)] bg-[var(--site-surface-soft)] py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={education.eyebrow} title={education.title} />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {education.items.map((item) => (
            <Card key={item.degree} className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-[color:var(--site-accent-border)] bg-[var(--site-accent-soft)]">
                  <GraduationCap aria-hidden="true" className="size-5 text-[var(--site-accent)]" />
                </div>
                <div>
                  <p className="font-mono text-sm text-[var(--site-accent-text)]">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--site-heading)]">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--site-muted)]">
                    {item.institution}
                  </p>
                  <p className="mt-4 text-base leading-7 text-[var(--site-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
