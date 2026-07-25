# TinyTrails — Full-Screen Animated 404 Error Page

A full-screen, responsive, animated 404 error page for "TinyTrails", a children's brand built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lucide React icons**.

## 🌟 Features

- **Dynamic Background "404" & Oval Effect**:
  - Measures text `offsetHeight` on mount and resize to calculate dynamic Y-scaling (`scale(1.15, ${scaleY * 1.4})`).
  - Oval background shape scaled vertically with `scaleY`.
  - Gradient bottom mask fading to transparent (`mask-image: linear-gradient(...)`).
- **Responsive Navigation Bar**:
  - 2x2 grid white dot logo + "TinyTrails" text mark.
  - Pill navigation buttons for desktop.
  - Mobile menu toggle button.
- **Mobile Menu Overlay**:
  - Fullscreen slide-over panel (`#FF6B1A` to `#FF9642` gradient).
  - 500ms backdrop blur transition with body scroll locking (`overflow: hidden`).
  - Staggered entry animation per menu item (`150 + i * 60`ms).
  - Bottom CTA link returning to home.
- **Center Video & Bottom CTA**:
  - Shifted upward with `margin-top: calc(-6vh - 40px)` and dark blend mode.
  - Clean CTA pill button with Lucide `ArrowLeft` icon.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (`Menu`, `X`, `ArrowLeft`)
- **Google Fonts** (Inter weights 400–900)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd tinytrails-404

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
