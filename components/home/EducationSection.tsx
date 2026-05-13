import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const educationItems = [
  {
    degree: "B.Sc. Computer Science",
    institution: "FH Wiener Neustadt",
    period: "Expected 07/2026",
    description:
      "Focus: programming, software architecture, distributed systems, databases, UX, software testing, IT security and IT operations.",
  },
  {
    degree: "M.Sc. Computer Science - Software and Security Engineering",
    institution: "FH Wiener Neustadt",
    period: "Starting 09/2026",
    description: "Admitted.",
  },
];

export function EducationSection() {
  return (
    <MotionSection className="border-y border-white/[0.06] bg-slate-900/25 py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow="Education" title="Computer science path." />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {educationItems.map((item) => (
            <Card key={item.degree} className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-sky-300/20 bg-sky-300/10">
                  <GraduationCap aria-hidden="true" className="size-5 text-sky-300" />
                </div>
                <div>
                  <p className="font-mono text-sm text-sky-200">{item.period}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.degree}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-300">{item.institution}</p>
                  <p className="mt-4 text-base leading-7 text-slate-300">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
