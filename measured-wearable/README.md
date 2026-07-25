# Measured — Health & Wellness Wearable Landing Page

A single-page fullscreen hero landing page for **"Measured"**, a health and wellness wearable device, featuring a cursor-following spotlight video reveal effect, 5-layer z-index composition, and frosted-glass liquid navigation.

## 🌟 Architecture & Key Mechanics

### 1. Layered Composition (z-index ordering)
- **Layer 1 (z-0, opacity 0.1)**: Repeating SVG grid pattern (48px cells with `#64748b` stroke) with cursor parallax lerp shifting.
- **Layer 2 (z-10)**: Fullscreen background image (`BG_IMAGE_1`) showing the wearable device on a wrist.
- **Layer 3 (z-20)**: Huge uppercase serif title `"MEASURED"` rendered in **Instrument Serif** (`text-[4.5rem]` to `text-[16rem]`).
- **Layer 4 (z-25)**: Semi-transparent atmospheric overlay image (`OVERLAY_IMAGE`).
- **Layer 5 (z-30)**: Cursor-following spotlight video reveal (`FRONT_VIDEO`) with lerp position smoothing (`0.1` factor) and bottom 60% viewport clipping (`clipPath: 'inset(40% 0 0 0)'`).

### 2. Navigation & Mobile Menu
- **Logo (top-left)**: Interlocking geometric SVG mark (viewBox 0 0 256 256).
- **Desktop Center Pill (z-50)**: Frosted `.liquid-glass` pill with links (*Device*, *Real Stories*, *Science*, *Plans*, *Reach Us*).
- **Desktop CTA (top-right)**: `.liquid-glass` pill button with pulsing green indicator dot (*Reserve Yours*).
- **Mobile Menu (z-55)**: Fullscreen `#0a0a0a` panel with staggered link slide-up animations (60ms step delay) and spinning close button.

### 3. Liquid Glass System
- Custom `.liquid-glass` backdrop-blur utility with specular gradient mask border.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Google Fonts** (Instrument Serif, Inter)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd measured-wearable

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
