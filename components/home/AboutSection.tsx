import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type AboutSectionProps = {
  locale: Locale;
};

export function AboutSection({ locale }: AboutSectionProps) {
  const { about } = portfolioContent[locale];

  return (
    <MotionSection
      id="about"
      className="border-y border-white/[0.06] bg-slate-950/70 py-12 sm:py-16 lg:py-20"
      ariaLabelledby="about-title"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            titleId="about-title"
          />
          <Card className="p-5 sm:p-6">
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </MotionSection>
  );
}
