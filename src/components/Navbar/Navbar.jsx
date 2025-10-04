// src/components/Navbar/Navbar.jsx
// God-tier Navbar component
// - Semantic, accessible navigation
// - Responsive mobile menu with animated hamburger + dynamic "Menu/Close" label
// - Auto-closes when a link is clicked
// - Locks page scroll while mobile menu is open
// - SEO & Open Graph meta tags via react-helmet-async
// - Clean, documented, production-ready

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu open state
  const [scrolled, setScrolled] = useState(false); // navbar scrolled state

  // Add / remove scroll shadow based on Y offset
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (prevents background scrolling)
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow || "";
      };
    }
    // no-op cleanup when closed
    return undefined;
  }, [isOpen]);

  // Close menu on link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* SEO + Open Graph meta tags for nav-level pages */}
      <Helmet>
        <title>Dexx — Portfolio</title>
        <meta
          name="description"
          content="Dexx — Fullstack Software Engineer. Explore projects, skills, and professional experience."
        />
        <meta name="keywords" content="Dexx, portfolio, fullstack, react, node, projects" />
        <meta property="og:title" content="Dexx — Portfolio" />
        <meta property="og:description" content="A showcase of Dexx's expertise in software engineering and modern web development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/preview.png" />
      </Helmet>

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="navbar-container">
          {/* Branding */}
          <a href="#home" className="navbar-logo" aria-label="Go to homepage">
            Dexx<span className="accent-dot">.</span>
          </a>

          {/* Navigation links (desktop + mobile panel) */}
          <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
            <li>
              <a href="#about" onClick={handleLinkClick}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={handleLinkClick}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={handleLinkClick}>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={handleLinkClick}>
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" className="contact-btn" onClick={handleLinkClick}>
                Contact
              </a>
            </li>
          </ul>

          {/* Right-side actions: hamburger (mobile). No theme toggle included (removed). */}
          <div className="navbar-actions" aria-hidden={false}>
            {/* Hamburger button: accessible, shows dynamic label */}
            <button
            className="hamburger"
            onClick={() => setIsOpen((s) => !s)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="main-navigation"
>
            {/* Dynamic text label visible on mobile */}
            <span className="hamburger-label">{isOpen ? "Close" : "Menu"}</span>
            </button>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
