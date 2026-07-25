# Prisma — Creative Studio Landing Page

A dark, moody, cinematic 3-section landing page for a creative studio named **"Prisma"**, featuring fluid Framer Motion animations, custom SVG fractal noise overlays, and a warm cream color palette (`#E1E0CC` / `#DEDBC8`).

## 🌟 Sections & Features

### 1. Hero Section
- **Media**: Full-screen inset video container with custom `.noise-overlay` fractal noise filter and vertical gradient overlay.
- **Navbar**: Top-centered hanging black pill with 5 navigation links ("Our story", "Collective", "Workshops", "Programs", "Inquiries").
- **Giant Title & CTA**: "Prisma" heading with `WordsPullUp` staggered word-by-word animation and a superscript asterisk (`*`) on the final "a", accompanied by a description paragraph and a "Join the lab" CTA button with hover scale effects.

### 2. About Section
- **Inner Card**: `#101010` dark container with a "Visual arts" tag.
- **Multi-Styled Heading**: `WordsPullUpMultiStyle` combining Almarai sans-serif with *Instrument Serif italic*.
- **Progressive Text Reveal**: Scroll-linked character opacity reveal (`0.2` to `1.0` opacity) driven by `useScroll` and custom `AnimatedLetter` component.

### 3. Features Section
- **Noise Background**: Subtle `.bg-noise` fractal noise overlay.
- **4-Column Grid**: Responsive cards scaling from 1-column on mobile to 4-columns on desktop (`lg:h-[480px]`).
- **Interactive Cards**:
  - Video canvas card.
  - Project Storyboard (01) with checklist & -45° rotated arrow link.
  - Smart Critiques (02) with AI analysis features.
  - Immersion Capsule (03) with soundscapes & focus features.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React** (`ArrowRight`, `Check`)
- **Google Fonts** (Almarai 300–800 & Instrument Serif Italic)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd prisma-studio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
