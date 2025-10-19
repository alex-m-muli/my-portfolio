// =============================================================== 
// src/components/Skills/Skills.jsx — God-Tier Icon Enhanced (React 19 Native Metadata)
// ===============================================================
// - Dynamic icon mapping via React Icons
// - Neon hover glows per technology category
// - Maintains SEO meta tags & accessibility
// - Smooth observer-based entrance animation
// - Fully compatible with upgraded Skills.css
// ===============================================================

import React, { useEffect, useRef, memo } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaServer,
  FaCloud,
  FaLock,
  FaCubes,
} from "react-icons/fa";
import {
  SiTypescript,
  SiGraphql,
  SiKubernetes,
  SiTerraform,
  SiMongodb,
  SiOpenai,
  SiPrometheus,
} from "react-icons/si";
import "./Skills.css";

// ==================== SKILL DATA ====================
const skillsData = [
  { name: "React.js", level: "Expert", icon: <FaReact className="icon react" /> },
  { name: "TypeScript", level: "Expert", icon: <SiTypescript className="icon ts" /> },
  { name: "Node.js & APIs", level: "Expert", icon: <FaNodeJs className="icon node" /> },
  { name: "Generative AI & LLMs", level: "Advanced", icon: <SiOpenai className="icon ai" /> },
  { name: "MLOps / Model Ops", level: "Advanced", icon: <FaCubes className="icon mlops" /> },
  { name: "Cloud-native (K8s / Serverless)", level: "Advanced", icon: <FaCloud className="icon cloud" /> },
  { name: "Data Engineering & ETL", level: "Proficient", icon: <SiMongodb className="icon data" /> },
  { name: "Observability & SRE", level: "Proficient", icon: <SiPrometheus className="icon sre" /> },
  { name: "Infrastructure as Code (Terraform)", level: "Proficient", icon: <SiTerraform className="icon terraform" /> },
  { name: "GraphQL & Modern APIs", level: "Proficient", icon: <SiGraphql className="icon graphql" /> },
  { name: "DevSecOps & Secure SDLC", level: "Intermediate", icon: <FaLock className="icon devsecops" /> },
  { name: "Docker / Kubernetes", level: "Intermediate", icon: <FaDocker className="icon docker" /> },
];

// ==================== COMPONENT ====================
const Skills = () => {
  const containerRef = useRef(null);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".skill-card"));
    if (!cards.length) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      {/* ==================== React 19 Native Metadata ==================== */}
      <title>Skills — Alex M. Muli Portfolio</title>
      <meta
        name="description"
        content="Explore Alex M. Muli's 2025 full-stack and AI expertise — React, TypeScript, Node.js, Kubernetes, MLOps, and Cloud systems."
      />
      <meta
        name="keywords"
        content="React, TypeScript, Node.js, Kubernetes, Docker, MLOps, AI, Terraform, GraphQL, DevSecOps"
      />
      <meta property="og:title" content="Skills — Alex M. Muli Portfolio" />
      <meta
        property="og:description"
        content="Discover Alex M. Muli's technical mastery across AI, cloud-native, and full-stack engineering."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#skills" />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Skills — Alex M. Muli Portfolio" />
      <meta
        name="twitter:description"
        content="Discover Alex M. Muli's technical mastery across AI, cloud-native, and full-stack engineering."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />

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
              <div className="skill-icon" aria-hidden="true">
                {skill.icon}
              </div>
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
