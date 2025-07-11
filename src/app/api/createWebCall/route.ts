import { NextRequest, NextResponse } from "next/server";
import "server-only";

const GLOBAL_PHONE_NUMBER = process.env.GLOBAL_PHONE_NUMBER;
const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    // Verify environment variables are set
    if (!GLOBAL_PHONE_NUMBER || !RETELL_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
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

    /* STEP 1 ─ Update the phone record so it routes to this agent */
    const patchRes = await fetch(
      `https://api.retellai.com/update-phone-number/${GLOBAL_PHONE_NUMBER}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inbound_agent_id: agentId,
          outbound_agent_id: agentId,
          // nickname: PHONE_NICKNAME,
        }),
      }
    );

    if (!patchRes.ok) {
      const txt = await patchRes.text();
      return NextResponse.json(
        { error: `Phone-update failed: ${txt}` },
        { status: patchRes.status }
      );
    }

    /* STEP 2 ─ Create the web call */
    const callRes = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        // agent_version: agentVersion,
      }),
    });

    if (!callRes.ok) {
      const txt = await callRes.text();
      return NextResponse.json(
        { error: `create-web-call failed: ${txt}` },
        { status: callRes.status }
      );
    }

    const data = await callRes.json(); // { call_id, access_token, expires_at }
    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
