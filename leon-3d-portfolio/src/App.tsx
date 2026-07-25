import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { FooterSection } from './sections/FooterSection';

export function App() {
  return (
    <main className="w-full bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* FOOTER / CONTACT SECTION */}
      <FooterSection />
    </main>
  );
}

export default App;
