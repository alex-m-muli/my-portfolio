// /netlify/functions/sendEmail.js
// ✅ Final Production-Safe EmailJS Netlify Function (Node 18+)
// - Compatible with your Contact.jsx form
// - Uses correct /email/send endpoint with proper key handling
// - Automatic retry (exponential backoff)
// - Clean, minimal logs for Netlify; sanitized responses for frontend

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
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

    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

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

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      template_params: { from_name, reply_to, subject, message },
    };

    if (isStrict) {
      payload.accessToken = PRIVATE_KEY;
    } else {
      payload.user_id = PUBLIC_KEY;
    }

    console.log("📤 Sending email via EmailJS:", {
      endpoint: EMAILJS_SEND_URL,
      keyType,
      params: { from_name, reply_to, subject },
    });

    const MAX_RETRIES = 3;
    const BASE_DELAY_MS = 1000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(EMAILJS_SEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await res.text();

        if (res.ok) {
          console.log(`✅ Email sent successfully (attempt ${attempt}).`);
          return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Message sent successfully." }),
          };
        }

        console.error(`❌ EmailJS API Error (Attempt ${attempt}):`, {
          status: res.status,
          response: text,
        });

        if (res.status >= 500 && attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`⏳ Server error, retrying in ${backoff}ms...`);
          await delay(backoff);
          continue;
        }

        return {
          statusCode: 502,
          body: JSON.stringify({
            error: "Email service rejected the request. Check configuration and try again.",
          }),
        };
      } catch (err) {
        console.error(`💥 Network/Unexpected error (Attempt ${attempt}):`, err);
        if (attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          console.log(`⏳ Network error, retrying in ${backoff}ms...`);
          await delay(backoff);
        } else {
          console.error("❌ Email failed after retries:", err);
          return {
            statusCode: 502,
            body: JSON.stringify({
              error: "Email service temporarily unavailable. Please try again later.",
            }),
          };
        }
      }
    }
  } catch (err) {
    console.error("💥 Unexpected server error in sendEmail function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error. Please try again later." }),
    };
  }
}
