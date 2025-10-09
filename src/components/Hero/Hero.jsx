// ===============================================================
// src/components/Hero/Hero.jsx  (Production-ready, optimized)
// ---------------------------------------------------------------
// - Canvas-based particles + connection lines (digital network)
// - DPR-aware canvas scaling for crisp rendering on HiDPI
// - Reduced particle count & disabled animations for small screens
// - Pauses animation when tab is hidden (saves CPU)
// - Respects prefers-reduced-motion: draws a subtle static background
// - Proper cleanup of RAF and event listeners on unmount
// - Accessibility: canvas is decorative (aria-hidden), CTAs accessible
// - SEO + Open Graph + Twitter meta tags hardcoded (as requested)
// - Class names preserved to avoid breaking existing CSS
// ===============================================================

import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const resizeTickRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Device pixel ratio for crisp rendering
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    // Dimensions (in CSS pixels)
    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    // Compute particle count based on viewport size for balanced perf
    const computeParticleCount = (w) => {
      if (w < 560) return 28; // phones
      if (w < 920) return 48; // small tablets
      if (w < 1400) return 72; // laptops
      return 96; // large screens
    };

    // Connection distance scaled to viewport for balanced density
    const computeConnectDistance = (w, h) => Math.max(80, Math.min(220, Math.min(w, h) / 6));

    let PARTICLE_COUNT = computeParticleCount(width);
    let CONNECT_DISTANCE = computeConnectDistance(width, height);
    const CONNECT_DISTANCE_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE;

    // Respect users who prefer reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Helper: set canvas pixel size properly and scale context
    function setSize() {
      // Update dimensions based on client size
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;

      dpr = Math.max(1, window.devicePixelRatio || 1);

      // Set actual canvas pixel size
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Ensure CSS size matches
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Normalize drawing scale to device pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recompute particle density parameters
      PARTICLE_COUNT = computeParticleCount(width);
      CONNECT_DISTANCE = computeConnectDistance(width, height);
    }

    // Particle class (kept simple and performant)
    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        // spawn anywhere inside viewport
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // speed scaled slightly with viewport size
        const speed = (Math.random() * 0.6 + 0.15) * (Math.max(1, width / 1000));
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = 1.2 + Math.random() * 2.2;
        if (!initial) {
          // nudge slightly to avoid pop when reflowing
          this.x = Math.min(width, Math.max(0, this.x));
          this.y = Math.min(height, Math.max(0, this.y));
        }
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // bounce on bounds
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 77, 255, 0.86)";
        ctx.fill();
      }
    }

    // Initialize particles
    function initParticles() {
      const list = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) list.push(new Particle());
      particlesRef.current = list;
    }

    // Draw connections between nearby particles (optimized)
    function drawConnections(list) {
      // O(n^2) but n is controlled via PARTICLE_COUNT
      for (let i = 0; i < list.length; i++) {
        const a = list[i];
        for (let j = i + 1; j < list.length; j++) {
          const b = list[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DISTANCE * CONNECT_DISTANCE) {
            // normalized alpha (1 at close, 0 at threshold)
            const alpha = 1 - Math.sqrt(distSq) / CONNECT_DISTANCE;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 195, 247, ${Math.max(0, Math.min(0.9, alpha))})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    // Main render loop
    function animate() {
      // Stop if page is hidden (will be restarted on visibilitychange)
      if (document.hidden) return;

      ctx.clearRect(0, 0, width, height);

      const list = particlesRef.current;

      // Update & draw particles
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.update();
        p.draw();
      }

      // Draw connections
      drawConnections(list);

      rafRef.current = requestAnimationFrame(animate);
    }

    // If reduced motion is requested, draw a subtle static scene and skip animation
    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      // soft vignette-ish gradient
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "rgba(6,6,21,0.12)");
      g.addColorStop(1, "rgba(6,8,16,0.22)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // draw a very small number of subtle dots for decoration
      const smallCount = Math.max(6, Math.round(PARTICLE_COUNT * 0.06));
      for (let i = 0; i < smallCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.6 + 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,77,255,0.06)";
        ctx.fill();
      }
    }

    // Initial setup
    setSize();
    initParticles();

    // If reduced motion: draw once and don't start RAF loop
    if (reducedMotion) {
      drawStatic();
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }

    // Resize handler (rAF-throttled)
    function handleResize() {
      if (resizeTickRef.current) return;
      resizeTickRef.current = true;
      requestAnimationFrame(() => {
        const oldCount = PARTICLE_COUNT;
        setSize();
        // If density bucket changed significantly, re-init particles to keep visual balance
        const nextCount = computeParticleCount(width);
        if (Math.abs(nextCount - oldCount) > Math.max(6, Math.round(oldCount * 0.15))) {
          initParticles();
        }
        resizeTickRef.current = false;
      });
    }

    // Pause/Resume on visibility change to save CPU
    function handleVisibility() {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        // resume animation if not reduced motion
        if (!reducedMotion && !rafRef.current) rafRef.current = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      particlesRef.current = [];
    };
  }, []);

  return (
    <header className="hero" role="banner" aria-label="Hero — Alex M. Muli">
      {/* SEO / Open Graph / Twitter meta tags (hardcoded as requested) */}
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

      {/* Canvas layer (decorative) - ARIA hidden since it's non-interactive visual */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true"></canvas>

      {/* Decorative glass overlay (aria-hidden) */}
      <div className="hero-glass" aria-hidden="true" />

      {/* Main hero content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Alex M. Muli — <span className="accent">Fullstack Software Engineer</span>
        </h1>
        <h2 className="hero-subtitle">AI &amp; ML Engineer • Data Analyst • Cloud-native Architect</h2>

        <p className="hero-description">
          I design and deliver production-grade web applications, scalable backend
          systems, and AI-powered features. I combine clean engineering, measurable
          outcomes, and elegant UX to turn complex problems into high-value products.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects" aria-label="View Projects">View Projects</a>
          <a className="btn btn-outline" href="#contact" aria-label="Contact">Get in Touch</a>
        </div>
      </div>
    </header>
  );
}