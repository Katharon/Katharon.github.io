import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const paragraphs = [
  "I am a computer science student at FH Wiener Neustadt with practical experience in C#/.NET full-stack development. During my work at FOTEC, I built enterprise applications with .NET MAUI, ASP.NET Core, Blazor, EF Core and REST APIs.",
  "My current focus is shifting toward Linux, Docker, Kubernetes, distributed systems and platform engineering. My bachelor thesis explored the migration of a Docker Compose based multi-server architecture into a Kubernetes environment with a focus on recovery, reproducibility and maintainability.",
  "Before studying computer science, I worked for several years as a chef and kitchen lead. This background shaped how I approach responsibility, structure, operational thinking and practical problem solving.",
];

const highlights = [
  "Practical .NET application development",
  "Infrastructure-oriented engineering focus",
  "Operational leadership background",
];

export function AboutSection() {
  return (
    <MotionSection id="about" className="py-16 sm:py-20" ariaLabelledby="about-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="About"
            title="Practical software work, with an infrastructure mindset."
            titleId="about-title"
          />
          <Card>
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
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
