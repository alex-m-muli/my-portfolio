// ===============================================================
// src/components/Skills/Skills.jsx — Polished Production Upgrade
// ===============================================================
// - Retains all original class names for backward compatibility
// - Upgrades visual harmony with subtle gradients, layered depth
// - Slight 3D hover response + refined glow and color contrast
// - SEO meta kept intact (hardcoded)
// - Animations softened and visually balanced
// ===============================================================

import React, { useEffect, useRef, memo } from "react";
import { Helmet } from "react-helmet-async";
import "./Skills.css";

const skillsData = [
  { name: "React.js", level: "Expert" },
  { name: "TypeScript", level: "Expert" },
  { name: "Node.js & APIs", level: "Expert" },
  { name: "Generative AI & LLMs", level: "Advanced" },
  { name: "MLOps / Model Ops", level: "Advanced" },
  { name: "Cloud-native (K8s / Serverless)", level: "Advanced" },
  { name: "Data Engineering & ETL", level: "Proficient" },
  { name: "Observability & SRE", level: "Proficient" },
  { name: "Infrastructure as Code (Terraform)", level: "Proficient" },
  { name: "GraphQL & Modern APIs", level: "Proficient" },
  { name: "DevSecOps & Secure SDLC", level: "Intermediate" },
  { name: "Docker / Kubernetes", level: "Intermediate" },
];

const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".skill-card"));
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
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Skills — Alex M. Muli Portfolio</title>
        <meta
          name="description"
          content="Explore Alex M. Muli's 2025 technical stack mastery: React, TypeScript, Node.js, AI, Cloud-native systems, and DevOps excellence."
        />
        <meta
          name="keywords"
          content="React, TypeScript, Node.js, AI, MLOps, Kubernetes, Docker, Terraform, GraphQL, DevSecOps, Observability, Portfolio"
        />
        <meta property="og:title" content="Skills — Alex M. Muli Portfolio" />
        <meta
          property="og:description"
          content="Discover Alex M. Muli's expertise in fullstack, AI/ML, and high-performance systems engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio.com/#skills" />
        <meta property="og:image" content="https://your-portfolio.com/skills-preview.png" />
      </Helmet>

      <section id="skills" className="skills-section" aria-labelledby="skills-title">
        <h2 id="skills-title" className="skills-title">
          Technical Expertise & Tools
        </h2>
        <p className="skills-intro">
          Building production-grade, intelligent, and scalable systems through
          modern frameworks, automation, and AI-driven architectures.
        </p>

        <div ref={containerRef} className="skills-container" role="list" aria-label="Technical skills list">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card"
              role="listitem"
              tabIndex={0}
              aria-label={`${skill.name} — ${skill.level}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="skill-icon" aria-hidden="true"></div>
              <h4 className="skill-name">{skill.name}</h4>
              <p className="skill-level">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default memo(Skills);