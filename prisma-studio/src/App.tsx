import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesSection } from './components/FeaturesSection';

export default function App() {
  return (
    <main className="bg-black min-h-screen text-[#E1E0CC] selection:bg-primary selection:text-black">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </main>
  );
}
