import { NextRequest, NextResponse } from "next/server";
import "server-only";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    // Verify environment variables are set
    if (!RETELL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error. API key not configured." },
        { status: 500 }
      );
    }

    const { agentId } = await req.json();
    
    if (!agentId) {
      return NextResponse.json(
        { error: "Agent ID is required" },
        { status: 400 }
      );
    }

    /* Create the web call directly without phone number update */
    console.log("Creating web call with agent ID:", agentId);
    console.log("Using API key:", RETELL_API_KEY?.substring(0, 10) + "...");
    
    const callRes = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!callRes.ok) {
      const txt = await callRes.text();
      console.error("Retell API error:", txt);
      console.error("Status:", callRes.status);
      console.error("Headers:", callRes.headers);
      
      // Try to parse error as JSON if possible
      try {
        const errorData = JSON.parse(txt);
        return NextResponse.json(
          { error: errorData.message || `Failed to create web call: ${txt}` },
          { status: callRes.status }
        );
      } catch {
        return NextResponse.json(
          { error: `Failed to create web call: ${txt}` },
          { status: callRes.status }
        );
      }
    }

    const data = await callRes.json(); // { call_id, access_token, expires_at }
    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    console.error("Error creating web call:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
