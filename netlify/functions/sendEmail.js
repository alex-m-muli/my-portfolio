// ✅ Enhanced EmailJS Netlify Function (Node 18+)
// - Secure: hides real errors from users
// - Logs full debug info to Netlify console only
// - Works with either PUBLIC or PRIVATE EmailJS keys
// - Properly validates payload and environment

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    // 🔍 Parse body safely
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

    // ✅ Basic validation
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
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY; // optional if you use private key

    const API_KEY = PRIVATE_KEY || PUBLIC_KEY;

    // 🧩 Sanity check
    if (!SERVICE_ID || !TEMPLATE_ID || !API_KEY) {
      console.error("❌ Missing one or more EmailJS environment variables.", {
        SERVICE_ID: !!SERVICE_ID,
        TEMPLATE_ID: !!TEMPLATE_ID,
        KEY_TYPE: PRIVATE_KEY ? "PRIVATE" : PUBLIC_KEY ? "PUBLIC" : "MISSING",
      });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error." }),
      };
    }

    // 📨 Send request to EmailJS API
    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: API_KEY,
      template_params: { from_name, reply_to, subject, message },
    };

    console.log("📤 Sending email via EmailJS:", {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      keyType: PRIVATE_KEY ? "PRIVATE" : "PUBLIC",
      params: { from_name, reply_to, subject },
    });

    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await emailResponse.text();

    if (!emailResponse.ok) {
      console.error("❌ EmailJS API Error:", {
        status: emailResponse.status,
        response: text,
      });
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "Email service temporarily unavailable. Try again later.",
        }),
      };
    }

    console.log("✅ Email successfully sent:", text);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message sent successfully." }),
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
