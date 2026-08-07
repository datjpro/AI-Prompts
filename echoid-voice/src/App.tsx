import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4";
const POSTER_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    toggleBtnRef.current?.focus();
  };

  // Manage body class, escape key handler, and window resize listener
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 901 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.classList.remove("menu-open");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Access requested for: ${email}`);
    }
  };

  return (
    <section className="hero">
      {/* Background Media Layer */}
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      {/* Row 1: Navbar */}
      <header className="navbar">
        <a href="#" className="navbar__logo">
          ECHOID
        </a>

        <div className="navbar__cluster">
          {/* Desktop Links & CTA (hidden on <=900px) */}
          <div className="navbar__desktop navbar__links">
            <a href="#story" className="navbar__link">
              Story
            </a>
            <a href="#platforms" className="navbar__link">
              Platforms
            </a>
            <a href="#identity" className="navbar__link">
              Identity
            </a>
            <a href="#contact" className="navbar__link">
              Contact
            </a>
            <a href="#join" className="navbar__cta">
              JOIN UP
            </a>
          </div>

          {/* Mobile Hamburger Toggle (visible on <=900px) */}
          <button
            ref={toggleBtnRef}
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="navbar__toggle-bar navbar__toggle-bar--1" />
            <span className="navbar__toggle-bar navbar__toggle-bar--2" />
            <span className="navbar__toggle-bar navbar__toggle-bar--3" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobileMenu"
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <nav className="mobile-menu__nav">
          <div className="mobile-menu__item" style={{ "--i": 0 } as React.CSSProperties}>
            <a href="#story" className="mobile-menu__link" onClick={closeMenu}>
              Story
            </a>
          </div>
          <div className="mobile-menu__item" style={{ "--i": 1 } as React.CSSProperties}>
            <a href="#platforms" className="mobile-menu__link" onClick={closeMenu}>
              Platforms
            </a>
          </div>
          <div className="mobile-menu__item" style={{ "--i": 2 } as React.CSSProperties}>
            <a href="#identity" className="mobile-menu__link" onClick={closeMenu}>
              Identity
            </a>
          </div>
          <div className="mobile-menu__item" style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#contact" className="mobile-menu__link" onClick={closeMenu}>
              Contact
            </a>
          </div>
          <div className="mobile-menu__item" style={{ "--i": 4 } as React.CSSProperties}>
            <a href="#join" className="mobile-menu__cta" onClick={closeMenu}>
              JOIN UP
            </a>
          </div>
        </nav>
      </div>

      {/* Row 2: Right-aligned Signup Panel */}
      <main className="hero__body">
        <div className="panel">
          {/* 1) Chip */}
          <div className="panel__chip">[ VOICE ENTRY ]</div>

          {/* 2) H1 */}
          <h1 className="panel__h1">ECHOID</h1>

          {/* 3) Tagline */}
          <p className="panel__tagline">YOUR VOICE ID TO THE E NETWORK.</p>

          {/* 4) Form */}
          <form className="panel__form" noValidate onSubmit={handleFormSubmit}>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="panel__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <button type="submit" className="btn btn--ghost">
              Proceed using email
            </button>

            <button type="button" className="btn btn--solid" onClick={handleFormSubmit}>
              Access
            </button>
          </form>

          {/* 5) Referral link */}
          <a href="#invite" className="panel__referral">
            I'VE GOT AN INVITE KEY
          </a>
        </div>
      </main>

      {/* Row 3: Legal Footer */}
      <footer className="legal">
        <p className="legal__text">
          Opening an e.xyz account signals that you accept our{" "}
          <a href="#privacy-notice" className="legal__link">
            Privacy Notice
          </a>{" "}
          and{" "}
          <a href="#service-contract" className="legal__link">
            Service Contract
          </a>
          .
        </p>
      </footer>
    </section>
  );
}
