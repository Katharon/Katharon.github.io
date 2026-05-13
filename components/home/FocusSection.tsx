import { Code2, Layers, Network, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const focusAreas: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "C#/.NET Engineering",
    description:
      "Full-stack application work with ASP.NET Core, Blazor, MAUI, EF Core and REST APIs.",
    icon: Code2,
  },
  {
    title: "Linux & Containers",
    description:
      "Growing focus on Linux environments, Docker workflows and Kubernetes-based deployment models.",
    icon: Server,
  },
  {
    title: "Distributed Systems",
    description:
      "Interest in recovery, reproducibility, service boundaries and multi-node system behavior.",
    icon: Network,
  },
  {
    title: "Software Architecture",
    description:
      "Layered designs, maintainable boundaries and pragmatic structure for evolving applications.",
    icon: Layers,
  },
  {
    title: "Security Foundations",
    description:
      "Study-level security work around authentication, encrypted messaging and secure defaults.",
    icon: ShieldCheck,
  },
];

export function FocusSection() {
  return (
    <MotionSection className="py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Focus Areas"
          title="Where I am building depth."
          description="A focused mix of application engineering, infrastructure fundamentals and system design."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {focusAreas.map((area) => (
            <Card key={area.title} className="p-5">
              <area.icon aria-hidden="true" className="size-6 text-sky-300" />
              <h3 className="mt-5 text-base font-semibold text-white">{area.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{area.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
