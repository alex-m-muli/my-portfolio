// =============================================================== 
// Navbar.jsx — Final Production Build (auto-hide on scroll)
// ---------------------------------------------------------------
// - Semantic, accessible, responsive navbar
// - Animated "Menu/Close" text hamburger (keeps your class names)
// - Locks body scroll on mobile menu open
// - Auto-hides on scroll down and reappears on scroll up
// - SEO + Open Graph + Twitter meta tags (hardcoded, React 19 native head support)
// - Small performance optimizations (rAF throttling, memoized links)
// - Well-documented & production-ready
// ===============================================================

import React, { useEffect, useState, useMemo, useRef } from "react";
import "./Navbar.css";

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const threshold = 8;

    function handle() {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (isOpen) {
        setHidden(false);
        lastScrollY.current = currentY;
        ticking.current = false;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < threshold) {
      } else if (delta > 0 && currentY > 100) {
        setHidden(true);
      } else if (delta < 0) {
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
  }, [isOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow || "";
    document.body.style.overflow = isOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

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
          (React 19 auto-hoisted <title> and <meta>)
          ===================== */}
      <html lang="en" />
      <title>Alex — Fullstack Developer Portfolio</title>
      <meta
        name="description"
        content="Alex — Fullstack Software Engineer specializing in modern web and AI technologies. Explore projects, experience, and achievements."
      />
      <meta
        name="keywords"
        content="Alex, portfolio, fullstack developer, React, Node.js, AI engineer, software engineer"
      />
      <link rel="canonical" href="https://yourdomain.com/" />

      <meta property="og:title" content="Alex — Fullstack Developer Portfolio" />
      <meta
        property="og:description"
        content="Explore Alex's portfolio showcasing expertise in React, Node.js, and software development excellence."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourdomain.com/" />
      <meta property="og:image" content="https://yourdomain.com/preview.png" />
      <meta property="og:image:alt" content="Alex portfolio preview" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Alex — Fullstack Developer Portfolio" />
      <meta
        name="twitter:description"
        content="Explore Alex’s world-class portfolio in fullstack software engineering and web development."
      />
      <meta name="twitter:image" content="https://yourdomain.com/preview.png" />
      <meta name="twitter:image:alt" content="Alex portfolio preview" />

      <link rel="preload" as="image" href="https://yourdomain.com/preview.png" />

      {/* Main nav: keep original class names intact */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${mounted ? "mounted" : ""} ${
          hidden ? "hidden" : ""
        } ${isOpen ? "menu-open" : ""}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="navbar-container">
          <a href="#home" className="navbar-logo" aria-label="Go to homepage" onClick={handleLinkClick}>
            Alex<span className="accent-dot">.</span>
          </a>

          <ul id="main-navigation" className={`navbar-links ${isOpen ? "open" : ""}`} aria-label="Primary navigation">
            {navLinks.map(({ id, label, isButton }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={handleLinkClick} className={isButton ? "contact-btn" : ""}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

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
