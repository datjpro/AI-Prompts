import { useState } from "react";
import { CircleUserRound, Menu, X } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4";

const AVATAR_URLS = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
  "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100",
];

const NAV_LINKS = ["Home", "Our Approach", "Healing Methods"] as const;

/* ──────────── Logo SVG ──────────── */
function Logo() {
  return (
    <svg
      className="h-8 w-8 md:h-9 md:w-9"
      viewBox="0 0 256 256"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
    </svg>
  );
}

/* ──────────── Dot‑Triangle Icon ──────────── */
function DotTriangleIcon() {
  /* 9 dots arranged in a triangular pattern inside a 20×20 box */
  const dots = [
    /* row 0 — 1 dot */ [9],
    /* row 1 — 2 dots */ [5, 13],
    /* row 2 — 3 dots */ [1, 9, 17],
    /* row 3 — 3 dots (optional wider) */ [1, 9, 17],
  ];
  return (
    <div className="relative h-5 w-5 mb-2">
      {dots.map((row, ri) =>
        row.map((cx, ci) => (
          <span
            key={`${ri}-${ci}`}
            className="absolute bg-white/60"
            style={{
              width: 2.5,
              height: 2.5,
              borderRadius: 0,
              left: cx,
              top: ri * 5 + 1,
            }}
          />
        ))
      )}
    </div>
  );
}

/* ──────────── Checker Grid Icon ──────────── */
function CheckerGridIcon() {
  const pattern = [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ];
  return (
    <div className="grid grid-cols-3 gap-[2px] mb-2">
      {pattern.flat().map((on, i) => (
        <span
          key={i}
          className={`h-1 w-1 rounded-sm ${on ? "bg-white/60" : "bg-white/0"}`}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════
   APP
   ════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* ── Background Video ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Dark overlay for readability ── */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ═══════ NAVIGATION ═══════ */}
      <nav className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20">
        {/* Left — Logo */}
        <Logo />

        {/* Center — Desktop nav pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-opacity duration-200 ${
                link === "Home"
                  ? "text-white"
                  : "text-white/70 hover:opacity-100"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — Desktop avatar */}
        <div className="hidden md:flex liquid-glass h-10 w-10 rounded-full items-center justify-center">
          <CircleUserRound className="h-5 w-5 text-white/80" strokeWidth={1.5} />
        </div>

        {/* Right — Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center z-50"
          aria-label="Toggle menu"
        >
          <span className="relative h-5 w-5">
            <Menu
              className={`absolute inset-0 h-5 w-5 text-white transition-all duration-300 ${
                menuOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              strokeWidth={1.5}
            />
            <X
              className={`absolute inset-0 h-5 w-5 text-white transition-all duration-300 ${
                menuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
              strokeWidth={1.5}
            />
          </span>
        </button>
      </nav>

      {/* ═══════ MOBILE MENU OVERLAY ═══════ */}
      <div
        className={`fixed inset-0 z-10 md:hidden flex flex-col items-center justify-center gap-8 bg-black/80 backdrop-blur-xl transition-all duration-500 ease-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col items-center gap-8 transition-transform duration-500 ease-out ${
            menuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-white transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </a>
          ))}

          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
              <CircleUserRound
                className="h-6 w-6 text-white/80"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-sm font-light text-white/60">Account</span>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main
        className={`relative z-10 flex flex-col justify-between px-5 sm:px-8 md:px-16 lg:px-20 pb-8 sm:pb-10 md:pb-14 transition-opacity duration-500 ${
          menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ height: "calc(100vh - 76px)" }}
      >
        {/* ── Top block ── */}
        <div className="mt-14 sm:mt-20 md:mt-28 max-w-2xl">
          {/* Badge */}
          <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6">
            <div className="flex -space-x-2">
              {AVATAR_URLS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-light text-white/80">
              our path to natural wellness
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-white"
            style={{ letterSpacing: "-0.05em" }}
          >
            Heal Your Body
            <br />
            Naturally
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-light text-white/70">
            Holistic wellness. Transformative results.
          </p>

          {/* CTA */}
          <button className="liquid-glass rounded-full px-6 py-3 sm:px-7 sm:py-3.5 mt-6 sm:mt-8 text-sm font-medium text-white transition duration-300 hover:bg-white/10 cursor-pointer">
            Begin Your Journey
          </button>
        </div>

        {/* ── Bottom Stats ── */}
        <div className="flex items-end gap-6 sm:gap-10 md:gap-16">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <DotTriangleIcon />
            <span className="text-xl sm:text-2xl md:text-3xl font-normal text-white">
              48 Hours
            </span>
            <span className="text-xs sm:text-sm font-light text-white/60">
              Initial Consultation
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col">
            <CheckerGridIcon />
            <span className="text-xl sm:text-2xl md:text-3xl font-normal text-white">
              Initial Consultation
            </span>
            <span className="text-xs sm:text-sm font-light text-white/60">
              Healing Sessions
            </span>
          </div>
        </div>
      </main>
    </section>
  );
}
