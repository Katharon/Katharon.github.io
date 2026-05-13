import { BriefcaseBusiness } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const experienceItems = [
  {
    title: "Junior Developer",
    organization: "FOTEC",
    period: "09/2024-03/2025",
    description:
      "Part-time development of enterprise applications using .NET MAUI, ASP.NET Core, Blazor, EF Core, REST APIs, Git and Docker.",
  },
  {
    title: "Software Development Intern",
    organization: "FOTEC",
    period: "07/2024",
    description:
      "Python/Raspberry Pi prototype for camera-based quality inspection of rotating product packaging; additional GoPro API integration in an assembly-line context.",
  },
  {
    title: "Gastronomy Leadership Background",
    organization: "Professional kitchens",
    period: "2014-2023",
    description:
      "Several years of professional kitchen experience, including sous-chef and kitchen-lead responsibilities such as ordering, costing, HACCP, duty planning and operational coordination.",
  },
];

export function ExperienceSection() {
  return (
    <MotionSection
      id="experience"
      className="py-14 sm:py-16 lg:py-20"
      ariaLabelledby="experience-title"
    >
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional work shaped by delivery and operations."
          titleId="experience-title"
        />
        <div className="mt-9 grid gap-4">
          {experienceItems.map((item) => (
            <Card key={`${item.title}-${item.period}`} className="p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <div className="grid size-11 place-items-center rounded-lg border border-sky-300/20 bg-sky-300/10">
                  <BriefcaseBusiness aria-hidden="true" className="size-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title} <span className="text-slate-500">-</span>{" "}
                    <span className="text-slate-200">{item.organization}</span>
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
                </div>
                <p className="font-mono text-sm text-sky-200">{item.period}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
