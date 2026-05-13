import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { getLocalizedProjects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";
import { getProjectPreview } from "@/lib/project-previews";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const { aria, projects: content } = portfolioContent[locale];
  const localizedProjects = getLocalizedProjects(locale);

  return (
    <MotionSection
      id="projects"
      className="border-y border-white/[0.06] bg-slate-900/30 py-12 sm:py-16 lg:py-20"
      ariaLabelledby="projects-title"
    >
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          titleId="projects-title"
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {localizedProjects.map((project) => {
            const preview = getProjectPreview(project.name, project.label, locale);

            return (
              <Card
                key={project.name}
                className="group flex h-full min-h-full flex-col overflow-hidden p-0"
              >
                <ProjectPreviewFrame
                  projectName={project.name}
                  preview={preview}
                  fallbackLabel={content.fallbackPreviewLabel}
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge>{project.label}</Badge>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        {project.name}
                      </h3>
                    </div>
                    <a
                      aria-label={aria.openProject.replace("{project}", project.name)}
                      className="grid min-h-11 min-w-11 shrink-0 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-sky-300/40 hover:bg-sky-400/10 hover:text-white"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                  <p className="mt-5 text-base leading-8 text-slate-300">{project.description}</p>
                  <p className="mt-4 text-sm leading-6 text-sky-100/90">
                    {project.demonstrates}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.tech.map((tech) => (
                      <Badge key={tech} className="border-white/10 bg-white/[0.04] text-slate-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </MotionSection>
  );
}

function ProjectPreviewFrame({
  projectName,
  preview,
  fallbackLabel,
}: {
  projectName: string;
  preview: ReturnType<typeof getProjectPreview>;
  fallbackLabel: string;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-slate-950">
      {preview ? (
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes="(min-width: 1024px) 544px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.16),transparent_14rem),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,1))] p-6">
          <div className="w-full rounded-lg border border-white/10 bg-slate-950/70 p-4">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase">
              {fallbackLabel}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">{projectName}</p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset" />
    </div>
  );
}
