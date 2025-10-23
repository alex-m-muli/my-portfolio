// /netlify/functions/sendEmail.js
// ✅ Final Production-Safe EmailJS Netlify Function (Node 18+)
// - Uses correct /email/send endpoint for both public and private keys
// - For strict/private mode: sends private key as `accessToken` in payload
// - Retry-safe (exponential backoff) for transient errors
// - Detailed logs only in Netlify console; frontend receives sanitized messages

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";

/**
 * Helper: Delay for `ms` milliseconds.
 * @param {number} ms
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function handler(event) {
  // Only POST allowed
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    // Parse body safely
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseErr) {
      console.error("❌ Invalid JSON payload:", event.body);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request format." }),
      };
    }

    const { from_name, reply_to, subject, message } = body;

    // Basic validation
    if (!from_name || !reply_to || !subject || !message) {
      console.warn("⚠️ Missing required fields:", {
        from_name: !!from_name,
        reply_to: !!reply_to,
        subject: !!subject,
        message: !!message,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    // Load env vars
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;    // frontend/public key
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;  // backend/private key (strict mode)

    // At least one key must be present; prefer private key when available
    if (!SERVICE_ID || !TEMPLATE_ID || (!PUBLIC_KEY && !PRIVATE_KEY)) {
      console.error("❌ EmailJS env misconfiguration:", {
        SERVICE_ID: !!SERVICE_ID,
        TEMPLATE_ID: !!TEMPLATE_ID,
        PUBLIC_KEY: !!PUBLIC_KEY,
        PRIVATE_KEY: !!PRIVATE_KEY,
      });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error." }),
      };
    }

    const isStrict = !!PRIVATE_KEY;
    const keyType = isStrict ? "PRIVATE" : "PUBLIC";

    // Build payload for EmailJS /send endpoint
    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      template_params: { from_name, reply_to, subject, message },
    };

    // user_id is required when using public key (frontend-style)
    if (!isStrict) {
      payload.user_id = PUBLIC_KEY;
    } else {
      // For strict/private mode, EmailJS docs accept `accessToken` in payload
      // (private key), do NOT place the private key in logs or as user_id.
      payload.accessToken = PRIVATE_KEY;
    }

    // Safe console log (no secret values)
    console.log("📤 Sending email via EmailJS:", {
      endpoint: EMAILJS_SEND_URL,
      keyType,
      params: { from_name, reply_to, subject },
    });

    // Retry policy
    const MAX_RETRIES = 3;      // total attempts
    const BASE_DELAY_MS = 1000; // 1s base

    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const res = await fetch(EMAILJS_SEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await res.text();

        if (res.ok) {
          // Success — write minimal success log
          console.log(`✅ EmailJS sent (attempt ${attempt}).`);
          return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Message sent successfully." }),
          };
        }

        // Log full error detail for debugging (only to Netlify logs)
        console.error(`❌ EmailJS API Error (Attempt ${attempt}):`, {
          status: res.status,
          response: text,
        });

        // Retry only for transient server-side issues (5xx)
        if (res.status >= 500 && attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`⏳ Transient error, retrying in ${backoff}ms...`);
          await delay(backoff);
          continue;
        }

        // For 4xx (bad request / auth), do not retry — return sanitized error
        return {
          statusCode: 502,
          body: JSON.stringify({
            error: "Email service rejected the request. Please check configuration and try again.",
          }),
        };
      } catch (networkErr) {
        // Network/unexpected error — retry if attempts remain
        console.error(`💥 Network/Unexpected error (Attempt ${attempt}):`, networkErr);
        if (attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`⏳ Network error, retrying in ${backoff}ms...`);
          await delay(backoff);
          continue;
        }

        // Final failure after retries
        console.error("❌ Email failed after retries:", networkErr);
        return {
          statusCode: 502,
          body: JSON.stringify({
            error: "Email service temporarily unavailable. Please try again later.",
          }),
        };
      }
    }

    // Fallback (shouldn't reach)
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Email service temporarily unavailable. Please try again later.",
      }),
    };
  } catch (err) {
    // Unexpected server-side error
    console.error("💥 Unexpected server error in sendEmail function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error. Please try again later." }),
    };
  }
}
