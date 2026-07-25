# Aether — Cinematic Space-Travel Landing Page

A two-section cinematic space-travel landing page featuring custom JavaScript-driven video crossfading, a shared liquid-glass design system, and word-by-word blur-in text animations.

## 🌟 Sections & Key Mechanics

### 1. Liquid-Glass System & Crossfade Video Engine
- **.liquid-glass & .liquid-glass-strong**: Backdrop blur utilities (4px and 50px) with specular linear gradient mask borders.
- **FadingVideo Engine**: Custom `requestAnimationFrame` video opacity crossfade (`FADE_MS = 500`, `FADE_OUT_LEAD = 0.55s`) without CSS transitions, handling `loadeddata`, `timeupdate`, and `ended` events smoothly.

### 2. Section 1 — Hero Section
- **Background Video**: 120% scale, top-aligned looping space video.
- **Navbar**: 48x48 liquid-glass logo circle with italic `"a"`, center pill with 5 links + "Claim a Spot" CTA button.
- **Hero Content**:
  - "New" badge ("Maiden Crewed Voyage to Mars Arrives 2026").
  - `BlurText` word-by-word blur-in animation for headline *"Venture Past Our Sky Across the Universe"*.
  - Subheading & dual CTAs ("Start Your Voyage" / "View Liftoff").
  - 2 Stats cards ("34.5 Min" / "2.8B+") with clock and globe outline SVG icons.
- **Partners Footer**: Chip + aerospace partner logo list (`Aeon · Vela · Apex · Orbit · Zeno`).

### 3. Section 2 — Capabilities Section
- **Background Video**: Full-bleed looping video.
- **Header**: `// Capabilities` kicker + *"Production evolved"* title.
- **3 Feature Cards**: AI Scenery, Batch Production, and Smart Lighting cards with nested 44x44 liquid-glass Material icon squares, 4 pill tags per card, title, and body text.

## 🛠️ Tech Stack

- **React 18** + **ReactDOM 18**
- **Vite 5**
- **Tailwind CSS**
- **Framer Motion 11**
- **Babel Standalone** (CDN & Vite support)
- **Google Fonts** (Instrument Serif & Barlow)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd space-travel-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
