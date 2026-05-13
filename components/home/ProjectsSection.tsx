import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const demonstrates: Record<string, string> = {
  NodeControl: "Demonstrates infrastructure workflow modeling and worker-based execution.",
  WeatherMesh: "Demonstrates distributed data collection, APIs and visualization concepts.",
  CodeForge:
    "Demonstrates layered desktop architecture and extensibility through plugin contracts.",
  ChatTool: "Demonstrates authentication, persistence and encrypted messaging foundations.",
};

export function ProjectsSection() {
  return (
    <MotionSection id="projects" className="py-16 sm:py-20" ariaLabelledby="projects-title">
      <Container>
        <SectionHeading
          eyebrow="Selected Projects"
          title="Portfolio and study projects with a systems angle."
          description="Four projects that show backend, desktop, distributed-systems and security-oriented work without claiming production readiness."
          titleId="projects-title"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.name} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge>{project.label}</Badge>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    {project.name}
                  </h3>
                </div>
                <a
                  aria-label={`Open ${project.name} on GitHub`}
                  className="rounded-md border border-white/10 p-2 text-slate-300 transition hover:border-sky-300/40 hover:bg-sky-400/10 hover:text-white"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-300">{project.description}</p>
              <p className="mt-4 text-sm leading-6 text-sky-100/90">{demonstrates[project.name]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} className="border-white/10 bg-white/[0.04] text-slate-200">
                    {tech}
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
