// File: src/components/Testimonials/Testimonials.jsx
// Final production-ready Testimonials component
// - Preserves all class names and markup
// - Minor polishing: stable cleanup, ARIA, reduced-motion support, and concise comments

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
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

  // index state per card
  const [indexes, setIndexes] = useState(() => testimonials.map(() => 0));
  const [paused, setPaused] = useState(false);

  // refs for intervals and resume timer
  const intervalsRef = useRef([]);
  const resumeTimeoutRef = useRef(null);

  // config
  const BASE_INTERVAL_MS = 6000;
  const STAGGER_MS = 1200;
  const RESUME_DELAY_MS = 900;

  // clear intervals helper
  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach((id) => {
      if (id) clearInterval(id);
    });
    intervalsRef.current = [];
  }, []);

  // start interval for a single card
  const startIntervalForCard = useCallback(
    (cardIdx) => {
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
    },
    [BASE_INTERVAL_MS, testimonials]
  );

  // start all intervals (staggered) 
  const startAllIntervals = useCallback(
    (stagger = true) => {
      clearAllIntervals();
      testimonials.forEach((_, idx) => {
        if (stagger) {
          setTimeout(() => startIntervalForCard(idx), idx * STAGGER_MS);
        } else {
          startIntervalForCard(idx);
        }
      });
    },
    [clearAllIntervals, startIntervalForCard, testimonials]
  );

  // lifecycle: start/stop intervals according to paused + cleanup
  useEffect(() => {
    // respect reduced-motion: don't start intervals if user prefers reduced-motion
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // reveal zero-motion state (indices still default to 0)
      clearAllIntervals();
      return () => {};
    }

    if (paused) {
      clearAllIntervals();
      return undefined;
    }

    startAllIntervals(true);

    return () => {
      clearAllIntervals();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [paused, clearAllIntervals, startAllIntervals]);

  // manual navigation
  const handlePrev = (cardIndex) => {
    setIndexes((prev) =>
      prev.map((val, idx) => (idx === cardIndex ? (val - 1 + testimonials[idx].length) % testimonials[idx].length : val))
    );
    if (!paused) startIntervalForCard(cardIndex);
  };

  const handleNext = (cardIndex) => {
    setIndexes((prev) => prev.map((val, idx) => (idx === cardIndex ? (val + 1) % testimonials[idx].length : val)));
    if (!paused) startIntervalForCard(cardIndex);
  };

  // pause/resume helpers
  const pauseAll = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setPaused(true);
  };

  const resumeAll = (delay = RESUME_DELAY_MS) => {
    if (delay === 0) {
      setPaused(false);
      return;
    }
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false);
      resumeTimeoutRef.current = null;
    }, delay);
  };

  // keyboard nav inside a card
  const handleKeyNav = (e, cardIndex) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev(cardIndex);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext(cardIndex);
    }
  };

  // framer motion variants
  const variants = {
    initial: { opacity: 0, y: 14, scale: 0.996 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.996 },
    transition: { duration: 0.48, ease: "easeInOut" },
  };

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Testimonials">
      <Helmet>
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
        <p>Feedback from clients, engineers, and leaders who have collaborated with me worldwide.</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((group, cardIndex) => {
          const activeIndex = indexes[cardIndex];
          const current = group[activeIndex];

          return (
            <motion.div
              key={`card-${cardIndex}`}
              className="testimonial-card"
              onMouseEnter={pauseAll}
              onMouseLeave={() => resumeAll(RESUME_DELAY_MS)}
              onTouchStart={pauseAll}
              onTouchEnd={() => resumeAll(RESUME_DELAY_MS)}
              onKeyDown={(e) => handleKeyNav(e, cardIndex)}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label={`Testimonials carousel card ${cardIndex + 1}`}
            >
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

                  <div className="author">
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

              <div className="testimonial-controls" role="group" aria-label="Testimonial navigation">
                <button
                  className="nav-btn prev-btn"
                  aria-label={`Previous testimonial for card ${cardIndex + 1}`}
                  onClick={() => handlePrev(cardIndex)}
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <button
                  className="nav-btn next-btn"
                  aria-label={`Next testimonial for card ${cardIndex + 1}`}
                  onClick={() => handleNext(cardIndex)}
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

