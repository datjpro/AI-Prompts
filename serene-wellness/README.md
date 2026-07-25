# Serene — Luxury Beauty & Holistic Wellness Landing Page

A 2-section luxury beauty and holistic wellness landing page for **"Serene"**, featuring a fullscreen background video hero, glassmorphic navigation, animated mobile panel, and lerp-smoothed rAF parallax scroll animations in the Quote Section.

## 🌟 Sections & Key Features

### 1. Section 1 — Hero
- **Background Video**: Fullscreen video background (`...a54afbf6...mp4`) with `object-cover` and `bg-black/20` dark overlay.
- **Fixed Navbar**:
  - `Serene` brand mark in Dancing Script cursive.
  - Desktop nav links (*About*, *Services*, *Journal*, *Contact*).
  - Glowing white pill button ("Book a consultation").
  - Mobile hamburger toggle with animated 3-line to X transformation using `cubic-bezier(0.22,1,0.36,1)`.
  - Mobile slide-in panel (`w-[85%] max-w-[340px]`) with staggered item entrance (150ms start, 75ms delay per item).
- **Hero Typography & CTA**:
  - Heading in Instrument Serif: *"Gentle touch. Radiant presence."* with text glow effect.
  - Subtext and "Begin your renewal" glowing pill button.
- **Desktop Sound Indicator**: Bottom-left 40px circle indicator ("Experience with sound").

### 2. Section 2 — Quote Section (rAF Parallax Scroll Animations)
- **Gradient Background**: CSS gradient from `#010A17` -> `#0A4267` -> `#20658E` -> `#6BADC4`.
- **Lerp-Smoothed Parallax**:
  - `progress` calculated dynamically (`(windowHeight - rect.top) / (windowHeight + rect.height)`).
  - **Rainbow Image**: Vertical parallax Y motion from `+120px` to `-160px` with lerp factor `0.06`.
  - **Left & Right Clouds**: Horizontal entrance slide from `-200px` / `+200px` when section enters view (progress `0.12` to `0.92`) with lerp factor `0.04`, Y drift (`progress * -50`), and opacity fading.
- **Quote & Attribution**:
  - Quote in Instrument Serif: *“Serene was founded on a belief in beauty that honors your nature...”*
  - Attribution: *Dr. Mia Callahan -- Founder*.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Google Fonts** (Dancing Script, Instrument Serif, Inter)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd serene-wellness

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
