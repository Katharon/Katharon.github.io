import { Code2, Layers, Network, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
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
    <section
      id="focus"
      className="section section--muted portfolio-focus"
      aria-labelledby="focus-title"
    >
      <Container>
        <SectionHeading
          eyebrow={focus.eyebrow}
          title={focus.title}
          description={focus.description}
          titleId="focus-title"
        />
        <div className="focus-grid">
          {focus.areas.map((area) => {
            const Icon = focusIcons[area.icon];

            return (
              <article key={area.title} className="focus-area">
                <Icon aria-hidden="true" className="focus-icon" strokeWidth={1.5} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
