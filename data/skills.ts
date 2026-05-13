import type { Locale } from "@/data/i18n";

export const skillGroups = [
  {
    title: {
      en: "Backend",
      de: "Backend",
    },
    skills: ["C#", ".NET", "ASP.NET Core", "EF Core", "REST APIs", "SQL"],
  },
  {
    title: {
      en: "Frontend & App",
      de: "Frontend & App",
    },
    skills: ["Blazor", "MAUI", "WPF", "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: {
      en: "Infrastructure",
      de: "Infrastruktur",
    },
    skills: ["Linux", "Docker", "Kubernetes", "Git", "Ansible fundamentals"],
  },
  {
    title: {
      en: "Architecture",
      de: "Architektur",
    },
    skills: ["Layered Architecture", "MVVM", "Clean Architecture concepts", "Worker-based execution"],
  },
];

export function getLocalizedSkillGroups(locale: Locale) {
  return skillGroups.map((group) => ({
    ...group,
    title: group.title[locale],
  }));
}
