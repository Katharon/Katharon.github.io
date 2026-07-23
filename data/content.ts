import type { Locale } from "@/data/i18n";

export type FocusIconKey = "code" | "server" | "network" | "layers" | "shield";

export const metadataContent: Record<
  Locale,
  {
    title: string;
    description: string;
    openGraphLocale: string;
    alternateOpenGraphLocale: string;
    socialImageAlt: string;
  }
> = {
  en: {
    title: "Lukas Stumpfel | C#/.NET, Linux & Kubernetes",
    description:
      "Computer science graduate focused on C#/.NET, Linux, Kubernetes, distributed systems and software architecture.",
    openGraphLocale: "en_US",
    alternateOpenGraphLocale: "de_DE",
    socialImageAlt:
      "Lukas Stumpfel portfolio preview for C#/.NET, Linux, Kubernetes and distributed systems.",
  },
  de: {
    title: "Lukas Stumpfel | C#/.NET, Linux & Kubernetes",
    description:
      "Informatikabsolvent mit Fokus auf C#/.NET, Linux, Kubernetes, verteilte Systeme und Softwarearchitektur.",
    openGraphLocale: "de_DE",
    alternateOpenGraphLocale: "en_US",
    socialImageAlt:
      "Lukas Stumpfel Portfolio-Vorschau für C#/.NET, Linux, Kubernetes und verteilte Systeme.",
  },
};

export const portfolioContent = {
  en: {
    header: {
      navigation: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Stack", href: "#stack" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      badge: "Junior software engineer portfolio",
      intro:
        "I build practical software projects and study how reliable backend systems, infrastructure automation and maintainable architecture fit together.",
      buttons: {
        projects: "View Projects",
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
        cv: "Download CV",
      },
      details: [
        { label: "Based in", valueKey: "location" },
        { label: "Education", value: "B.Sc. Computer Science, FH Wiener Neustadt" },
        { label: "Background", value: "Operations background from kitchen leadership" },
      ],
      profileFile: "current-profile.md",
      currentFocusTitle: "Current focus",
      signalItems: [
        "C#/.NET application development",
        "Linux, Docker and Kubernetes fundamentals",
        "Distributed systems and architecture thinking",
      ],
      thesisLabel: "Bachelor thesis",
      thesisText:
        "Migration of a Docker Compose based multi-server architecture to a Kubernetes cluster, with a focus on recovery, reproducibility and maintainability.",
    },
    about: {
      eyebrow: "About",
      title: "Software engineering with a practical systems mindset.",
      paragraphs: [
        "I am a computer science graduate at FH Wiener Neustadt with practical C#/.NET full-stack experience. At FOTEC, I worked on business applications using .NET MAUI, ASP.NET Core, Blazor, EF Core and REST APIs.",
        "My current focus is moving deeper into Linux, Docker, Kubernetes, distributed systems and platform engineering. My bachelor thesis examines the migration of a Docker Compose based multi-server architecture into Kubernetes, with emphasis on recovery, reproducibility and maintainability.",
        "Before studying computer science, I worked for several years as a chef and kitchen lead. That background still shapes how I approach responsibility, structured work, operational thinking and practical problem solving.",
      ],
      highlights: [
        "Hands-on .NET application work",
        "Linux and Kubernetes direction",
        "Practical operational background",
      ],
    },
    focus: {
      eyebrow: "Focus Areas",
      title: "Where I am building depth.",
      description:
        "A focused mix of .NET application engineering, infrastructure fundamentals and system design.",
      areas: [
        {
          title: "C#/.NET Engineering",
          description:
            "Application development with ASP.NET Core, Blazor, MAUI, EF Core and REST APIs.",
          icon: "code",
        },
        {
          title: "Linux & Containers",
          description:
            "Hands-on learning around Linux environments, Docker workflows and Kubernetes deployment models.",
          icon: "server",
        },
        {
          title: "Distributed Systems",
          description:
            "Focus on service boundaries, recovery, reproducibility and multi-node system behavior.",
          icon: "network",
        },
        {
          title: "Software Architecture",
          description:
            "Layered designs, maintainable boundaries and pragmatic structure for applications that evolve.",
          icon: "layers",
        },
        {
          title: "Security Foundations",
          description:
            "Study-level work around authentication, encrypted messaging and secure implementation habits.",
          icon: "shield",
        },
      ],
    },
    projects: {
      eyebrow: "Selected Projects",
      title: "Portfolio and study projects with a systems angle.",
      description:
        "Selected work across backend, desktop, distributed-systems and security-oriented topics, framed as prototypes and study projects.",
      fallbackPreviewLabel: "Project preview",
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional work shaped by systems and operations.",
      items: [
        {
          title: "Junior Developer",
          organization: "FOTEC",
          period: "10/2024-03/2025",
          description:
            "Part-time development of business applications using .NET MAUI, ASP.NET Core, Blazor, EF Core, REST APIs and Git.",
        },
        {
          title: "Software Development Intern",
          organization: "FOTEC",
          period: "08/2024",
          description:
            "Built a Python/Raspberry Pi prototype for camera-based quality inspection of rotating product packaging, plus GoPro API integration in an assembly-line context.",
        },
        {
          title: "Gastronomy Leadership Background",
          organization: "Professional kitchens",
          period: "2014-2023",
          description:
            "Professional kitchen experience with sous-chef and kitchen-lead responsibilities, including ordering, costing, HACCP, duty planning and operational coordination.",
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Computer science foundation.",
      items: [
        {
          degree: "B.Sc. Computer Science",
          institution: "FH Wiener Neustadt",
          period: "Graduated 07/2026",
          description:
            "Completed successfully with a strong overall result. Coursework and project work across programming, software architecture, distributed systems, databases, UX, software testing, IT security and IT operations.",
        },
        {
          degree: "M.Sc. Computer Science - Software and Security Engineering",
          institution: "FH Wiener Neustadt",
          period: "Starting 09/2026",
          description: "Admitted, with planned focus on software and security engineering.",
        },
      ],
    },
    techStack: {
      eyebrow: "Tech Stack",
      title: "Tools and concepts I use in projects.",
      description:
        "A practical stack centered on .NET development, application UI, infrastructure basics and architecture patterns.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to junior software engineering opportunities.",
      description: "Best reached through email, GitHub or LinkedIn. Based in Burgenland, Austria.",
      button: "Email Lukas",
      links: {
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Location",
      },
    },
    footer: {
      built: "Built as a static portfolio.",
    },
    aria: {
      home: "Lukas Stumpfel home",
      primaryNav: "Primary navigation",
      mobilePrimaryNav: "Mobile primary navigation",
      languageNav: "Language selection",
      themeNav: "Theme selection",
      openGithub: "Open Lukas Stumpfel on GitHub",
      openLinkedin: "Open Lukas Stumpfel on LinkedIn",
      emailProfile: "Email Lukas Stumpfel",
      openProject: "Open {project} on GitHub",
      contactValue: "{label}: {value}",
    },
  },
  de: {
    header: {
      navigation: [
        { label: "Über mich", href: "#about" },
        { label: "Projekte", href: "#projects" },
        { label: "Erfahrung", href: "#experience" },
        { label: "Stack", href: "#stack" },
        { label: "Kontakt", href: "#contact" },
      ],
    },
    hero: {
      badge: "Junior Software Engineer Portfolio",
      intro:
        "Ich baue praxisnahe Softwareprojekte und beschäftige mich damit, wie zuverlässige Backend-Systeme, Infrastrukturautomatisierung und wartbare Softwarearchitektur zusammenpassen.",
      buttons: {
        projects: "Projekte ansehen",
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "E-Mail",
        cv: "Lebenslauf",
      },
      details: [
        { label: "Standort", valueKey: "location" },
        { label: "Ausbildung", value: "B.Sc. Informatik, FH Wiener Neustadt" },
        { label: "Hintergrund", value: "Operativer Hintergrund aus Küchenleitung" },
      ],
      profileFile: "aktuelles-profil.md",
      currentFocusTitle: "Aktueller Fokus",
      signalItems: [
        "C#/.NET-Anwendungsentwicklung",
        "Grundlagen in Linux, Docker und Kubernetes",
        "Verteilte Systeme und Architekturdenken",
      ],
      thesisLabel: "Bachelorarbeit",
      thesisText:
        "Migration einer Docker-Compose-basierten Multiserver-Architektur in einen Kubernetes-Cluster mit Fokus auf Recovery, Reproduzierbarkeit und Wartbarkeit.",
    },
    about: {
      eyebrow: "Über mich",
      title: "Softwareentwicklung mit praktischem Systemverständnis.",
      paragraphs: [
        "Ich habe meinen Bachelor in Informatik an der FH Wiener Neustadt mit gutem Erfolg abgeschlossen und habe praktische C#/.NET-Full-Stack-Erfahrung. Bei FOTEC habe ich an Business-Anwendungen mit .NET MAUI, ASP.NET Core, Blazor, EF Core und REST APIs gearbeitet.",
        "Mein aktueller Fokus liegt stärker auf Linux, Docker, Kubernetes, verteilten Systemen und Plattform-Engineering. Meine Bachelorarbeit untersucht die Migration einer Docker-Compose-basierten Multi-Server-Architektur nach Kubernetes, mit Fokus auf Recovery, Reproduzierbarkeit und Wartbarkeit.",
        "Vor dem Informatikstudium habe ich mehrere Jahre als Koch und Küchenleiter gearbeitet. Dieser Hintergrund prägt weiterhin meinen Umgang mit Verantwortung, strukturierter Arbeit, operativem Denken und praktischer Problemlösung.",
      ],
      highlights: [
        "Praxisnahe .NET-Anwendungsarbeit",
        "Ausrichtung auf Linux und Kubernetes",
        "Praktischer operativer Hintergrund",
      ],
    },
    focus: {
      eyebrow: "Schwerpunkte",
      title: "Bereiche, in denen ich Tiefe aufbaue.",
      description:
        "Eine fokussierte Mischung aus .NET-Anwendungsentwicklung, Infrastrukturgrundlagen und Systemdesign.",
      areas: [
        {
          title: "C#/.NET Engineering",
          description:
            "Anwendungsentwicklung mit ASP.NET Core, Blazor, MAUI, EF Core und REST APIs.",
          icon: "code",
        },
        {
          title: "Linux & Container",
          description:
            "Praxisnahes Lernen rund um Linux-Umgebungen, Docker-Workflows und Kubernetes-Deployment-Modelle.",
          icon: "server",
        },
        {
          title: "Verteilte Systeme",
          description:
            "Fokus auf Service-Grenzen, Recovery, Reproduzierbarkeit und Verhalten von Multi-Node-Systemen.",
          icon: "network",
        },
        {
          title: "Softwarearchitektur",
          description:
            "Schichtenarchitektur, wartbare Grenzen und pragmatische Struktur für Anwendungen, die sich weiterentwickeln.",
          icon: "layers",
        },
        {
          title: "Security-Grundlagen",
          description:
            "Studiennahe Arbeit zu Authentifizierung, verschlüsseltem Messaging und sicheren Implementierungsgewohnheiten.",
          icon: "shield",
        },
      ],
    },
    projects: {
      eyebrow: "Ausgewählte Projekte",
      title: "Portfolio- und Studienprojekte mit Systembezug.",
      description:
        "Ausgewählte Arbeiten zu Backend, Desktop, verteilten Systemen und Security-nahen Themen, eingeordnet als Prototypen und Studienprojekte.",
      fallbackPreviewLabel: "Projektvorschau",
    },
    experience: {
      eyebrow: "Erfahrung",
      title: "Berufliche Arbeit geprägt von Systemen und Betrieb.",
      items: [
        {
          title: "Junior Developer",
          organization: "FOTEC",
          period: "10/2024-03/2025",
          description:
            "Teilzeitentwicklung von Business-Anwendungen mit .NET MAUI, ASP.NET Core, Blazor, EF Core, REST APIs und Git.",
        },
        {
          title: "Software Development Intern",
          organization: "FOTEC",
          period: "08/2024",
          description:
            "Python/Raspberry-Pi-Prototyp für kamerabasierte Qualitätsprüfung rotierender Produktverpackungen sowie GoPro-API-Integration im Fließbandkontext.",
        },
        {
          title: "Operativer Gastronomie-Hintergrund",
          organization: "Professionelle Küchen",
          period: "2014-2023",
          description:
            "Berufserfahrung in Küchen mit Sous-Chef- und Küchenleitungsaufgaben, inklusive Bestellung, Kalkulation, HACCP, Dienstplanung und operativer Koordination.",
        },
      ],
    },
    education: {
      eyebrow: "Ausbildung",
      title: "Informatik-Fundament.",
      items: [
        {
          degree: "B.Sc. Informatik",
          institution: "FH Wiener Neustadt",
          period: "Abgeschlossen 07/2026",
          description:
            "Mit gutem Erfolg abgeschlossen. Lehrveranstaltungen und Projektarbeit in Programmierung, Softwarearchitektur, verteilten Systemen, Datenbanken, UX, Softwaretesting, IT-Security und IT-Betrieb.",
        },
        {
          degree: "M.Sc. Informatik - Software and Security Engineering",
          institution: "FH Wiener Neustadt",
          period: "Start 09/2026",
          description: "Zugelassen, mit geplantem Fokus auf Software and Security Engineering.",
        },
      ],
    },
    techStack: {
      eyebrow: "Tech Stack",
      title: "Tools und Konzepte, die ich in Projekten nutze.",
      description:
        "Ein praktischer Stack rund um .NET-Entwicklung, Anwendungs-UIs, Infrastrukturgrundlagen und Architekturpatterns.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Offen für Junior-Software-Engineering-Möglichkeiten.",
      description:
        "Am besten erreichbar per E-Mail, GitHub oder LinkedIn. Standort: Burgenland, Österreich.",
      button: "E-Mail an Lukas",
      links: {
        email: "E-Mail",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Standort",
      },
    },
    footer: {
      built: "Gebaut als statisches Portfolio.",
    },
    aria: {
      home: "Startseite von Lukas Stumpfel",
      primaryNav: "Hauptnavigation",
      mobilePrimaryNav: "Mobile Hauptnavigation",
      languageNav: "Sprachauswahl",
      themeNav: "Theme-Auswahl",
      openGithub: "Lukas Stumpfel auf GitHub öffnen",
      openLinkedin: "Lukas Stumpfel auf LinkedIn öffnen",
      emailProfile: "E-Mail an Lukas Stumpfel",
      openProject: "{project} auf GitHub öffnen",
      contactValue: "{label}: {value}",
    },
  },
} as const;

export type PortfolioContent = (typeof portfolioContent)[Locale];
