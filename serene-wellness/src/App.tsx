import { Hero } from './components/Hero';
import { QuoteSection } from './components/QuoteSection';

export default function App() {
  return (
    <div className="bg-[#0a0608] min-h-screen text-white select-none">
      <Hero />
      <QuoteSection />
    </div>
  );
}
