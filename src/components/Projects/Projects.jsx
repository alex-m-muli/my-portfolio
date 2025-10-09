// ===============================================================
// src/components/Projects/Projects.jsx — Final Production Build
// ===============================================================
// - Preserves all original class names (no breaking changes)
// - Subtle visual polish, accessibility, performance tweaks
// - Images lazily loaded + decoding hints
// - IntersectionObserver drives reveal animation (respects reduced-motion)
// - Color tokens harmonized with site but intentionally tuned for this section
// - SEO + Open Graph meta tags kept hardcoded (exact content preserved)
// ===============================================================

import React, { useEffect, useRef, memo } from "react";
import { Helmet } from "react-helmet-async";
import "./Projects.css";
import project1Img from "../../assets/images/project1.png";
import project2Img from "../../assets/images/project2.png";
import project3Img from "../../assets/images/project3.png";
import project4Img from "../../assets/images/project4.png";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Code Analyzer",
      description:
        "A cutting-edge AI tool that parses large codebases, identifies anti-patterns, suggests improvements, and integrates seamlessly with CI/CD pipelines.",
      image: project1Img,
      tech: ["React", "Node.js", "Python AI", "TensorFlow", "Docker"],
      link: "https://github.com/alexmuli/ai-code-analyzer",
    },
    {
      title: "Decentralized Finance Dashboard",
      description:
        "Full-stack DeFi platform with real-time analytics, portfolio tracking, and multi-chain support built for traders and investors seeking speed and security.",
      image: project2Img,
      tech: ["React", "Web3.js", "Solidity", "Node.js", "GraphQL"],
      link: "https://github.com/alexmuli/defi-dashboard",
    },
    {
      title: "Enterprise ChatGPT Integration",
      description:
        "An enterprise-grade chatbot solution integrating GPT models for customer support, automated ticketing, and analytics dashboards for insights.",
      image: project3Img,
      tech: ["React", "Node.js", "OpenAI API", "MongoDB", "AWS Lambda"],
      link: "https://github.com/alexmuli/chatgpt-enterprise",
    },
    {
      title: "Smart Home Automation Suite",
      description:
        "A scalable IoT platform enabling intelligent home automation with real-time device control, data analytics, and AI-driven energy optimization.",
      image: project4Img,
      tech: ["React", "Node.js", "Python", "MQTT", "Raspberry Pi"],
      link: "https://github.com/alexmuli/smart-home-suite",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".project-card"));
    if (!cards.length) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      cards.forEach((c) => c.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // reveal once for perf
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    cards.forEach((card, idx) => {
      // stagger slightly via inline CSS delay or CSS nth-child
      card.style.animationDelay = `${idx * 80}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <Helmet>
        <title>Projects | Alex M. Muli — Fullstack & AI Engineer</title>
        <meta name="description" content="Explore Alex M. Muli's portfolio projects: AI-powered tools, DeFi dashboards, enterprise-grade GPT integrations, and smart home automation solutions." />
        <meta name="keywords" content="Alex M. Muli, projects, portfolio, AI, Machine Learning, Fullstack, React, Node.js, Web3, ChatGPT, IoT" />
        <meta property="og:title" content="Alex M. Muli Projects" />
        <meta property="og:description" content="Showcasing cutting-edge projects by Alex M. Muli, a world-class fullstack and AI engineer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio.com/projects" />
        <meta property="og:image" content="https://your-portfolio.com/assets/images/projects-preview.png" />
        {/* Optional Twitter tags retained for better social previews */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Alex M. Muli" />
        <meta name="twitter:description" content="Selected projects by Alex M. Muli — fullstack, AI and cloud engineering." />
        <meta name="twitter:image" content="https://your-portfolio.com/assets/images/projects-preview.png" />
      </Helmet>

      <h2 id="projects-title" className="projects-title">Selected Projects</h2>

      <div ref={containerRef} className="projects-container" role="list" aria-label="Selected projects">
        {projects.map((proj) => (
          <article key={proj.title} className="project-card" role="listitem" tabIndex={0} aria-label={`${proj.title} — opens project link`}>
            <a href={proj.link} target="_blank" rel="noopener noreferrer" aria-label={`${proj.title} — open in new tab`}>
              <div className="project-image" aria-hidden="true">
                <img src={proj.image} alt={`${proj.title} screenshot`} loading="lazy" decoding="async" />
              </div>

              <div className="project-content">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>

                <div className="tech-stack" aria-hidden="false">
                  {proj.tech.map((techItem, i) => (
                    <span key={i} className="tech-badge" aria-hidden="true">{techItem}</span>
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