/**
 * ⚡ God-tier Footer Component (2025 React 19 Upgrade)
 * --------------------------------------------------------------
 * - Social media links (LinkedIn, X, GitHub)
 * - Glowing hover accents per brand color
 * - SEO + Open Graph + Twitter meta (React 19-native)
 * - Animated line + back-to-top orb retained
 * - Accessible, responsive, and production-grade
 */

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // 🧭 Show back-to-top orb on scroll
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌬️ Smooth scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* 🧠 SEO + Social Meta Tags (React 19-native) */}
      <title>Alex M. Muli | Fullstack Software Engineer</title>
      <meta
        name="description"
        content="Connect with Alex M. Muli — Fullstack Software Engineer passionate about technology, AI, and world-class design."
      />
      <meta property="og:title" content="Alex M. Muli | Fullstack Developer" />
      <meta
        property="og:description"
        content="Explore Alex’s projects, learn about his skills, and get in touch for collaborations or opportunities."
      />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#footer" />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Alex M. Muli | Fullstack Engineer" />
      <meta
        name="twitter:description"
        content="Building powerful digital experiences with creativity and precision."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />

      {/* 🌌 Footer Section */}
      <footer className="footer-container" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">
            Made with 💙 by <strong>Alex M. Muli</strong> — © {new Date().getFullYear()} All Rights Reserved.
          </p>

          {/* ✉️ Email */}
          <p className="footer-email">
            <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
            <a
              href="mailto:businessdash01@gmail.com?subject=Portfolio Inquiry&body=Hi Alex, I’d like to..."
              className="footer-link"
            >
              businessdash01@gmail.com
            </a>
          </p>

          {/* 🌐 Social Links */}
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/alex-muli-709530265"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="social-icon linkedin"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/eng_alexzack?t=A4cNkNfyUgScXH0s6NmeCw&s=08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="social-icon x"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://github.com/alex-m-muli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="social-icon github"
            >
              <FaGithub />
            </a>
          </div>

          <div className="footer-glow-line"></div>
        </div>
      </footer>

      {/* 🌠 Floating Back-to-Top Orb */}
      {showButton && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
}