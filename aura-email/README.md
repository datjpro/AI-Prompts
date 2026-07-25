# Aura — AI-Native Email Client Landing Page

A premium, AI-native email client landing page built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion (`motion/react`)**, and **Lucide React**.

## 🌟 Sections & Features

1. **Global Background & Noise Filters**:
   - Fixed full-screen video background (`...c4750c0e...mp4`).
   - Fixed vertical 36rem container guide lines (`left-1/2 -translate-x-[calc(50%+36rem)]`).
   - SVG `#c3-noise` fractal noise filters for metallic text gradients and watermark backdrops.

2. **Shared Primitives**:
   - `LogoMark`: Abstract 4-quadrant curve SVG mark.
   - `AppleLogo`: Vector Apple trademark path.
   - `AppleButton`: White pill button with Apple mark, label, and animated ChevronRight hover indicator.
   - `SectionEyebrow`: Bullet indicator + section title + tag badge.

3. **Section 1 — Navbar**:
   - Fades and slides down on entry.
   - `LogoMark` logo, desktop navigation links (*Solutions*, *Pricing*, *Blog*, *Documentation*, *Careers*), `<AppleButton />`, and mobile menu trigger.

4. **Section 2 — Hero**:
   - Shiny gradient headline: *"Your email. Revitalized"* with `.animate-shiny` 200% background position loop and noise filter.
   - Subtext description & `<AppleButton />` with platform release indicator (*Download for Intel / Apple Silicon*).

5. **Section 3 — macOS Menu Bar Strip**:
   - Full-width `h-10` backdrop blur strip with Apple logo, application menu items (*File*, *Edit*, *View*, *Go*, *Window*, *Help*), search icon, and live date/time.

6. **Section 4 — Inbox Mockup**:
   - Real-world 3-column macOS email interface:
     - Sidebar with "Compose with Aura" button, folder list with counts, and label tags.
     - Message list with unread indicators and active email highlighting.
     - Reader panel with toolbar, AI summary card (*Summary by Aura*), message body, and PDF attachment.

7. **Section 5 — FeatureTriage**:
   - Two-column section highlighting AI-native inbox triage.
   - Interactive breakdown of triaged sub-cards (*Priority*, *Follow-up*, *Updates*, *Archived*).

8. **Section 6 & 7 — LogoCloud & Testimonials**:
   - Logo Cloud featuring top teams (*Linear*, *Vercel*, *Figma*, *Stripe*, *Ramp*, *Notion*, *Loom*, *Arc*).
   - 3 liquid-glass testimonial quotes from leaders at Mercury, Cohere, and Lunar.

9. **Section 8 — Pricing**:
   - Watermark background with `c3-noise` filter.
   - 3 Plans (*Free*, *Standard*, *Pro*) with checkmark list items and interactive yearly billing toggle.

10. **Section 9 — FinalCTA & Footer**:
    - Liquid-glass container with radial glow overlay.
    - CTA headline *"Close the tabs. Open your day."* with sales and download buttons.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`brand: #3D81E3`)
- **motion/react** (Framer Motion v12+)
- **Lucide React**
- **Google Fonts** (Inter weights 400–900)

## 🚀 Getting Started

```bash
# Navigate to project directory
cd aura-email

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
