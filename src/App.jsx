// src/App.jsx
// Description: Main app entry point — renders Navbar, Hero, and all sections.
// Notes:
// - Includes SEO + Open Graph tags using react-helmet-async
// - Ensure `public/og-image.png` exists before deployment
// - Replace "alexmuli.netlify.app" below with your actual Netlify domain after deployment

import React from "react";
import { Helmet } from "react-helmet-async";

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
      {/* 🌐 Global SEO + Open Graph Meta Tags */}
      <Helmet>
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
        <meta property="og:url" content="https://alexmuli.netlify.app/" />
        <meta
          property="og:image"
          content="%PUBLIC_URL%/og-image.png"
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
          content="%PUBLIC_URL%/og-image.png"
        />

        {/* ✅ Optional Favicon + Theme Color */}
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="theme-color" content="#0b1220" />
      </Helmet>

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
