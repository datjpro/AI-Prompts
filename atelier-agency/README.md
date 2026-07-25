# Atelier — UX & App Design Agency Landing Page

A fullscreen hero landing page for **"Atelier"**, a premium design agency specializing in UX and App design for bold ventures. Features background video streaming, mobile animated hamburger menu overlay, and Instrument Serif typography.

## 🌟 Key Features

1. **Background Video Layer**:
   - Fullscreen looping background video (`...f607742e...mp4`) with `object-cover` positioned behind content.

2. **Navigation & Mobile Menu**:
   - Logo `Atelier` in Inter sans-serif typography.
   - Desktop navigation links (*Projects*, *Expertise*, *Studio*, *Insights*) & CTA buttons (*Reach Out*, *Let's Talk*).
   - Mobile 3-line hamburger button with 500ms `cubic-bezier(0.76, 0, 0.24, 1)` smooth transformation into an `X`.
   - Fullscreen `bg-black/90 backdrop-blur-xl` mobile overlay with staggered link entrance animations (150ms start, +80ms step delay) and hover text shift (`hover:pl-4`).

3. **Hero Content**:
   - Heading in **Instrument Serif**:
     ```
     UX and APP
     DESIGN for BOLD
     VENTURES
     ```
     with italicized *"and"* and *"for"*.
   - Subtext description & dual CTAs (*See Cases* with animated `ArrowRight` icon and *Watch Reel* with `Play` icon).

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (`ArrowRight`, `Play`, `X`)
- **Google Fonts** (Instrument Serif, Inter)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd atelier-agency

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
