// ===============================================================
// src/components/Projects/Projects.jsx — Dual Image Flip (In-View Controlled)
// ===============================================================
// ✨ Features:
// - Two alternating images per project (crossfade loop)
// - Animations pause when off-screen (for performance)
// - Randomized cycle durations for natural rhythm
// - IntersectionObserver handles both fade-in & animation control
// - Fully responsive, accessible, and SEO-optimized
// ===============================================================

import React, { useEffect, useRef, memo } from "react";
import "./Projects.css";

// Updated image imports (two per project)
import project0Img from "../../assets/images/project0.png";
import project1Img from "../../assets/images/project1.png";
import project2Img from "../../assets/images/project2.png";
import project3Img from "../../assets/images/project3.png";
import project4Img from "../../assets/images/project4.png";
import project5Img from "../../assets/images/project5.png";
import project6Img from "../../assets/images/project6.png";
import project7Img from "../../assets/images/project7.png";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Code Analyzer",
      description:
        "A cutting-edge AI tool that parses large codebases, identifies anti-patterns, suggests improvements, and integrates seamlessly with CI/CD pipelines.",
      images: [project0Img, project1Img],
      tech: ["React", "Node.js", "Python AI", "TensorFlow", "Docker"],
      link: "https://github.com/alexmuli/ai-code-analyzer",
    },
    {
      title: "Decentralized Finance Dashboard",
      description:
        "Full-stack DeFi platform with real-time analytics, portfolio tracking, and multi-chain support built for traders and investors seeking speed and security.",
      images: [project2Img, project3Img],
      tech: ["React", "Web3.js", "Solidity", "Node.js", "GraphQL"],
      link: "https://github.com/alexmuli/defi-dashboard",
    },
    {
      title: "AI-Powered Supply Chain Optimizer",
      description:
        "An advanced AI-driven platform for real-time supply chain monitoring, predictive forecasting, inventory optimization, and risk assessment, integrating with ERP systems for seamless business operations.",
      images: [project4Img, project5Img],
      tech: ["React", "Node.js", "Chart.js", "OpenAI API", "MongoDB", "AWS Lambda"],
      link: "https://github.com/alexmuli/chatgpt-enterprise",
    },
    {
      title: "Smart Home Automation Suite",
      description:
        "A scalable IoT platform enabling intelligent home automation with real-time device control, data analytics, and AI-driven energy optimization.",
      images: [project6Img, project7Img],
      tech: ["React", "Node.js", "Python", "MQTT", "Raspberry Pi"],
      link: "https://github.com/alexmuli/smart-home-suite",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".project-card"));
    const thumbs = document.querySelectorAll(".project-thumb");

    // ✅ Mark images as loaded when ready for fade-in
    thumbs.forEach((img) => {
      if (img.complete) img.classList.add("loaded");
      else img.addEventListener("load", () => img.classList.add("loaded"));
    });

    // Respect reduced-motion preference
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      cards.forEach((c) => c.classList.add("visible"));
      return;
    }

    // =============================
    // IntersectionObserver Setup
    // =============================
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const imgWrapper = card.querySelector(".project-image");

          if (entry.isIntersecting) {
            // Fade in project card
            card.classList.add("visible");

            // Randomize animation duration between 8–14s for organic flow
            const randomDuration = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
            imgWrapper.style.setProperty("--cycle-duration", `${randomDuration}s`);

            // Start animation only when visible
            imgWrapper.classList.add("in-view");
          } else {
            // Pause animation when off-screen
            imgWrapper.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card, idx) => {
      card.style.animationDelay = `${idx * 100}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      {/* ✅ React 19 Native Metadata */}
      <title>Projects | Alex M. Muli — Fullstack & AI Engineer</title>
      <meta
        name="description"
        content="Explore Alex M. Muli's portfolio projects: AI-powered tools, DeFi dashboards, enterprise-grade GPT integrations, and smart home automation solutions."
      />
      <meta
        name="keywords"
        content="Alex M. Muli, projects, portfolio, AI, Machine Learning, Fullstack, React, Node.js, Web3, ChatGPT, IoT"
      />
      <meta property="og:title" content="Alex M. Muli Projects" />
      <meta
        property="og:description"
        content="Showcasing cutting-edge projects by Alex M. Muli, a world-class fullstack and AI engineer."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#projects" />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects | Alex M. Muli" />
      <meta
        name="twitter:description"
        content="Selected projects by Alex M. Muli — fullstack, AI and cloud engineering."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />

      <h2 id="projects-title" className="projects-title">
        Selected Projects
      </h2>

      <div
        ref={containerRef}
        className="projects-container"
        role="list"
        aria-label="Selected projects"
      >
        {projects.map((proj) => (
          <article
            key={proj.title}
            className="project-card"
            role="listitem"
            tabIndex={0}
            aria-label={`${proj.title} — opens project link`}
          >
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${proj.title} — open in new tab`}
            >
              <div className="project-image auto-cycle" aria-hidden="true">
                {proj.images.map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    alt={`${proj.title} screenshot ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width="1600"
                    height="900"
                    className={`project-thumb fade ${i === 0 ? "active" : ""}`}
                  />
                ))}
              </div>

              <div className="project-content">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="tech-stack">
                  {proj.tech.map((techItem, i) => (
                    <span key={i} className="tech-badge">
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(Projects);