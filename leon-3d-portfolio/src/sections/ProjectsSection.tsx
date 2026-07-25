import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';

interface Project {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: Project[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate card stacking scale transform
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // Transform scale based on progress
  const cardScale = useTransform(
    progress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-24 md:top-32 h-auto min-h-[75vh] md:min-h-[85vh] flex items-center justify-center mb-12 sm:mb-16"
      style={{
        top: `${96 + index * 28}px`,
      }}
    >
      <motion.div
        style={{ scale: cardScale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-shadow duration-300"
      >
        {/* Top Row: Number, Category, Name & Live Project button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,6vw,5rem)] leading-none select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 uppercase font-light text-xs sm:text-sm tracking-widest">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom Row: 2-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 items-stretch w-full">
          {/* Left Column (40% width / 4 cols) - 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <div className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,16vw,230px)] bg-[#181818] border border-[#ffffff0f]">
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(160px,22vw,340px)] bg-[#181818] border border-[#ffffff0f]">
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60% width / 6 cols) - 1 Tall Image */}
          <div className="md:col-span-6 w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[300px] md:h-auto min-h-full bg-[#181818] border border-[#ffffff0f]">
            <img
              src={project.col2Img}
              alt={`${project.name} showcase`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-6xl mx-auto flex flex-col relative pb-20">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projectsData.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
