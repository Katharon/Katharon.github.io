import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EducationSection } from "@/components/home/EducationSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FocusSection } from "@/components/home/FocusSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import type { Locale } from "@/data/i18n";
import { getCvHref } from "@/lib/cv";
import "./sections.css";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const cvHref = getCvHref();

  return (
    <div className="site-shell">
      <Header locale={locale} />
      <main id="main-content" tabIndex={-1} className="home-main">
        <HeroSection locale={locale} cvHref={cvHref} />
        <ProjectsSection locale={locale} />
        <AboutSection locale={locale} />
        <FocusSection locale={locale} />
        <ExperienceSection locale={locale} />
        <EducationSection locale={locale} />
        <TechStackSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
