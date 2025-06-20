import { NextRequest, NextResponse } from "next/server";
import "server-only";

/** **** CONFIG ****** */
const GLOBAL_PHONE_NUMBER = "+14846239963"; // ← your one Twilio # (E.164)
const RETELL_API_KEY = "key_fd0f77f7a3ba5285a6a73d943124";
const PHONE_NICKNAME = "Frontdesk Number"; // optional label

/* -------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    const { agentId, agentVersion = 1 } = await req.json();

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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
