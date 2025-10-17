// src/App.jsx
// Description: Main app entry point — renders Navbar, Hero, and all sections.
// Notes:
// - SEO + Open Graph meta tags have been moved to public/index.html
// - No external Helmet dependency required
// - Ensure public/og-image.png exists before deployment

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
      {/* ✅ Layout — all sections rendered in order */}
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
