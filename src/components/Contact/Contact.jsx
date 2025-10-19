// src/components/Contact/Contact.jsx
// ✅ Final React 19-ready Contact component
// - Removed react-helmet-async (React 19 auto-hoists <title>/<meta>)
// - Preserves all SEO + OG tags directly in JSX
// - All behavior, validation, and styling unchanged

import React, { useRef, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  // 🧩 Validation logic (unchanged)
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.from_name.trim()) newErrors.from_name = "Name is required.";
    if (!data.reply_to.trim()) newErrors.reply_to = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.reply_to))
      newErrors.reply_to = "Invalid email format.";
    if (!data.subject.trim()) newErrors.subject = "Subject is required.";
    if (!data.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (status.message) setStatus({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const botField = formData.get("bot_field");
    if (botField) {
      setStatus({ message: "Message sent successfully!", type: "success" });
      formRef.current.reset();
      return;
    }

    const data = Object.fromEntries(formData.entries());
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        message: "Please correct the highlighted fields.",
        type: "error",
      });
      return;
    }

    setErrors({});
    setStatus({ message: "", type: "" });

    try {
      setLoading(true);
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          message:
            "✅ Message sent successfully! I’ll get back to you soon — thank you.",
          type: "success",
        });
        formRef.current.reset();
      } else {
        throw new Error(
          result.error || "An error occurred while sending the message."
        );
      }
    } catch (err) {
      console.error("Email send error:", err);
      setStatus({
        message:
          "⚠️ Failed to send message. Try again or email directly with the address below.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      {/* 🧠 SEO + Open Graph metadata (native React 19 way) */}
      <title>Contact | Alex M. Muli - Fullstack Developer</title>
      <meta
        name="description"
        content="Get in touch with Alex M. Muli — Fullstack Developer creating world-class, scalable, and creative software solutions. Send a message directly."
      />
      <meta
        name="keywords"
        content="Alex M. Muli, contact, developer, portfolio, Kenya"
      />
      <meta property="og:title" content="Contact | Alex M. Muli" />
      <meta
        property="og:description"
        content="Reach out for collaborations or opportunities."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://iconicglobaltech.netlify.app/contact"
      />
      <meta
        property="og:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />
      <meta
        property="og:site_name"
        content="Alex M. Muli Portfolio"
      />
      <meta
        property="og:image:alt"
        content="Alex M. Muli Portfolio Preview"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact | Alex M. Muli" />
      <meta
        name="twitter:description"
        content="Reach out for collaborations or opportunities."
      />
      <meta
        name="twitter:image"
        content="https://iconicglobaltech.netlify.app/og-preview.png"
      />

      <div className="contact-header">
        <h2 id="contact-heading">Let’s Connect</h2>
        <p>Have an idea, collaboration, or opportunity? Let’s talk!</p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="contact-form"
        noValidate
        aria-busy={loading}
      >
        {/* Screen reader labels */}
        <label htmlFor="from_name" className="sr-only">
          Your name
        </label>
        <label htmlFor="reply_to" className="sr-only">
          Your email
        </label>
        <label htmlFor="subject" className="sr-only">
          Subject
        </label>
        <label htmlFor="message" className="sr-only">
          Your message
        </label>

        <div className="form-row">
          <div className={`form-group ${errors.from_name ? "error-glow" : ""}`}>
            <input
              id="from_name"
              name="from_name"
              type="text"
              placeholder="Your Name"
              onInput={handleInputChange}
              aria-invalid={!!errors.from_name}
              aria-describedby={
                errors.from_name ? "error-from_name" : undefined
              }
              autoComplete="name"
            />
            {errors.from_name && (
              <span id="error-from_name" className="error-text">
                {errors.from_name}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.reply_to ? "error-glow" : ""}`}>
            <input
              id="reply_to"
              name="reply_to"
              type="email"
              placeholder="Your Email"
              onInput={handleInputChange}
              aria-invalid={!!errors.reply_to}
              aria-describedby={
                errors.reply_to ? "error-reply_to" : undefined
              }
              autoComplete="email"
            />
            {errors.reply_to && (
              <span id="error-reply_to" className="error-text">
                {errors.reply_to}
              </span>
            )}
          </div>
        </div>

        <div className={`form-group ${errors.subject ? "error-glow" : ""}`}>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            onInput={handleInputChange}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "error-subject" : undefined}
            autoComplete="organization"
          />
          {errors.subject && (
            <span id="error-subject" className="error-text">
              {errors.subject}
            </span>
          )}
        </div>

        <div className={`form-group ${errors.message ? "error-glow" : ""}`}>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows={6}
            onInput={handleInputChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
          />
          {errors.message && (
            <span id="error-message" className="error-text">
              {errors.message}
            </span>
          )}
        </div>

        {/* Honeypot field */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="bot_field">Leave this field empty</label>
          <input
            id="bot_field"
            name="bot_field"
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <button
          type="submit"
          className={`submit-btn ${loading ? "loading" : ""}`}
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? "Sending…" : "Send Message"}
        </button>

        <div
          className="status-container"
          role="status"
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message && (
            <p className={`status-message ${status.type}`}>
              {status.message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;
