import React, { memo, useState, useEffect } from "react";
import avatar0 from "../../assets/avatar0.png";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import "./About.css";

const About = () => {
  const avatars = [avatar0, avatar1, avatar2];
  const [currentAvatar, setCurrentAvatar] = useState(0);

  // Crossfade every 8s (adjust if needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatar((prev) => (prev + 1) % avatars.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [avatars.length]);

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "AI/ML", label: "Deep Expertise" },
    { value: "Cloud", label: "Scalable Solutions" },
  ];

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      {/* === React 19 Native Metadata (Auto-verified SEO + Canonical OG) === */}
      <title>About | Alex M. Muli — Fullstack Software Engineer & AI/ML Expert</title>
      <meta
        name="description"
        content="Learn about Alex M. Muli, a Fullstack Software Engineer with expertise in React, Node.js, AI/ML, Cloud Computing, DevOps, Data Analysis, and cybersecurity best practices."
      />
      <meta
        name="keywords"
        content="Alex M. Muli, Fullstack Software Engineer, AI/ML Specialist, Cloud Computing, DevOps, Cybersecurity, React, Node.js, Portfolio, 2025 Skills"
      />
      <meta property="og:type" content="profile" />
      <meta
        property="og:title"
        content="About Alex M. Muli — Fullstack Engineer & AI/ML Specialist"
      />
      <meta
        property="og:description"
        content="Discover Alex M. Muli’s journey as a Fullstack Software Engineer with deep expertise in AI/ML, Cloud, DevOps, API development, cybersecurity, and scalable systems."
      />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta
        property="og:image:alt"
        content="Alex M. Muli Portfolio Preview"
      />
      <meta property="og:url" content="https://iconicglobaltech.netlify.app/about" />
      <meta property="og:site_name" content="Alex M. Muli Portfolio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="About Alex M. Muli — Fullstack Engineer & AI/ML Specialist"
      />
      <meta
        name="twitter:description"
        content="Explore the profile of Alex M. Muli, a versatile software engineer and AI/ML expert delivering scalable apps and data-driven solutions."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <link
        rel="canonical"
        href="https://iconicglobaltech.netlify.app/#about"
      />

      <h2 id="about-title" className="about-title">
        About Me
      </h2>

      <div className="about-container">
        {/* Animated Avatar Crossfade */}
        <div className="about-avatar">
          <div className="avatar-wrapper">
            {avatars.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Alex M. Muli — avatar ${index + 1}`}
                width="300"
                height="300"
                loading="lazy"
                decoding="async"
                className={`avatar-img ${index === currentAvatar ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="about-content">
          <h3 className="about-heading">
            Fullstack Engineer | AI/ML Specialist | Cloud & DevOps Professional
          </h3>

          <p className="about-description">
            I’m <strong>Alex M. Muli</strong>, a results-driven <em>Fullstack Software Engineer</em> with deep
            expertise in <em>Artificial Intelligence</em>, <em>Machine Learning</em>, and <em>Data Analysis</em>.
            Over the past years, I’ve successfully designed, developed, and deployed high-performance solutions across
            <strong> web applications</strong>, <strong>cloud platforms</strong>, and <strong>enterprise-grade systems</strong>.
            <br /> <br />
            My skillset extends beyond engineering into critical <strong>2025 in-demand areas</strong> such as
            <em> Cloud Computing (AWS, Azure, GCP)</em>, <em>DevOps & CI/CD pipelines</em>, <em>API development & integration</em>,
            <em> Cybersecurity best practices</em>, <em>UI/UX optimization</em>, and <em>Agile team collaboration</em>. This unique
            blend makes me not just an engineer but a <strong>versatile problem solver</strong> who thrives in fast-changing tech
            landscapes.
          </p>

          <div
            className="about-stats"
            role="list"
            aria-label="Professional highlights"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-card"
                role="listitem"
                tabIndex={0}
                aria-label={`${s.value} — ${s.label}`}
              >
                <h4>{s.value}</h4>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
