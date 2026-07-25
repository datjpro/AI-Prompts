# Leon — Fashion & Archive Landing Page

A full-screen, scroll-driven fashion archive landing page for "Leon", built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **GSAP**, **ScrollTrigger**, and **Framer Motion**.

## 🌟 Phases & Features

### Phase 1: Hero Phase (First 100vh)
- **Video Scrubbing (Desktop)**: Cursor X position scrubs between LEFT and RIGHT CloudFront videos with a 50px dead zone near center (`!video.seeking` protection against playback jitter).
- **Video Auto-Play (Mobile/Touch)**: Alternates between LEFT and RIGHT video streams on `ended` playback events.
- **Custom Cursor**: Desktop 48x48 SVG circle with a decorative Japanese glyph (`mix-blend-mode: exclusion`).
- **Overlaid UI**:
  - `Logo`: Responsive "Leon" wordmark + circled "R" mark SVG.
  - `HeaderNav`: "ABOUT", 2-line Hamburger SVG icon, and "[ CART ]".
  - `ProductInfo`: Interactive circle symbol randomizer (`['8', '$', '^^', '%', '/']` throttled to 80ms on scroll), `ARCHIVE COLLECTION "PROMPT"` label, and `$97,33` price.

### Phase 2: Gallery Phase (Black Panel)
- **Scroll-Driven Panel Slide**: Black panel slides up from `translateY(100vh)` to `translateY(0)` during the first 100vh scroll.
- **Dynamic Scattered Grid**: 10 archive gallery images arranged using a responsive column algorithm (2 cols on mobile, 3 on tablet, 4 on desktop).
- **RAF Card Scale Animation**: Scale in/out (`0` to `1`) based on card vertical position in viewport window with `right bottom` / `left bottom` transform origins.
- **Outro Animation**: White overlay fade-in, product info slide-up offset, "view" pill button scaling from `0` to `1`, and footer fade-in.

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **GSAP 3.15** + `@gsap/react`
- **Framer Motion** (`motion/react`)
- **Google Font** (Inter Tight weight 500)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd leon-archive

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
