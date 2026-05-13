import { Code2, Layers, Network, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent, type FocusIconKey } from "@/data/content";
import type { Locale } from "@/data/i18n";

const focusIcons: Record<FocusIconKey, LucideIcon> = {
  code: Code2,
  server: Server,
  network: Network,
  layers: Layers,
  shield: ShieldCheck,
};

type FocusSectionProps = {
  locale: Locale;
};

export function FocusSection({ locale }: FocusSectionProps) {
  const { focus } = portfolioContent[locale];

  return (
    <MotionSection className="py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={focus.eyebrow}
          title={focus.title}
          description={focus.description}
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {focus.areas.map((area) => {
            const Icon = focusIcons[area.icon];

            return (
              <Card key={area.title} className="p-5">
                <Icon aria-hidden="true" className="size-6 text-[var(--site-accent)]" />
                <h3 className="mt-4 text-base font-semibold text-[var(--site-heading)] sm:mt-5">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--site-muted)]">
                  {area.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </MotionSection>
  );
}
