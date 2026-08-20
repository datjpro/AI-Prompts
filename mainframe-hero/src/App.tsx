import React from 'react';
import { VideoBackground } from './components/VideoBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden select-none bg-black text-black">
      {/* Fixed mouse-scrubbed background video */}
      <VideoBackground />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Content with Typewriter & Action Pills */}
      <Hero />
    </div>
  );
};

export default App;
