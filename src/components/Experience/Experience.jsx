// ===============================================================
// src/components/Experience/Experience.jsx — Final God-tier Build (React 19 SEO-Native)
// ===============================================================
// - Card-based professional timeline (polished layout, animated reveal)
// - Semantic HTML5 sections: <article>, <header>, <footer>
// - Fully documented, accessible, SEO & OG optimized
// - Consistent card height + soft hover glow
// ===============================================================

import React, { useEffect, useRef } from "react";
import "./Experience.css";

/**
 * Experience
 * ----------------
 * A visually rich and accessible experience timeline using a card-based layout.
 * Cards reveal smoothly via IntersectionObserver and support keyboard navigation.
 *
 * ✨ Features:
 * - Card hover lift + glow for subtle interactivity
 * - Consistent visual hierarchy with clear accent colors
 * - Semantic grouping for assistive tech (header/body/footer)
 * - Responsive grid that stacks beautifully on mobile
 */

const experiences = [
  {
    id: "safaricom",
    company: "Safaricom PLC (Kenya)",
    role: "Fullstack Developer",
    date: "Jan 2024 – Sep 2025",
    description:
      "Led development of enterprise dashboards and AI-driven analytics tools.",
    bullets: [
      "Integrated ML pipelines improving efficiency by 32%.",
      "Enhanced dashboards with real-time insights and alerting."
    ],
  },
  {
    id: "microsoft",
    company: "Microsoft (Remote)",
    role: "Software Engineer",
    date: "Jan 2023 – Dec 2023",
    description: "Contributed to Azure DevOps enhancements and CI/CD automation.",
    bullets: [
      "Reduced build time by 45% through pipeline optimization.",
      "Built automation modules for cloud-native testing and observability."
    ],
  },
  {
    id: "elimu",
    company: "Elimu Digital TV (Kenya)",
    role: "Software Dev Intern",
    date: "Apr 2022 – Jun 2022",
    description: "Built educational broadcasting modules for digital learning.",
    bullets: [
      "Developed React-based content modules with high accessibility.",
      "Implemented RESTful API integrations for content delivery."
    ],
  },
  {
    id: "andela",
    company: "Andela (Remote)",
    role: "Fullstack Developer",
    date: "Jan 2021 – Dec 2022",
    description: "Built mentor-matching SaaS platforms and led UI/UX improvements.",
    bullets: [
      "Delivered systems serving 100K+ users with resilient scaling.",
      "Streamlined backend APIs for 40% faster responses."
    ],
  },
  {
    id: "freelance",
    company: "Freelance (Global)",
    role: "Software Engineer",
    date: "Jan 2020 – Dec 2021",
    description: "Delivered custom AI-powered and data-driven web apps.",
    bullets: [
      "Completed 20+ high-impact projects with consistent 5★ ratings.",
      "Focused on performance, SEO, and elegant UX."
    ],
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  // Reveal animation on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".exp-card");
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      cards.forEach((card) => card.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    cards.forEach((card, i) => {
      card.style.setProperty("--stagger", `${i * 90}ms`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="experience-section"
      aria-labelledby="exp-title"
      ref={containerRef}
    >
      {/* === React 19 Native Metadata === */}
      <title>Professional Experience | Alex M. Muli — Fullstack Developer</title>
      <meta
        name="description"
        content="Explore Alex M. Muli’s professional experience — from building AI-driven dashboards at Safaricom to global cloud solutions with Microsoft and Andela."
      />
      <meta
        name="keywords"
        content="Alex M. Muli, Fullstack Developer, Software Engineer, Safaricom, Microsoft, Andela, Experience, Portfolio, Kenya, Global Developer"
      />
      <meta property="og:type" content="profile" />
      <meta property="og:title" content="Alex M. Muli | Professional Experience" />
      <meta
        property="og:description"
        content="A decade of impactful software development — scalable systems, data analytics, and elegant engineering across global firms."
      />
      <meta property="og:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/#experience" />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta property="og:image:alt" content="Alex M. Muli Portfolio Preview" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Alex M. Muli | Professional Experience" />
      <meta
        name="twitter:description"
        content="Explore Alex M. Muli’s extensive professional background — from Safaricom enterprise AI projects to global fullstack engineering roles."
      />
      <meta name="twitter:image" content="https://iconicglobaltech.netlify.app/og-preview.png" />

      {/* Section Header */}
      <div className="experience-header">
        <h2 id="exp-title">Professional Experience</h2>
        <p>
          A curated collection of roles and milestones, showcasing impact and
          measurable outcomes across <strong>2020–2025</strong>.
        </p>
      </div>

      {/* Card Grid */}
      <div
        className="timeline-cards"
        role="list"
        aria-label="Professional experience cards"
      >
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="exp-card"
            role="listitem"
            tabIndex={0}
            aria-labelledby={`exp-${exp.id}-title`}
          >
            <header className="card-head">
              <div className="title-group">
                <h3 id={`exp-${exp.id}-title`} className="card-title">
                  {exp.role}
                </h3>
                <p className="company">{exp.company}</p>
              </div>
              <div className="date-badge" aria-hidden="true">
                {exp.date}
              </div>
            </header>

            <div className="card-body">
              <p className="card-desc">{exp.description}</p>
              <ul className="card-bullets">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <footer className="card-footer">
              <a
                className="view-more"
                href={`#${exp.id}`}
                aria-label={`View more about ${exp.company}`}
              >
                Learn more
              </a>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;