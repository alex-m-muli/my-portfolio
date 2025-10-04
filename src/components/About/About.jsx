// src/components/About/About.jsx
// Description: "About Me" section of the portfolio. Highlights professional expertise, 
// in-demand 2025 skills, and career stats. Fully SEO optimized with structured meta tags.
// Features: Avatar, SEO meta, semantic headings, professional description, and stat highlights.

import React from "react";
import { Helmet } from "react-helmet-async";
import "./About.css";
import avatar from "../../assets/avatar.png";

const About = () => {
  return (
    <section id="about" className="about-section">
      {/* --- SEO Structured Meta Tags for About Section --- */}
      <Helmet>
        <title>About | Alex M. Muli — Fullstack Software Engineer & AI/ML Expert</title>
        <meta
          name="description"
          content="Learn about Alex M. Muli, a Fullstack Software Engineer with expertise in React, Node.js, AI/ML, Cloud Computing, DevOps, Data Analysis, and cybersecurity best practices."
        />
        <meta
          name="keywords"
          content="Alex M. Muli, Fullstack Software Engineer, AI/ML Specialist, Cloud Computing, DevOps, Cybersecurity, React, Node.js, Portfolio, 2025 Skills"
        />

        {/* Open Graph for social sharing */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Alex M. Muli — Fullstack Engineer & AI/ML Specialist" />
        <meta
          property="og:description"
          content="Discover Alex M. Muli’s journey as a Fullstack Software Engineer with deep expertise in AI/ML, Cloud, DevOps, API development, cybersecurity, and scalable systems."
        />
        <meta property="og:image" content="https://your-portfolio.com/avatar.png" />
        <meta property="og:url" content="https://your-portfolio.com/about" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Alex M. Muli — Fullstack Engineer & AI/ML Specialist" />
        <meta
          name="twitter:description"
          content="Explore the profile of Alex M. Muli, a versatile software engineer and AI/ML expert delivering scalable apps and data-driven solutions."
        />
        <meta name="twitter:image" content="https://your-portfolio.com/avatar.png" />
      </Helmet>

      {/* --- Section Header --- */}
      <h2 className="about-title">About Me</h2>

      <div className="about-container">
        {/* Profile Image */}
        <div className="about-avatar">
          <img
            src={avatar}
            alt="Alex M. Muli - Fullstack Software Engineer and AI/ML Specialist"
          />
        </div>

        {/* About Content */}
        <div className="about-content">
          <h3 className="about-heading">
            Fullstack Engineer | AI/ML Specialist | Cloud & DevOps Professional
          </h3>
          <p className="about-description">
            I’m <strong>Alex M. Muli</strong>, a results-driven{" "}
            <em>Fullstack Software Engineer</em> with deep expertise in{" "}
            <em>Artificial Intelligence</em>, <em>Machine Learning</em>, and{" "}
            <em>Data Analysis</em>.  
            Over the past years, I’ve successfully designed, developed, and
            deployed high-performance solutions across{" "}
            <strong>web applications</strong>, <strong>cloud platforms</strong>,{" "}
            and <strong>enterprise-grade systems</strong>.
            <br /> <br />
            My skillset extends beyond engineering into critical{" "}
            <strong>2025 in-demand areas</strong> such as{" "}
            <em>Cloud Computing (AWS, Azure, GCP)</em>,{" "}
            <em>DevOps & CI/CD pipelines</em>,{" "}
            <em>API development & integration</em>,{" "}
            <em>Cybersecurity best practices</em>,{" "}
            <em>UI/UX optimization</em>, and{" "}
            <em>Agile team collaboration</em>.  
            This unique blend makes me not just an engineer but a{" "}
            <strong>versatile problem solver</strong> who thrives in
            fast-changing tech landscapes.
          </p>

          {/* --- Professional Stats Highlights --- */}
          <div className="about-stats">
            <div className="stat-card">
              <h4>5+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <h4>20+</h4>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-card">
              <h4>AI/ML</h4>
              <p>Deep Expertise</p>
            </div>
            <div className="stat-card">
              <h4>Cloud</h4>
              <p>Scalable Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
