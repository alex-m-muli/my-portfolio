// ===============================================================
// src/components/Experience/Experience.jsx — Final Production Build
// ===============================================================
// - Preserves all original class names (no breaking changes)
// - Subtle visual polish, accessibility, and performance tweaks
// - IntersectionObserver-driven reveal for timeline items (starts animations when in view)
// - Respect prefers-reduced-motion and provide graceful fallback
// - SEO meta tags kept hardcoded exactly as provided
// ===============================================================

import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./Experience.css";

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll(".timeline-item"));
    if (!items.length) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // If user prefers reduced motion, mark all items visible immediately (no animations)
      items.forEach((it) => it.classList.add("visible"));
      return;
    }

    // IntersectionObserver to reveal items when they enter viewport
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optionally unobserve to prevent repetitive toggles
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    items.forEach((it) => observer.observe(it));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" aria-labelledby="exp-title" ref={containerRef}>
      <Helmet>
        {/* SEO + Open Graph Meta Tags (kept hardcoded) */}
        <title>Professional Experience | Alex M. Muli - Fullstack Developer</title>
        <meta
          name="description"
          content="Explore Alex M. Muli’s professional journey — from building cutting-edge solutions at global firms to impactful work at Kenyan tech innovators."
        />
        <meta property="og:title" content="Alex M. Muli | Professional Experience" />
        <meta
          property="og:description"
          content="Fullstack Developer with global experience — crafted scalable systems and AI solutions for startups, enterprises, and freelance clients."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="experience-header">
        <h2 id="exp-title">Professional Experience</h2>
        <p>
          A timeline of my journey delivering innovative, reliable, and scalable
          software solutions from <span>2020</span> to <span>2025</span>.
        </p>
      </div>

      <div className="timeline" role="list" aria-label="Professional experience timeline">
        <div className="timeline-item left" role="listitem" tabIndex={0} aria-label="Safaricom PLC — Jan 2024 to Sep 2025">
          <div className="dot" aria-hidden="true" />
          <div className="content">
            <h3>Fullstack Developer — Safaricom PLC (Kenya)</h3>
            <span className="date">Jan 2024 – Sep 2025</span>
            <p>
              Led development of internal enterprise dashboards and AI-driven
              customer analytics tools. Architected APIs with Node.js and
              MongoDB, and built highly interactive UIs with React and Next.js.
            </p>
            <ul>
              <li>Integrated machine learning pipelines improving efficiency by 32%.</li>
              <li>Enhanced user dashboards with real-time visual insights.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item right" role="listitem" tabIndex={0} aria-label="Microsoft — Jan 2023 to Dec 2023">
          <div className="dot" aria-hidden="true" />
          <div className="content">
            <h3>Software Engineer — Microsoft (Remote)</h3>
            <span className="date">Jan 2023 – Dec 2023</span>
            <p>
              Contributed to Azure DevOps toolchain enhancements. Designed
              scalable CI/CD workflows and built automation modules for testing
              cloud-native applications.
            </p>
            <ul>
              <li>Optimized deployment pipelines, reducing build time by 45%.</li>
              <li>Collaborated across teams using Agile and SCRUM.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item left" role="listitem" tabIndex={0} aria-label="Elimu Digital TV — Apr 2022 to Jun 2022">
          <div className="dot" aria-hidden="true" />
          <div className="content">
            <h3>Software Development Intern — Elimu Digital TV (Kenya)</h3>
            <span className="date">Apr 2022 – Jun 2022</span>
            <p>
              Joined a talented team building educational broadcasting software
              for digital learning in Kenya. Focused on front-end and API
              integrations.
            </p>
            <ul>
              <li>Developed dynamic content modules in React.js.</li>
              <li>Assisted in implementing RESTful APIs for content delivery.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item right" role="listitem" tabIndex={0} aria-label="Andela — Jan 2021 to Dec 2022">
          <div className="dot" aria-hidden="true" />
          <div className="content">
            <h3>Fullstack Developer — Andela (Remote)</h3>
            <span className="date">Jan 2021 – Dec 2022</span>
            <p>
              Built scalable SaaS platforms and mentor-matching systems for
              global clients using React, Node.js, and PostgreSQL. Mentored junior
              engineers and led UI/UX improvements.
            </p>
            <ul>
              <li>Delivered high-performance applications serving 100K+ users.</li>
              <li>Streamlined backend API structure for 40% faster responses.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item left" role="listitem" tabIndex={0} aria-label="Freelance — Jan 2020 to Dec 2021">
          <div className="dot" aria-hidden="true" />
          <div className="content">
            <h3>Freelance Software Engineer — Global Clients</h3>
            <span className="date">Jan 2020 – Dec 2021</span>
            <p>
              Delivered custom web applications and AI-powered solutions for
              startups and SMEs worldwide. Specialized in full-stack and data-driven
              project delivery.
            </p>
            <ul>
              <li>Completed 20+ high-impact projects with consistent 5⭐ ratings.</li>
              <li>Focused on performance, SEO, and clean UI/UX principles.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
