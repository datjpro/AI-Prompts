# Wandor — Travel App Landing Page

A single-page React + TypeScript landing page for an AI travel app called **"Wandor"**, featuring a full-viewport hero section with ambient looping background video, top gradient overlay, and a liquid-glass prompt card with interactive upload triggers.

## 🌟 Key Features

1. **Ambient Background Video & Top Fade Overlay**:
   - Full-viewport ambient video stream (`...769c5642.mp4`) with `autoPlay muted loop playsInline`.
   - Top 687px gradient fade (`linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)`) ensuring header text and navigation readability over the video.

2. **Typography & Wordmark**:
   - **Geist** sans-serif font for body text, headline, and controls.
   - **Special Elite** typewriter serif font for the `wandor` wordmark.

3. **Frosted Liquid Glass Prompt Card**:
   - `w-[701px]` pill-shaped card (`bg-white/[0.06]` fill, `border-[3px] border-white`, `backdrop-blur-[20px]`).
   - Pre-filled prompt: *"I'm planning a 7-day trip to Japan in October. I love food, hidden cafes, scenic hikes, and want to avoid crowds...."*.
   - File upload button with `backdrop-blur-[14px]`, triggering a hidden `<input type="file" />`.
   - Dedicated *"Plan My Trip"* CTA button inside the card with hover and click micro-interactions.

4. **Responsive Layout**:
   - Full support for mobile screens (`max-md` breakpoints): nav padding drops to `px-6 pt-5`, center links & login hide, prompt card width scales smoothly to `calc(100vw - 48px)`.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8** (with `@/` path alias)
- **Tailwind CSS v4** (`wandor` color palette)
- **Lucide React** (`Upload`)
- **Google Fonts** (Geist & Special Elite)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd wandor-travel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
