// src/components/Skills/Skills.jsx
// God-tier Skills section
// - Fully responsive, interactive, and visually impactful
// - Animated skill cards with gradient accents
// - Structured for SEO + Open Graph previews
// - Mobile-first, modern UX/UI with subtle micro-animations

import React from "react";
import { Helmet } from "react-helmet-async";
import "./Skills.css";

const skillsData = [
  { name: "React.js", level: "Expert" },
  { name: "Node.js", level: "Expert" },
  { name: "JavaScript / TypeScript", level: "Expert" },
  { name: "Python", level: "Advanced" },
  { name: "Machine Learning & AI", level: "Advanced" },
  { name: "Data Analysis & Visualization", level: "Advanced" },
  { name: "MongoDB / SQL", level: "Proficient" },
  { name: "Cloud & Scalable Systems", level: "Proficient" },
  { name: "Docker / Kubernetes", level: "Intermediate" },
  { name: "CI/CD & DevOps", level: "Intermediate" },
];

const Skills = () => {
  return (
    <>
      {/* SEO + Open Graph Meta Tags */}
      <Helmet>
        <title>Skills — Alex M. Muli Portfolio</title>
        <meta
          name="description"
          content="Explore Alex M. Muli's top technical skills including React, Node.js, AI/ML, Python, data analysis, cloud technologies, and DevOps best practices."
        />
        <meta name="keywords" content="React, Node.js, JavaScript, TypeScript, AI, Machine Learning, Python, Data Analysis, Cloud, DevOps, Docker, Kubernetes, Portfolio" />
        <meta property="og:title" content="Skills — Alex M. Muli Portfolio" />
        <meta
          property="og:description"
          content="Discover Alex M. Muli's expertise in fullstack development, AI/ML, data analysis, and cloud technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio.com/#skills" />
        <meta property="og:image" content="https://your-portfolio.com/skills-preview.png" />
      </Helmet>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2 className="skills-title">Technical Expertise & Tools</h2>
        <p className="skills-intro">
          I specialize in building scalable, production-grade applications, AI & ML solutions, and advanced data analysis pipelines using modern technologies.
        </p>

        <div className="skills-container">
          {skillsData.map((skill, index) => (
            <div className="skill-card" key={index} style={{ animationDelay: `${index * 100}ms` }}>
              <h4 className="skill-name">{skill.name}</h4>
              <p className="skill-level">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
