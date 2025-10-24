// src/App.jsx
// Description: Main app entry point — renders Navbar, Hero, and all sections.
// Notes:
// - Migrated from react-helmet-async to React 19 native metadata.
// - All SEO + Open Graph tags preserved with verified canonical URLs.
// - Ensure `public/og-preview.png` and `public/favicon.ico` exist before deployment.

import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import "./styles/global.css";

const App = () => {
  return (
    <>
      {/* 🌐 Global SEO + Open Graph Meta Tags (React 19 native) */}
      <title>Alex M. Muli | Fullstack Software Engineer & AI/ML Specialist</title>

      <meta
        name="description"
        content="Portfolio of Alex M. Muli — Fullstack Software Engineer specializing in React, Node.js, and AI/ML solutions. Explore projects, experience, and contact details."
      />
      <meta
        name="keywords"
        content="Alex Muli, Fullstack Developer, AI Engineer, Machine Learning, React, Node.js, Developer Portfolio, Cloud, Kenya"
      />

      {/* ✅ Open Graph for link previews */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Alex M. Muli | Fullstack Software Engineer & AI/ML Specialist"
      />
      <meta
        property="og:description"
        content="Explore production-grade web apps, AI/ML solutions, and creative engineering by Alex M. Muli."
      />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/" />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta
        property="og:image:alt"
        content="Alex M. Muli Portfolio Preview"
      />

      {/* ✅ Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Alex M. Muli | Fullstack Software Engineer & AI/ML Specialist"
      />
      <meta
        name="twitter:description"
        content="Explore production-grade web and AI projects by Alex M. Muli."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />

      {/* ✅ Optional Favicon + Theme Color */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#0b1220" />

      {/* ✅ Layout */}
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
