// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // 🧭 Track scroll position for the floating button visibility
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌬️ Smooth scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* 🧠 SEO + Social Meta Tags */}
      <Helmet>
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
          content="https://yourdomain.com/assets/preview-footer.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex M. Muli | Fullstack Engineer" />
        <meta
          name="twitter:description"
          content="Building powerful digital experiences with creativity and precision."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/assets/preview-footer.jpg"
        />
      </Helmet>

      {/* 🌌 Footer Section */}
      <footer className="footer-container" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">
            Made with 💙 by <strong>Alex M. Muli</strong> — ©{" "}
            {new Date().getFullYear()} All Rights Reserved.
          </p>

          <p className="footer-email">
            <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
            <a
              href="mailto:businessdash01@gmail.com?subject=Portfolio Inquiry&body=Hi Alex, I’d like to..."
              className="footer-link"
            >
              businessdash01@gmail.com
            </a>
          </p>

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
