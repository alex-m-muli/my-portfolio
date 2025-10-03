// File: src/components/Hero/Hero.jsx
// Description: God-tier Hero component with digital network particles + connections,
//              polished animations, accessible CTAs, and SEO/Open Graph meta tags via react-helmet.

import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { Helmet } from "react-helmet-async";

/**
 * Hero Component
 * - SEO meta tags (Helmet)
 * - Canvas-based particles with connection lines (digital network effect)
 * - Main hero content with headings, description, and CTAs
 */
export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 80;
    const CONNECT_DISTANCE = 140;

    // Particle object constructor
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = 2 + Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 77, 255, 0.8)";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 195, 247, ${1 - dist / CONNECT_DISTANCE})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="hero" role="banner" aria-label="Hero — Alex M. Muli">
      {/* SEO / Open Graph / Twitter meta tags */}
      <Helmet>
        <title>Alex M. Muli — Fullstack Software Engineer | AI & ML | Data Analyst</title>
        <meta
          name="description"
          content="Portfolio of Alex M. Muli: Fullstack Engineer focused on React, Node.js, AI/ML and scalable production systems. Explore projects, data work, and professional experience."
        />
        <meta
          name="keywords"
          content="Fullstack Developer, AI Engineer, Machine Learning, React, Node.js, Data Analyst, Portfolio"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alex M. Muli — Fullstack Software Engineer" />
        <meta
          property="og:description"
          content="Building production-grade web apps and AI solutions. View projects and contact for collaboration."
        />
        <meta property="og:url" content="https://your-portfolio.com/" />
        <meta property="og:image" content="https://your-portfolio.com/og-preview.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex M. Muli — Fullstack Software Engineer" />
        <meta
          name="twitter:description"
          content="Explore projects in web development, AI, and data analysis by Alex M. Muli."
        />
        <meta name="twitter:image" content="https://your-portfolio.com/og-preview.png" />
      </Helmet>

      {/* Particles + connections canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true"></canvas>

      {/* Soft glass overlay for contrast */}
      <div className="hero-glass" aria-hidden="true" />

      {/* Main Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Alex M. Muli — <span className="accent">Fullstack Software Engineer</span>
        </h1>
        <h2 className="hero-subtitle">
          AI &amp; ML Engineer • Data Analyst • Cloud-native Architect
        </h2>

        <p className="hero-description">
          I design and deliver production-grade web applications, scalable backend
          systems, and AI-powered features. I combine clean engineering, measurable
          outcomes, and elegant UX to turn complex problems into high-value products.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects" aria-label="View Projects">
            View Projects
          </a>
          <a className="btn btn-outline" href="#contact" aria-label="Contact">
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}
