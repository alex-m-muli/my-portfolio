// ===============================================================
// Navbar.jsx — Final Production Build (auto-hide on scroll)
// ---------------------------------------------------------------
// - Semantic, accessible, responsive navbar
// - Animated "Menu/Close" text hamburger (keeps your class names)
// - Locks body scroll on mobile menu open
// - Auto-hides on scroll down and reappears on scroll up
// - SEO + Open Graph + Twitter meta tags (hardcoded via react-helmet-async)
// - Small performance optimizations (rAF throttling, memoized links)
// - Well-documented & production-ready
// ===============================================================

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./Navbar.css";

const Navbar = React.memo(() => {
  // Mobile menu open
  const [isOpen, setIsOpen] = useState(false);
  // Whether the page is scrolled a bit (used for scrolled styles)
  const [scrolled, setScrolled] = useState(false);
  // Subtle mount animation class
  const [mounted, setMounted] = useState(false);
  // Auto-hide state: true when navbar should hide (scrolling down)
  const [hidden, setHidden] = useState(false);

  // Keep last Y in a ref so we can compare without triggering renders
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  // Flag to ensure requestAnimationFrame throttling
  const ticking = useRef(false);

  // Small mount animation (improves perceived polish)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Scroll handler using rAF for smoothness and to avoid layout thrashing
  useEffect(() => {
    const threshold = 8; // minimal delta to count as meaningful scroll

    function handle() {
      const currentY = window.scrollY;

      // set 'scrolled' flag for shadow/background at a fixed offset
      setScrolled(currentY > 50);

      // If mobile menu is open, keep navbar visible
      if (isOpen) {
        setHidden(false);
        lastScrollY.current = currentY;
        ticking.current = false;
        return;
      }

      const delta = currentY - lastScrollY.current;

      // Ignore very small movements
      if (Math.abs(delta) < threshold) {
        // keep previous state
      } else if (delta > 0 && currentY > 100) {
        // scrolling down and past 100px -> hide
        setHidden(true);
      } else if (delta < 0) {
        // scrolling up -> show
        setHidden(false);
      }

      lastScrollY.current = Math.max(0, currentY);
      ticking.current = false;
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(handle);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]); // re-register when menu open state changes

  // Lock body scroll when mobile menu open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow || "";
    document.body.style.overflow = isOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close on Escape key for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Ensure menu closes on resize (desktop breakpoint)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  // Memoize nav links to avoid re-renders
  const navLinks = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact", isButton: true },
    ],
    []
  );

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* =====================
          Hardcoded SEO + Social
          (kept intentionally inside Navbar as requested)
          ===================== */}
      <Helmet>
        <html lang="en" />
        <title>Dexx — Fullstack Developer Portfolio</title>
        <meta
          name="description"
          content="Dexx — Fullstack Software Engineer specializing in modern web and AI technologies. Explore projects, experience, and achievements."
        />
        <meta
          name="keywords"
          content="Dexx, portfolio, fullstack developer, React, Node.js, AI engineer, software engineer"
        />
        <link rel="canonical" href="https://yourdomain.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Dexx — Fullstack Developer Portfolio" />
        <meta
          property="og:description"
          content="Explore Dexx's portfolio showcasing expertise in React, Node.js, and software development excellence."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/preview.png" />
        <meta property="og:image:alt" content="Dexx portfolio preview" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dexx — Fullstack Developer Portfolio" />
        <meta
          name="twitter:description"
          content="Explore Dexx’s world-class portfolio in fullstack software engineering and web development."
        />
        <meta name="twitter:image" content="https://yourdomain.com/preview.png" />
        <meta name="twitter:image:alt" content="Dexx portfolio preview" />

        {/* preload hint for OG preview image (low priority) */}
        <link rel="preload" as="image" href="https://yourdomain.com/preview.png" />
      </Helmet>

      {/* Main nav: keep original class names intact */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${mounted ? "mounted" : ""} ${
          hidden ? "hidden" : ""
        } ${isOpen ? "menu-open" : ""}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="navbar-container">
          {/* Logo */}
          <a href="#home" className="navbar-logo" aria-label="Go to homepage" onClick={handleLinkClick}>
            Dexx<span className="accent-dot">.</span>
          </a>

          {/* Links */}
          <ul id="main-navigation" className={`navbar-links ${isOpen ? "open" : ""}`} aria-label="Primary navigation">
            {navLinks.map(({ id, label, isButton }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={handleLinkClick} className={isButton ? "contact-btn" : ""}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen((s) => !s)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="main-navigation"
          >
            <span className="hamburger-label">{isOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>
    </>
  );
});

export default Navbar;