// src/App.jsx
// Description: Main app entry point — renders Navbar, Hero, and available sections.
// Notes:
// - Uses react-helmet-async for global SEO tags.
// - Non-existing components are commented out for now.
// - To enable a section: uncomment its import and <Section /> call.

import React from "react";
import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
// import Skills from "./components/Skills/Skills";
// import Projects from "./components/Projects/Projects";
// import Experience from "./components/Experience/Experience";
// import Testimonials from "./components/Testimonials/Testimonials";
// import Contact from "./components/Contact/Contact";
// import Footer from "./components/Footer/Footer";

import "./styles/global.css";

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
        <meta
          property="og:title"
          content="Alex M. Muli — Fullstack Software Engineer"
        />
        <meta
          property="og:description"
          content="Building production-grade applications and AI solutions. View projects, skills, and contact for collaboration."
        />
        <meta property="og:url" content="https://your-portfolio.com/" />
        <meta
          property="og:image"
          content="https://your-portfolio.com/og-preview.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Alex M. Muli — Fullstack Software Engineer"
        />
        <meta
          name="twitter:description"
          content="Explore projects in web development, AI, and data analysis by Alex M. Muli."
        />
        <meta
          name="twitter:image"
          content="https://your-portfolio.com/og-preview.png"
        />
      </Helmet>

      {/* ✅ Fixed Navbar */}
      <Navbar />

      {/* ✅ Hero Section (acts as Home) */}
      <Hero />

      {/* ✅ About Section */}
      <About />

      {/* 🚧 Future Sections (uncomment as you build) */}
      {/*
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
      */}
    </>
  );
};

export default App;
