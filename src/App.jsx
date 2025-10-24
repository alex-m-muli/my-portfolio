// src/App.jsx
// ✅ Production-ready React 19 app entry.
// - All metadata moved to index.html for SEO compliance.
// - App only renders visible sections and structure.
// - Clean semantic layout + accessibility improvements.

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
      {/* 🔗 Accessibility: Skip link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* 🧭 Global Layout */}
      <Navbar />

      {/* 🏠 Main sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
