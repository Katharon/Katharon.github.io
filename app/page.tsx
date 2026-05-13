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
import { getCvHref } from "@/lib/cv";

export default function Home() {
  const cvHref = getCvHref();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-950">
      <Header />
      <main className="flex-1">
        <HeroSection cvHref={cvHref} />
        <AboutSection />
        <FocusSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
