// netlify/functions/sendEmail.js
// ✅ Ready-to-deploy Netlify serverless function for EmailJS
// - Improved error handling
// - Environment variables securely loaded
// - Returns JSON responses for frontend consumption

import fetch from 'node-fetch';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' }),
    };
  }

  try {
    const { from_name, reply_to, subject, message } = JSON.parse(event.body);

    if (!from_name || !reply_to || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields.' }),
      };
    }

    // ✅ Environment variables - set these in Netlify dashboard (Settings > Environment)
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS credentials are missing in environment variables.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error.' }),
      };
    }

    // Send email via EmailJS REST API
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: { from_name, reply_to, subject, message },
      }),
    });

    if (!emailResponse.ok) {
      const text = await emailResponse.text();
      console.error('EmailJS API error:', text);
      return {
        statusCode: emailResponse.status,
        body: JSON.stringify({ error: 'EmailJS API error', details: text }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully.' }),
    };
  } catch (err) {
    console.error('Email send failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message.', details: err.message }),
    };
  }
}
