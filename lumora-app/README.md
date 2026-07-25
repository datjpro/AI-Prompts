# Lumora — Mindfulness & Focus App Landing Page

A fullscreen cinematic hero section for a mindfulness and focus application called **"Lumora"**, featuring a 4-video crossfade background layer, an animated PNG atmospheric overlay, liquid glass UI elements, and reactive dark-mode text transitions.

## 🌟 Key Features

1. **4-Video Stacked Crossfade Layer**:
   - 4 stacked fullscreen looping videos (`Golden Hour`, `Still Water`, `Deep Woods`, `Quiet Dawn`).
   - Opacity crossfade transition over 1000ms (`transition-opacity duration-1000 ease-in-out`).
   - 1000ms click cooldown on video switcher buttons to prevent rapid jitter.

2. **Transparent PNG Overlay**:
   - Fullscreen PNG overlay with a continuous "train-bob" animation (`translateY` oscillating `0` to `-6px` over 3s with constant `scale(1.03)`).

3. **Adaptive Dark Mode for "Deep Woods"**:
   - When the 3rd video (*Deep Woods*, index 2) is active, all hero content (badge, heading, subtext, input, video switcher labels) transitions to dark color `#182C41` over 700ms (`transition-colors duration-700`).
   - Navbar and bottom stats remain white for contrast.

4. **Navigation & Mobile Overlay**:
   - `Lumora` brand logo in Instrument Serif italic.
   - Desktop `.liquid-glass` pill with navigation links and "Get Started" button.
   - Mobile menu button with 300ms crossfade rotation transition between `Menu` and `X` icons.
   - Fullscreen mobile overlay with staggered link entrance animations (50ms increments).

5. **Liquid Glass System**:
   - Custom `.liquid-glass` backdrop-blur utility with specular gradient mask border.

6. **Bottom Stats**:
   - Row separated by `|` pipe dividers: `60+ Deep Sessions | 12,000+ Creators | 4.8 User Satisfaction | Intentional-First Design`.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (`Menu`, `X`)
- **Google Fonts** (Instrument Serif)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd lumora-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
