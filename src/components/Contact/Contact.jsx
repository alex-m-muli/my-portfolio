import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Contact.css";

/**
 * CONTACT COMPONENT — Secure Serverless Version (Netlify)
 * ------------------------------------------------------------------
 * ✨ Improvements:
 * - Uses Netlify serverless backend for EmailJS sending (no key exposure)
 * - Full client-side validation + animated glow error hints
 * - Smooth success/error feedback transitions matching Contact.css theme
 * - Direct “Email Me” link correctly opens the user’s default email client
 * - SEO + Open Graph optimized
 */

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  // 🧠 Simple client-side validation
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

  // 📤 Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = validateForm(data);

    // 🔍 Validate inputs first
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

      // 🌐 Call our secure Netlify Function
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          message: "✅ Message sent successfully! I’ll get back to you as soon as possible - Thank you!.",
          type: "success",
        });
        formRef.current.reset();
      } else {
        throw new Error(result.error || "An error occurred.");
      }
    } catch (err) {
      console.error("❌ Email send error:", err);
      setStatus({
        message: "⚠️ Failed to send message. Please try again or reach out to me directly via the email below.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <Helmet>
        {/* 🌐 SEO + Open Graph tags */}
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
        <meta property="og:url" content="https://alexmuli.dev/contact" />
        <meta property="og:image" content="https://alexmuli.dev/preview.jpg" />
      </Helmet>

      <div className="contact-header">
        <h2 id="contact-heading">Let’s Connect</h2>
        <p>Have an idea, collaboration, or opportunity? Let’s talk!</p>
      </div>

      {/* ✉️ Contact Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="contact-form"
        noValidate
      >
        <div className="form-row">
          <div className={`form-group ${errors.from_name ? "error-glow" : ""}`}>
            <input type="text" name="from_name" placeholder="Your Name" />
            {errors.from_name && (
              <span className="error-text">{errors.from_name}</span>
            )}
          </div>

          <div className={`form-group ${errors.reply_to ? "error-glow" : ""}`}>
            <input type="email" name="reply_to" placeholder="Your Email" />
            {errors.reply_to && (
              <span className="error-text">{errors.reply_to}</span>
            )}
          </div>
        </div>

        <div className={`form-group ${errors.subject ? "error-glow" : ""}`}>
          <input type="text" name="subject" placeholder="Subject" />
          {errors.subject && (
            <span className="error-text">{errors.subject}</span>
          )}
        </div>

        <div className={`form-group ${errors.message ? "error-glow" : ""}`}>
          <textarea name="message" placeholder="Your Message"></textarea>
          {errors.message && (
            <span className="error-text">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={`submit-btn ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status.message && (
          <p className={`status-message ${status.type}`}>{status.message}</p>
        )}
      </form>

      {/* 📧 Direct Email Option */}
      <div className="contact-footer" role="contentinfo">
        <p>
          email me directly at{" "}
          <a
            href="mailto:businessdash01@gmail.com?subject=Portfolio Inquiry&body=Hi Alex, I’d like to..."
            className="direct-email-link"
          >
            businessdash01@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
