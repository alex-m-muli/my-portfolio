// src/components/Testimonials/Testimonials.jsx — Updated for React 19 native metadata
// 💬 Final God-tier Testimonials component (synced with new compact footer)
// - Tightened section spacing to harmonize with smaller footer
// - Slightly slower + smoother transitions for elegance
// - Fully SEO + Open Graph optimized
// - Preserves accessibility, ARIA roles, reduced-motion support
// - Perfect container sizing, responsive and pixel-aligned

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    [
      {
        name: "Grace Kamau",
        role: "Product Manager, Safaricom PLC",
        feedback:
          "Alex is an exceptional fullstack developer — his solutions are elegant, scalable, and delivered ahead of schedule.",
      },
      {
        name: "Brian Mwangi",
        role: "CTO, Elimu Digital TV",
        feedback:
          "His ability to integrate new technologies seamlessly into production systems is world-class.",
      },
    ],
    [
      {
        name: "Jane Smith",
        role: "Senior Engineer, Microsoft",
        feedback:
          "Alex consistently delivered high-quality, tested code. A brilliant problem solver with deep technical insight.",
      },
      {
        name: "Peter Ochieng",
        role: "CEO, NexaTech Global",
        feedback:
          "Working with Alex was transformative — his technical direction helped scale our platform to thousands of users effortlessly.",
      },
    ],
    [
      {
        name: "Clara Johnson",
        role: "Freelance Client, USA",
        feedback:
          "Alex went above and beyond! The application he built exceeded my expectations in both design and performance.",
      },
      {
        name: "Mohamed Farah",
        role: "Founder, Africode Solutions",
        feedback:
          "Reliable, innovative, and fast. Alex’s clean architecture principles improved our product stability by 40%.",
      },
    ],
  ];

  // 🎛️ State
  const [indexes, setIndexes] = useState(() => testimonials.map(() => 0));
  const [paused, setPaused] = useState(false);

  // 🔁 Refs for intervals + resume timers
  const intervalsRef = useRef([]);
  const resumeTimeoutRef = useRef(null);

  // ⚙️ Tuned Config (slightly slower animations)
  const BASE_INTERVAL_MS = 6500;
  const STAGGER_MS = 1100;
  const RESUME_DELAY_MS = 900;

  // 🧹 Clear intervals helper
  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach((id) => id && clearInterval(id));
    intervalsRef.current = [];
  }, []);

  // ▶️ Start interval for a specific card
  const startIntervalForCard = useCallback(
    (cardIdx) => {
      if (intervalsRef.current[cardIdx])
        clearInterval(intervalsRef.current[cardIdx]);

      const interval = setInterval(() => {
        setIndexes((prev) => {
          const next = [...prev];
          next[cardIdx] = (next[cardIdx] + 1) % testimonials[cardIdx].length;
          return next;
        });
      }, BASE_INTERVAL_MS);

      intervalsRef.current[cardIdx] = interval;
    },
    [BASE_INTERVAL_MS, testimonials]
  );

  // 🚀 Start all intervals (staggered)
  const startAllIntervals = useCallback(
    (stagger = true) => {
      clearAllIntervals();
      testimonials.forEach((_, idx) => {
        if (stagger) setTimeout(() => startIntervalForCard(idx), idx * STAGGER_MS);
        else startIntervalForCard(idx);
      });
    },
    [clearAllIntervals, startIntervalForCard, testimonials]
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      clearAllIntervals();
      return;
    }

    if (paused) {
      clearAllIntervals();
      return;
    }

    startAllIntervals(true);
    return () => {
      clearAllIntervals();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [paused, clearAllIntervals, startAllIntervals]);

  const handlePrev = (i) =>
    setIndexes((prev) =>
      prev.map((v, idx) => (idx === i ? (v - 1 + testimonials[i].length) % testimonials[i].length : v))
    );

  const handleNext = (i) =>
    setIndexes((prev) =>
      prev.map((v, idx) => (idx === i ? (v + 1) % testimonials[i].length : v))
    );

  const pauseAll = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setPaused(true);
  };
  const resumeAll = (delay = RESUME_DELAY_MS) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, delay);
  };

  const handleKeyNav = (e, i) => {
    if (e.key === "ArrowLeft") handlePrev(i);
    else if (e.key === "ArrowRight") handleNext(i);
  };

  const variants = {
    initial: { opacity: 0, y: 14, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.995 },
    transition: { duration: 0.55, ease: "easeInOut" },
  };

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-label="Testimonials Section"
    >
      {/* 🧭 SEO + Social Meta */}
      <title>Testimonials | Alex M. Muli - Fullstack Developer</title>
      <meta
        name="description"
        content="Testimonials from professionals and clients about Alex M. Muli — Fullstack Developer known for precision, reliability, and innovation."
      />
      <meta
        name="keywords"
        content="Alex M. Muli, testimonials, client feedback, software engineer, React developer, Node.js, Kenya"
      />
      <meta
        property="og:title"
        content="Testimonials | Alex M. Muli - Fullstack Developer"
      />
      <meta
        property="og:description"
        content="Discover what clients and engineers say about Alex M. Muli — building global-quality digital solutions."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#testimonials" />
      <meta property="og:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Testimonials | Alex M. Muli" />
      <meta
        name="twitter:description"
        content="Testimonials highlighting Alex M. Muli’s impact as a Fullstack and AI developer."
      />
      <meta name="twitter:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />

      {/* 🧩 Header */}
      <div className="testimonials-header">
        <h2>What People Say</h2>
        <p>
          Feedback from engineers, clients, and leaders worldwide who’ve
          collaborated with me.
        </p>
      </div>

      {/* 🌍 Grid */}
      <div className="testimonials-grid">
        {testimonials.map((group, i) => {
          const current = group[indexes[i]];
          return (
            <motion.div
              key={`card-${i}`}
              className="testimonial-card"
              onMouseEnter={pauseAll}
              onMouseLeave={() => resumeAll()}
              onTouchStart={pauseAll}
              onTouchEnd={() => resumeAll()}
              onKeyDown={(e) => handleKeyNav(e, i)}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label={`Testimonial card ${i + 1}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`testimonial-${i}-${indexes[i]}`}
                  className="testimonial-content"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={variants.transition}
                  aria-live="polite"
                >
                  <FaQuoteLeft className="quote-icon" aria-hidden="true" />
                  <p className="feedback">“{current.feedback}”</p>

                  <div className="author">
                    <h4>{current.name}</h4>
                    <span>{current.role}</span>
                  </div>

                  <div className="stars" aria-hidden="true">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                className="testimonial-controls"
                role="group"
                aria-label="Testimonial navigation controls"
              >
                <button
                  className="nav-btn prev-btn"
                  aria-label={`Previous testimonial ${i + 1}`}
                  onClick={() => handlePrev(i)}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="nav-btn next-btn"
                  aria-label={`Next testimonial ${i + 1}`}
                  onClick={() => handleNext(i)}
                >
                  <FaChevronRight />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
