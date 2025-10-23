// ✅ Strict-Mode Safe EmailJS Netlify Function (Node 18+)
// - Secure: never leaks backend errors
// - Supports both public (normal) and private (strict) EmailJS keys
// - Automatically detects mode and formats payload accordingly
// - Includes retry logic with exponential backoff

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_PRIVATE_URL = "https://api.emailjs.com/api/v1.0/email/send-private";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed. Use POST." }) };
  }

  try {
    // 🔍 Parse JSON
    let data;
    try {
      data = JSON.parse(event.body);
    } catch {
      console.error("❌ Invalid JSON payload:", event.body);
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid request format." }) };
    }

    const { from_name, reply_to, subject, message } = data;
    if (!from_name || !reply_to || !subject || !message) {
      console.warn("⚠️ Missing fields:", data);
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields." }) };
    }

    // 🔐 Load environment variables
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || (!PUBLIC_KEY && !PRIVATE_KEY)) {
      console.error("❌ Missing required EmailJS env vars");
      return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error." }) };
    }

    const isStrict = !!PRIVATE_KEY;
    const API_URL = isStrict ? EMAILJS_PRIVATE_URL : EMAILJS_URL;

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      template_params: { from_name, reply_to, subject, message },
    };

    // 📦 Add user_id only in public mode
    if (!isStrict) payload.user_id = PUBLIC_KEY;

    console.log("📤 Sending email via EmailJS:", {
      endpoint: API_URL,
      keyType: isStrict ? "PRIVATE" : "PUBLIC",
      params: { from_name, reply_to, subject },
    });

    // 🚀 Retry logic
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isStrict ? { Authorization: `Bearer ${PRIVATE_KEY}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const text = await res.text();

        if (!res.ok) {
          console.error(`❌ EmailJS API Error (Attempt ${attempt}):`, {
            status: res.status,
            response: text,
          });

          if (res.status >= 500 && attempt < MAX_RETRIES) {
            const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
            console.log(`⏳ Retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
            continue;
          }

          throw new Error(`EmailJS error: ${res.status}`);
        }

        console.log("✅ Email successfully sent:", text);
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, message: "Message sent successfully." }),
        };
      } catch (err) {
        console.error(`💥 Attempt ${attempt} failed:`, err.message);
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
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error." }) };
  }
}
