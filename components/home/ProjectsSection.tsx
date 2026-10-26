import Image from "next/image";
import { ArrowUpRight, CloudSun, Code2 } from "lucide-react";
import { getLocalizedProjects } from "@/data/projects";
import { portfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";
import { getProjectPreview } from "@/lib/project-previews";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const { aria, projects: content } = portfolioContent[locale];
  return (
    <section
      id="projects"
      tabIndex={-1}
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          titleId="projects-title"
        />
        <div className="project-list">
          {getLocalizedProjects(locale).map((project) => {
            const preview = getProjectPreview(project.name, project.label, locale);
            const projectLabel = aria.openProject.replace("{project}", project.name);
            return (
              <article
                className="project-row"
                key={project.name}
                aria-labelledby={"project-" + project.name}
              >
                <a
                  className="project-media"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={projectLabel}
                >
                  {preview ? (
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      width={1200}
                      height={675}
                      sizes="(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
                      className="project-screenshot"
                    />
                  ) : (
                    <div className="project-fallback">
                      {project.name === "WeatherMesh" ? (
                        <CloudSun className="fallback-mark" aria-hidden="true" />
                      ) : (
                        <Code2 className="fallback-mark" aria-hidden="true" />
                      )}
                      <p className="project-fallback-label">{content.fallbackPreviewLabel}</p>
                      <p className="project-fallback-name">{project.name}</p>
                      <p className="project-fallback-tech">{project.tech.join(" / ")}</p>
                      {project.name === "WeatherMesh" ? (
                        <div className="fallback-grid" aria-hidden="true">
                          {Array.from({ length: 7 }, (_, i) => (
                            <span key={i} />
                          ))}
                        </div>
                      ) : (
                        <div className="code-specimen" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      )}
                    </div>
                  )}
                </a>
                <div className="project-copy">
                  <p className="eyebrow">{project.label}</p>
                  <h3 id={"project-" + project.name}>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="project-demonstrates">{project.demonstrates}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <a
                    className="text-link project-link"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={projectLabel}
                  >
                    GitHub
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
