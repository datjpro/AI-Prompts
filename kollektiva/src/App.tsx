import { useState } from 'react';
import { Hero } from '@/components/Hero';

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main>
      <Hero activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </main>
  );
}

export default App;
