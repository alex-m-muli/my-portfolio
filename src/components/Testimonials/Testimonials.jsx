// src/components/Testimonials/Testimonials.jsx
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Testimonials.css";

/**
 * Testimonials
 * - God-tier rotating testimonial grid
 * - Each card cycles independently (its own timer)
 * - Hover / touch to pause (hold-to-stop) with smooth resume
 * - Manual Prev/Next controls per card
 * - SEO + Open Graph via react-helmet-async
 *
 * Notes:
 * - Intervals and timeouts are stored in refs to ensure stable cleanup.
 * - Animations are handled by Framer Motion (AnimatePresence) while CSS
 *   provides micro-interactions and fallbacks.
 */
const Testimonials = () => {
  // Testimonials grouped into cards; each group becomes one visually-styled card
  // Add or modify testimonials here — maintain shape: { name, role, feedback, optional avatar }
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

  // Track which testimonial (index) is currently active for each card
  const [indexes, setIndexes] = useState(() =>
    testimonials.map(() => 0)
  );

  // Pause state - when true, auto-rotation stops for all cards
  const [paused, setPaused] = useState(false);

  // Refs to hold interval IDs (per card) and resume timeout (single)
  const intervalsRef = useRef([]);
  const resumeTimeoutRef = useRef(null);

  // Constants
  const BASE_INTERVAL_MS = 6000; // base auto-rotate per card
  const STAGGER_MS = 1500; // stagger start times between cards
  const RESUME_DELAY_MS = 800; // delay before resuming after hold

  // Utility: clear all intervals
  const clearAllIntervals = () => {
    intervalsRef.current.forEach((id) => {
      if (id) clearInterval(id);
    });
    intervalsRef.current = [];
  };

  // Utility: start rotation interval for a single card index
  const startIntervalForCard = (cardIdx) => {
    // clear existing interval for that card
    if (intervalsRef.current[cardIdx]) {
      clearInterval(intervalsRef.current[cardIdx]);
    }

    const interval = setInterval(() => {
      setIndexes((prev) => {
        const next = [...prev];
        next[cardIdx] = (next[cardIdx] + 1) % testimonials[cardIdx].length;
        return next;
      });
    }, BASE_INTERVAL_MS);

    intervalsRef.current[cardIdx] = interval;
  };

  // Start intervals for all cards (with optional staggered start)
  const startAllIntervals = (stagger = true) => {
    clearAllIntervals();
    testimonials.forEach((_, idx) => {
      // stagger the first tick by scheduling the interval start slightly offset
      if (stagger) {
        // Use setTimeout to stagger the creation of each interval so their ticks are offset
        setTimeout(() => startIntervalForCard(idx), idx * STAGGER_MS);
      } else {
        startIntervalForCard(idx);
      }
    });
  };

  // Setup auto-rotation intervals on mount and whenever paused changes
  useEffect(() => {
    // If paused, ensure intervals are cleared
    if (paused) {
      clearAllIntervals();
      return;
    }

    // Start intervals when not paused
    startAllIntervals(true);

    // Cleanup on unmount
    return () => {
      clearAllIntervals();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]); // only re-run when paused toggles

  // Manual navigation: previous testimonial for a specific card
  const handlePrev = (cardIndex) => {
    setIndexes((prev) =>
      prev.map((val, idx) =>
        idx === cardIndex
          ? (val - 1 + testimonials[idx].length) % testimonials[idx].length
          : val
      )
    );
    // Reset that card's interval so user has time to read
    if (!paused) {
      startIntervalForCard(cardIndex);
    }
  };

  // Manual navigation: next testimonial for a specific card
  const handleNext = (cardIndex) => {
    setIndexes((prev) =>
      prev.map((val, idx) =>
        idx === cardIndex ? (val + 1) % testimonials[idx].length : val
      )
    );
    // Reset that card's interval so user has time to read
    if (!paused) {
      startIntervalForCard(cardIndex);
    }
  };

  // Pause helpers (with optional resume delay)
  const pauseAll = () => {
    // Cancel any pending resume
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setPaused(true);
  };

  const resumeAll = (delay = RESUME_DELAY_MS) => {
    // If immediate resume requested, just unpause
    if (delay === 0) {
      setPaused(false);
      return;
    }
    // Clear any existing resume timeout then schedule a new one
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false);
      resumeTimeoutRef.current = null;
    }, delay);
  };

  // Accessibility: handle keyboard arrow navigation when focus is inside card
  // (Left/Right navigate that specific card)
  const handleKeyNav = (e, cardIndex) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev(cardIndex);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext(cardIndex);
    }
  };

  // Framer Motion variants for testimonial swapping
  const variants = {
    initial: { opacity: 0, y: 18, scale: 0.996 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.996 },
    transition: { duration: 0.48, ease: "easeInOut" },
  };

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Testimonials">
      <Helmet>
        {/* SEO + Open Graph Meta Tags */}
        <title>Testimonials | Alex M. Muli - Fullstack Developer</title>
        <meta
          name="description"
          content="Read testimonials about Alex M. Muli, a Fullstack Developer known for crafting innovative, high-performance, and reliable software solutions globally."
        />
        <meta
          name="keywords"
          content="Alex M. Muli, testimonials, client reviews, software developer, fullstack engineer, React, Node.js, Kenya"
        />
        <meta property="og:title" content="Testimonials | Alex M. Muli - Fullstack Developer" />
        <meta
          property="og:description"
          content="What clients and colleagues say about Alex M. Muli — exceptional fullstack developer building world-class digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alexmuli.dev/testimonials" />
        <meta property="og:image" content="https://alexmuli.dev/preview.jpg" />
      </Helmet>

      <div className="testimonials-header">
        <h2>What People Say</h2>
        <p>
          Feedback from clients, engineers, and leaders who have collaborated with me worldwide.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((group, cardIndex) => {
          const activeIndex = indexes[cardIndex];
          const current = group[activeIndex];

          return (
            <motion.div
              key={`card-${cardIndex}`}
              className="testimonial-card"
              // Pause on hover (desktop)
              onMouseEnter={pauseAll}
              onMouseLeave={() => resumeAll(RESUME_DELAY_MS)}
              // Pause on touch (mobile); resume after release with slight delay
              onTouchStart={pauseAll}
              onTouchEnd={() => resumeAll(RESUME_DELAY_MS)}
              onKeyDown={(e) => handleKeyNav(e, cardIndex)}
              tabIndex={0} // card can receive keyboard focus
              aria-roledescription="carousel"
              aria-label={`Testimonials carousel card ${cardIndex + 1}`}
            >
              {/* AnimatePresence lets the testimonial content exit/enter smoothly */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`testimonial-${cardIndex}-${activeIndex}`}
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

                  <div className="author" aria-hidden="false">
                    <h4>{current.name}</h4>
                    <span>{current.role}</span>
                  </div>

                  <div className="stars" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls (Prev / Next) */}
              <div className="testimonial-controls" role="group" aria-label="Testimonial navigation">
                <button
                  className="nav-btn prev-btn"
                  aria-label={`Previous testimonial for card ${cardIndex + 1}`}
                  onClick={() => {
                    handlePrev(cardIndex);
                    // keep auto-rotation paused briefly after manual action for comfort
                    if (!paused) {
                      // restart that card interval to give user time
                      startIntervalForCard(cardIndex);
                    }
                  }}
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <button
                  className="nav-btn next-btn"
                  aria-label={`Next testimonial for card ${cardIndex + 1}`}
                  onClick={() => {
                    handleNext(cardIndex);
                    if (!paused) {
                      startIntervalForCard(cardIndex);
                    }
                  }}
                >
                  <FaChevronRight aria-hidden="true" />
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
