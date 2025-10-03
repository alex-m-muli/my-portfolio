// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isDark, setIsDark] = useState(false); // For dark/light mode
  const [scrolled, setScrolled] = useState(false); // Shadow effect on scroll

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute(
      "data-theme",
      !isDark ? "dark" : "light"
    );
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo">
          Dexx<span>.</span>
        </a>

        {/* Desktop Links */}
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact" className="contact-btn">Contact</a></li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          {/* Mobile Hamburger */}
          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            role="button"
            tabIndex={0}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
