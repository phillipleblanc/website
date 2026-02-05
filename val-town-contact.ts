// Val Town HTTP endpoint for contact form
// Deploy this at: https://val.town/new
// Name it: phillipleblanc-contact

import { email } from "https://esm.town/v/std/email";

export default async function(req: Request): Promise<Response> {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return Response.json(
      { success: false, error: "Method not allowed" },
      { 
        status: 405,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }

  try {
    const body = await req.json();
    const { name, email: senderEmail, message } = body;

    // Validate required fields
    if (!name || !senderEmail || !message) {
      return Response.json(
        { success: false, error: "Missing required fields: name, email, message" },
        { 
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      return Response.json(
        { success: false, error: "Invalid email format" },
        { 
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        }
      );
    }

    // Validate lengths
    if (name.length > 100 || message.length > 5000) {
      return Response.json(
        { success: false, error: "Name or message too long" },
        { 
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" }
        }
      );
    }

    // Send email via Val Town's email function
    await email({
      subject: `[Website Contact] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
      replyTo: senderEmail,
    });

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { success: false, error: "Failed to send message" },
      { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }
}
