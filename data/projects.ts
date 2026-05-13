import type { Locale } from "@/data/i18n";

export const projects = [
  {
    name: "NodeControl",
    label: {
      en: "Platform Engineering",
      de: "Plattform-Engineering",
    },
    description: {
      en: "Portfolio project exploring self-hosted infrastructure automation with customer-scoped workflows, managed hosts, inventories, playbooks and worker-based execution.",
      de: "Portfolio-Projekt zur Erkundung selbst gehosteter Infrastrukturautomatisierung mit kundenbezogenen Workflows, verwalteten Hosts, Inventories, Playbooks und Worker-basierter Ausführung.",
    },
    demonstrates: {
      en: "Shows infrastructure workflow modeling and worker-based execution concepts.",
      de: "Zeigt Modellierung von Infrastruktur-Workflows und Konzepte für Worker-basierte Ausführung.",
    },
    tech: ["ASP.NET Core", "EF Core", "PostgreSQL", "Next.js", "Docker", "OIDC"],
    href: "https://github.com/Katharon/NodeControl",
  },
  {
    name: "WeatherMesh",
    label: {
      en: "Distributed Systems",
      de: "Verteilte Systeme",
    },
    description: {
      en: "Study project for connecting distributed weather stations, collecting sensor data through ASP.NET Core APIs and visualizing measurements in Blazor.",
      de: "Studienprojekt zur Verbindung verteilter Wetterstationen, Erfassung von Sensordaten über ASP.NET Core APIs und Visualisierung von Messwerten in Blazor.",
    },
    demonstrates: {
      en: "Shows distributed data collection, API design and measurement visualization.",
      de: "Zeigt verteilte Datenerfassung, API-Design und Visualisierung von Messwerten.",
    },
    tech: ["C#", "ASP.NET Core", "Blazor", "REST APIs", "Geocoding"],
    href: "https://github.com/Katharon/WeatherMesh",
  },
  {
    name: "CodeForge",
    label: {
      en: "Software Architecture",
      de: "Softwarearchitektur",
    },
    description: {
      en: "WPF/C# editor prototype focused on layered architecture, syntax highlighting and plugin-contract based extensibility.",
      de: "WPF/C#-Editor-Prototyp mit Fokus auf Schichtenarchitektur, Syntax-Highlighting und Erweiterbarkeit über Plugin-Contracts.",
    },
    demonstrates: {
      en: "Shows layered desktop architecture and extensibility through plugin contracts.",
      de: "Zeigt geschichtete Desktop-Architektur und Erweiterbarkeit über Plugin-Contracts.",
    },
    tech: ["C#", ".NET 10", "WPF", "XAML", "StyleCop", "Plugin Contracts"],
    href: "https://github.com/Katharon/CodeForge",
  },
  {
    name: "ChatTool",
    label: {
      en: "Security",
      de: "Security",
    },
    description: {
      en: "WPF/.NET study project exploring encrypted desktop messaging, authentication and persistence as a learning exercise.",
      de: "WPF/.NET-Studienprojekt, das verschlüsselte Desktop-Messaging, Authentifizierung und Persistenz als Lernprojekt erkundet.",
    },
    demonstrates: {
      en: "Study project exploring authentication, persistence and encrypted messaging basics.",
      de: "Studienprojekt zur Erkundung von Authentifizierung, Persistenz und Grundlagen verschlüsselter Nachrichten.",
    },
    tech: ["WPF", "MVVM", "ASP.NET Core Identity", "EF Core", "RSA-OAEP"],
    href: "https://github.com/Katharon/ChatTool",
  },
];

export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    label: project.label[locale],
    description: project.description[locale],
    demonstrates: project.demonstrates[locale],
  }));
}
