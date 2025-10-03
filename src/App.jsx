// src/App.jsx
// Description: Main app entry point — renders Navbar, Hero, and placeholder sections.
// Notes:
// - Uses react-helmet-async instead of react-helmet (safer with SSR and strict mode).
// - Global SEO meta tags included.
// - Hero serves as Home, so duplicate "home" section is removed.

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import "./styles/global.css";
import { Helmet } from "react-helmet-async";

const App = () => {
  return (
    <>
      {/* --- Global SEO Meta Tags --- */}
      <Helmet>
        <title>Alex M. Muli — Fullstack Software Engineer | AI & ML</title>
        <meta
          name="description"
          content="Portfolio of Alex M. Muli: Fullstack Engineer specializing in React, Node.js, AI/ML, and scalable systems. Explore projects, skills, and professional experience."
        />
        <meta
          name="keywords"
          content="Fullstack Developer, AI Engineer, Machine Learning, React, Node.js, Data Analyst, Portfolio, Cloud Architect"
        />

        {/* Open Graph for social previews */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alex M. Muli — Fullstack Software Engineer" />
        <meta
          property="og:description"
          content="Building production-grade applications and AI solutions. View projects, skills, and contact for collaboration."
        />
        <meta property="og:url" content="https://your-portfolio.com/" />
        <meta property="og:image" content="https://your-portfolio.com/og-preview.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex M. Muli — Fullstack Software Engineer" />
        <meta
          name="twitter:description"
          content="Explore projects in web development, AI, and data analysis by Alex M. Muli."
        />
        <meta name="twitter:image" content="https://your-portfolio.com/og-preview.png" />
      </Helmet>

      {/* Navbar (fixed at top) */}
      <Navbar />

      {/* Hero Section — already serves as "Home" */}
      <Hero />

      {/* Main content wrapper */}
      <main>
        {/* About */}
        <section id="about" style={{ minHeight: "100vh", paddingTop: "80px" }}>
          <h2>About Section</h2>
        </section>

        {/* Skills */}
        <section id="skills" style={{ minHeight: "100vh" }}>
          <h2>Skills Section</h2>
        </section>

        {/* Projects */}
        <section id="projects" style={{ minHeight: "100vh" }}>
          <h2>Projects Section</h2>
        </section>

        {/* Experience */}
        <section id="experience" style={{ minHeight: "100vh" }}>
          <h2>Experience Section</h2>
        </section>

        {/* Contact */}
        <section id="contact" style={{ minHeight: "100vh" }}>
          <h2>Contact Section</h2>
        </section>
      </main>
    </>
  );
};

export default App;
