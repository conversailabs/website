import { NextRequest, NextResponse } from "next/server";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    // Verify environment variables are set
    if (!RETELL_API_KEY) {
      console.error("[createWebCall] RETELL_API_KEY is not configured in environment variables");
      return NextResponse.json(
        { error: "Server configuration error. API key not configured. Please contact support." },
        { status: 500 }
      );
    }

    const { agentId, metadata } = await req.json();

    if (!agentId) {
      console.error("[createWebCall] No agent ID provided in request");
      return NextResponse.json(
        { error: "Agent ID is required" },
        { status: 400 }
      );
    }

    /* Create the web call directly without phone number update */
    console.log("[createWebCall] Creating web call with agent ID:", agentId);
    console.log("[createWebCall] Metadata:", metadata);
    console.log("[createWebCall] API key present:", RETELL_API_KEY ? "YES" : "NO");
    console.log("[createWebCall] API key prefix:", RETELL_API_KEY?.substring(0, 10) + "...");

    const callRes = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: metadata,
      }),
    });

    console.log("[createWebCall] Retell API response status:", callRes.status);

    if (!callRes.ok) {
      const txt = await callRes.text();
      console.error("[createWebCall] Retell API error response:", txt);
      console.error("[createWebCall] Status:", callRes.status);
      console.error("[createWebCall] Status Text:", callRes.statusText);

      // Try to parse error as JSON if possible
      try {
        const errorData = JSON.parse(txt);
        const errorMsg = errorData.message || errorData.error || `Retell API error: ${txt}`;
        console.error("[createWebCall] Parsed error:", errorMsg);
        return NextResponse.json(
          {
            error: errorMsg,
            details: `Status ${callRes.status}: ${callRes.statusText}`
          },
          { status: callRes.status }
        );
      } catch (parseError) {
        console.error("[createWebCall] Failed to parse error response:", parseError);
        return NextResponse.json(
          {
            error: `Failed to create web call: ${txt || callRes.statusText}`,
            details: `Status ${callRes.status}`
          },
          { status: callRes.status }
        );
      }
    }

    const data = await callRes.json(); // { call_id, access_token, expires_at }
    console.log("[createWebCall] Successfully created web call:", data.call_id);
    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[createWebCall] Unexpected error:", message);
    console.error("[createWebCall] Stack trace:", stack);
    return NextResponse.json({
      error: message,
      details: "An unexpected error occurred. Check server logs for details."
    }, { status: 500 });
  }
}
