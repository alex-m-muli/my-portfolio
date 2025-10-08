// netlify/functions/sendEmail.js
import fetch from "node-fetch";

/**
 * Netlify Function: Secure EmailJS relay
 * ------------------------------------------------------------
 * This function runs on Netlify's server, so your credentials
 * are never exposed to the frontend or browser.
 *
 * Expects JSON body:
 *   { from_name, reply_to, subject, message }
 */

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { from_name, reply_to, subject, message } = JSON.parse(event.body);

    if (!from_name || !reply_to || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // ✅ Load environment variables from Netlify dashboard
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS credentials missing on server.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    // Send request directly to EmailJS REST API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: { from_name, reply_to, subject, message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("EmailJS API error:", text);
      throw new Error(text);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message!" }),
    };
  } catch (err) {
    console.error("Email send failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message." }),
    };
  }
}
