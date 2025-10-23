// netlify/functions/sendEmail.js
// ✅ Secure EmailJS serverless function (Node.js)
// - Uses PRIVATE_KEY from Netlify environment variables
// - Keeps credentials hidden from frontend
// - Validates input before sending
// - Returns structured JSON responses

import fetch from "node-fetch";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { from_name, reply_to, subject, message } = data;

    // 🧩 Basic validation
    if (!from_name || !reply_to || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    // 🗝️ Load secure environment variables
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceID || !templateID || !privateKey) {
      console.error("Missing EmailJS environment variables.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server misconfiguration." }),
      };
    }

    // 📦 EmailJS API request (Server-to-Server)
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${privateKey}`, // Securely authorize
      },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: "private_key_mode", // not required in private key mode
        template_params: {
          from_name,
          reply_to,
          subject,
          message,
        },
      }),
    });

    const result = await response.text();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, result }),
      };
    } else {
      console.error("EmailJS error:", result);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: result }),
      };
    }
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
