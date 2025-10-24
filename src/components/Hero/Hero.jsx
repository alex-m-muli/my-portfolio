// src/components/Hero/Hero.jsx
// Final production-ready, fully integrated upgrade (UI + perf + a11y + SEO)
// - Preserves all original class names (no breaking renames)
// - DPR-aware canvas, reduced-motion support, efficient resize handling
// - Pauses animation on page hidden, cleans up RAF and listeners
// - Semantic, accessible markup and keyboard-friendly CTAs
// - Hardcoded SEO + Open Graph + Twitter meta tags preserved (React 19-native)

import React, { useEffect, useRef, useCallback } from "react";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const resizeTimerRef = useRef(null);

  // main effect: canvas lifecycle (setup, animate, cleanup)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    const computeParticleCount = (w) => (w < 560 ? 28 : w < 920 ? 48 : w < 1400 ? 72 : 96);
    const computeConnectDistance = (w, h) => Math.max(80, Math.min(220, Math.min(w, h) / 6));

    let PARTICLE_COUNT = computeParticleCount(width);
    let CONNECT_DISTANCE = computeConnectDistance(width, height);
    let CONNECT_DISTANCE_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE;

    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setSize = () => {
      width = Math.max(320, canvas.clientWidth || window.innerWidth);
      height = Math.max(240, canvas.clientHeight || window.innerHeight);
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      PARTICLE_COUNT = computeParticleCount(width);
      CONNECT_DISTANCE = computeConnectDistance(width, height);
      CONNECT_DISTANCE_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE;
    };

    class Particle {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const speedBase = (Math.random() * 0.6 + 0.15) * Math.max(1, width / 1000);
        this.vx = (Math.random() - 0.5) * speedBase;
        this.vy = (Math.random() - 0.5) * speedBase;
        this.radius = 1.2 + Math.random() * 2.2;
        if (!initial) {
          this.x = Math.min(width, Math.max(0, this.x));
          this.y = Math.min(height, Math.max(0, this.y));
        }
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        const r = Math.max(1, this.radius);
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 3);
        g.addColorStop(0, "rgba(124,77,255,0.94)");
        g.addColorStop(0.5, "rgba(124,77,255,0.5)");
        g.addColorStop(1, "rgba(79,195,247,0.06)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    };

    const drawConnections = (list) => {
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const a = list[i];
        for (let j = i + 1; j < len; j++) {
          const b = list[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DISTANCE_SQ) {
            const alpha = 1 - Math.sqrt(distSq) / CONNECT_DISTANCE;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,195,247,${Math.max(0, Math.min(0.9, alpha))})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (document.hidden) return;
      ctx.clearRect(0, 0, width, height);
      const list = particlesRef.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.update();
        p.draw();
      }
      drawConnections(list);
      rafRef.current = requestAnimationFrame(animate);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "rgba(6,6,21,0.12)");
      g.addColorStop(1, "rgba(6,8,16,0.22)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      const smallCount = Math.max(6, Math.round(PARTICLE_COUNT * 0.06));
      for (let i = 0; i < smallCount; i++) {
        ctx.beginPath();
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.arc(x, y, Math.random() * 1.6 + 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124,77,255,0.06)";
        ctx.fill();
      }
    };

    setSize();
    initParticles();

    if (reducedMotion) {
      drawStatic();
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }

    const onResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        setSize();
        initParticles();
      }, 120);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        if (!reducedMotion && !rafRef.current) rafRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  return (
    <header className="hero" role="banner" aria-label="Hero — Alex M. Muli">
      {/* SEO + Open Graph + Twitter (React 19-native metadata) */}
      <title>Alex M. Muli — Fullstack Software Engineer | AI & ML | Data Analyst</title>
      <meta
        name="description"
        content="Portfolio of Alex M. Muli: Fullstack Engineer focused on React, Node.js, AI/ML and scalable production systems. Explore projects, data work, and professional experience."
      />
      <meta name="keywords" content="Fullstack Developer, AI Engineer, Machine Learning, React, Node.js, Data Analyst, Portfolio" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Alex M. Muli — Fullstack Software Engineer" />
      <meta property="og:description" content="Building production-grade web apps and AI solutions. View projects and contact for collaboration." />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#hero" />
      <meta property="og:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Alex M. Muli — Fullstack Software Engineer" />
      <meta name="twitter:description" content="Explore projects in web development, AI, and data analysis by Alex M. Muli." />
      <meta name="twitter:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />

      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-glass" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="hero-title">
          Alex M. Muli — <span className="accent">Fullstack Software Engineer</span>
        </h1>
        <h2 className="hero-subtitle">AI &amp; ML Engineer • Data Analyst • Cloud-native Architect</h2>
        <p className="hero-description">
          I craft performant, intelligent digital experiences through clean engineering,
          AI-driven innovation, and user-centered design.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects" aria-label="View Projects">View Projects</a>
          <a className="btn btn-outline" href="#contact" aria-label="Contact">Get in Touch</a>
        </div>
      </div>
    </header>
  );
}
