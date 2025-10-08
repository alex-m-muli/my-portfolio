// src/components/Projects/Projects.jsx
// God-tier Projects section — Expert-level portfolio showcase
// - Fully SEO optimized with meta tags for search engines and Open Graph
// - Animated, responsive project cards with tech stack badges
// - Designed for maximum visual impact and readability

import React from "react";
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
      description: "A cutting-edge AI tool that parses large codebases, identifies anti-patterns, suggests improvements, and integrates seamlessly with CI/CD pipelines.",
      image: project1Img,
      tech: ["React", "Node.js", "Python AI", "TensorFlow", "Docker"],
      link: "https://github.com/alexmuli/ai-code-analyzer"
    },
    {
      title: "Decentralized Finance Dashboard",
      description: "Full-stack DeFi platform with real-time analytics, portfolio tracking, and multi-chain support built for traders and investors seeking speed and security.",
      image: project2Img,
      tech: ["React", "Web3.js", "Solidity", "Node.js", "GraphQL"],
      link: "https://github.com/alexmuli/defi-dashboard"
    },
    {
      title: "Enterprise ChatGPT Integration",
      description: "An enterprise-grade chatbot solution integrating GPT models for customer support, automated ticketing, and analytics dashboards for insights.",
      image: project3Img,
      tech: ["React", "Node.js", "OpenAI API", "MongoDB", "AWS Lambda"],
      link: "https://github.com/alexmuli/chatgpt-enterprise"
    },
    {
      title: "Smart Home Automation Suite",
      description: "A scalable IoT platform enabling intelligent home automation with real-time device control, data analytics, and AI-driven energy optimization.",
      image: project4Img,
      tech: ["React", "Node.js", "Python", "MQTT", "Raspberry Pi"],
      link: "https://github.com/alexmuli/smart-home-suite"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <Helmet>
        <title>Projects | Alex M. Muli — Fullstack & AI Engineer</title>
        <meta name="description" content="Explore Alex M. Muli's portfolio projects: AI-powered tools, DeFi dashboards, enterprise-grade GPT integrations, and smart home automation solutions." />
        <meta name="keywords" content="Alex M. Muli, projects, portfolio, AI, Machine Learning, Fullstack, React, Node.js, Web3, ChatGPT, IoT" />
        <meta property="og:title" content="Alex M. Muli Projects" />
        <meta property="og:description" content="Showcasing cutting-edge projects by Alex M. Muli, a world-class fullstack and AI engineer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio.com/projects" />
        <meta property="og:image" content="https://your-portfolio.com/assets/images/projects-preview.png" />
      </Helmet>

      <h2 className="projects-title">Selected Projects</h2>
      <div className="projects-container">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-card">
            <a href={proj.link} target="_blank" rel="noopener noreferrer">
              <div className="project-image">
                <img src={proj.image} alt={`${proj.title} screenshot`} />
              </div>
              <div className="project-content">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="tech-stack">
                  {proj.tech.map((techItem, i) => (
                    <span key={i} className="tech-badge">{techItem}</span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
