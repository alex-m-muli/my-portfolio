// ✅ Final Retry-Safe EmailJS Netlify Function (Node 18+)
// - Secure: hides real errors from frontend
// - Logs full debug info to Netlify console only
// - Uses PRIVATE key when available (required if strict mode enabled)
// - Includes retry logic with exponential backoff

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    // 🔍 Parse JSON safely
    let bodyData;
    try {
      bodyData = JSON.parse(event.body);
    } catch {
      console.error("❌ Invalid JSON payload:", event.body);
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid request format." }) };
    }

    const { from_name, reply_to, subject, message } = bodyData;

    if (!from_name || !reply_to || !subject || !message) {
      console.warn("⚠️ Missing fields:", bodyData);
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields." }) };
    }

    // 🔐 Load environment variables
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    // Prefer private key if available (strict mode)
    const API_KEY = PRIVATE_KEY || PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !API_KEY) {
      console.error("❌ Missing EmailJS env vars:", {
        SERVICE_ID: !!SERVICE_ID,
        TEMPLATE_ID: !!TEMPLATE_ID,
        KEY_TYPE: PRIVATE_KEY ? "PRIVATE" : PUBLIC_KEY ? "PUBLIC" : "NONE",
      });
      return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error." }) };
    }

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: API_KEY,
      template_params: { from_name, reply_to, subject, message },
    };

    console.log("📤 Preparing to send email via EmailJS:", {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      keyType: PRIVATE_KEY ? "PRIVATE" : "PUBLIC",
      params: { from_name, reply_to, subject },
    });

    // Retry-safe email send function
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // start with 1s
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const response = await fetch(EMAILJS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await response.text();

        if (!response.ok) {
          console.error(`❌ EmailJS API Error (Attempt ${attempt}):`, {
            status: response.status,
            response: text,
          });

          // Retry on server-side errors (5xx)
          if (response.status >= 500 && attempt < MAX_RETRIES) {
            const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
            console.log(`⏳ Retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
            continue;
          }

          // Stop retrying for 4xx errors (like your 403)
          throw new Error(`EmailJS error: ${response.status}`);
        }

        console.log("✅ Email successfully sent:", text);
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, message: "Message sent successfully." }),
        };
      } catch (err) {
        console.error(`💥 Attempt ${attempt} failed:`, err);
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise((r) => setTimeout(r, delay));
        } else {
          console.error("❌ Email failed after retries:", err.message);
        }
      }
    }

    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Email service temporarily unavailable. Please try again later." }),
    };
  } catch (err) {
    console.error("💥 Unexpected server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error. Please try again later." }),
    };
  }
}
