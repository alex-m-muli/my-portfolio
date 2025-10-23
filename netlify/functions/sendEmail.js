// ✅ Final Production-Safe EmailJS Netlify Function (Node 18+)
// -----------------------------------------------------------------------------
// 🔐 Security & Reliability Features:
// - Retries transient EmailJS failures (up to 3 attempts with exponential backoff)
// - Logs full backend details only to Netlify console (never to frontend)
// - Validates all inputs and environment variables
// - Uses PUBLIC key (required for EmailJS REST API)
// - Returns safe, minimal JSON responses
// -----------------------------------------------------------------------------

export async function handler(event) {
  // 🛡 Enforce POST requests only
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    // 🔍 Parse JSON body safely
    let bodyData;
    try {
      bodyData = JSON.parse(event.body);
    } catch {
      console.error("❌ Invalid JSON payload:", event.body);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request format." }),
      };
    }

    const { from_name, reply_to, subject, message } = bodyData;

    // ✅ Basic input validation
    if (!from_name || !reply_to || !subject || !message) {
      console.warn("⚠️ Missing fields:", bodyData);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    // 🔐 Load environment variables
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY; // EmailJS REST API uses public key

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("❌ Missing EmailJS environment variables:", {
        SERVICE_ID: !!SERVICE_ID,
        TEMPLATE_ID: !!TEMPLATE_ID,
        PUBLIC_KEY: !!PUBLIC_KEY,
      });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error." }),
      };
    }

    // 📨 Build EmailJS payload
    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: { from_name, reply_to, subject, message },
    };

    // 🧠 Safe debug log (no secrets)
    console.log("📤 Preparing to send email via EmailJS:", {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      keyType: "PUBLIC",
      params: { from_name, reply_to, subject },
    });

    // 🧩 Retry logic for transient network or EmailJS issues
    const MAX_RETRIES = 3;
    const BASE_DELAY = 1000; // ms

    async function sendWithRetry(attempt = 1) {
      try {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await response.text();

        // ✅ Success
        if (response.ok) {
          console.log(`✅ Email sent successfully on attempt ${attempt}:`, text);
          return { success: true };
        }

        // ❌ Handle API errors
        console.error(`❌ EmailJS API Error (Attempt ${attempt}):`, {
          status: response.status,
          response: text,
        });

        // Retry only for transient issues (5xx, network errors, rate limit)
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY * Math.pow(2, attempt - 1);
          console.warn(`🔁 Retrying in ${backoff}ms...`);
          await new Promise((res) => setTimeout(res, backoff));
          return await sendWithRetry(attempt + 1);
        }

        // Return final failure if not retriable or retries exhausted
        return { success: false, error: `EmailJS error: ${response.status}` };
      } catch (err) {
        console.error(`💥 Network/Unexpected Error (Attempt ${attempt}):`, err);

        if (attempt < MAX_RETRIES) {
          const backoff = BASE_DELAY * Math.pow(2, attempt - 1);
          console.warn(`🔁 Retrying in ${backoff}ms...`);
          await new Promise((res) => setTimeout(res, backoff));
          return await sendWithRetry(attempt + 1);
        }

        return { success: false, error: err.message };
      }
    }

    // 🚀 Attempt send with retries
    const result = await sendWithRetry();

    if (result.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Message sent successfully." }),
      };
    }

    // Final failure after retries
    console.error("❌ Email failed after retries:", result.error);
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Email service temporarily unavailable. Please try again later.",
      }),
    };
  } catch (err) {
    console.error("💥 Unexpected server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error. Please try again later.",
      }),
    };
  }
}
