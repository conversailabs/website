# 🎙️ Retell AI Voice Integration - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Configuration](#configuration)
4. [Agent Setup](#agent-setup)
5. [Code Implementation](#code-implementation)
6. [Testing Guide](#testing-guide)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)

---

## Overview

This document covers the complete Retell AI voice integration across the ConversAI Labs website, enabling industry-specific AI voice agents on dedicated pages.

### Features Implemented
- ✅ Voice calls with industry-specific AI agents
- ✅ Email capture before agent interaction
- ✅ Real-time call state management (connecting, active, ended)
- ✅ Visual feedback with animated orb interactions
- ✅ 4 industry-specific agents fully configured
- ✅ Demo page with all agents available

### Technology Stack
- **Retell AI SDK**: `retell-client-js-sdk`
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **API**: RESTful endpoint for web call creation

---

## Architecture

### System Flow

```
User clicks "TAP TO TALK"
         ↓
Check localStorage for email
         ↓
    ┌────┴────┐
    │         │
 Found    Not Found
    │         │
    │    Show Email Dialog
    │         │
    └────┬────┘
         ↓
Fetch access token from /api/createWebCall
         ↓
Initialize RetellWebClient
         ↓
Start voice call with agent
         ↓
User conversation with AI agent
         ↓
Call ends (user clicks "End Call" or timeout)
```

### File Structure

```
website/
├── .env.local                          # API key configuration
├── src/
│   ├── app/
│   │   └── api/
│   │       └── createWebCall/
│   │           └── route.ts            # Backend API endpoint
│   ├── components/
│   │   ├── sections/
│   │   │   └── HeroSection.tsx        # Industry page voice integration
│   │   └── demos/
│   │       └── AgentDetailsExplorer.tsx # Demo page voice integration
│   └── data/
│       └── usecases1.json              # Agent metadata and configuration
├── doc/
│   └── MK_FINSERVE_AGENT_PROMPT.md    # Finance agent prompt
├── ADMISSION_COUNSELLOR_AGENT_PROMPT.md    # Education agent prompt
├── 2LET_PROPERTY_AGENT_PROMPT.md           # Real Estate agent prompt
└── HEALTH_CLINIC_RECEPTIONIST_AGENT_PROMPT.md # Healthcare agent prompt
```

---

## Configuration

### Environment Variables

**File**: `.env.local` (root directory)

```env
# Retell AI Configuration
RETELL_API_KEY=key_b3d2671c06f85c6c0e8b0f0b33f5

# Global Phone Number (optional - for voice calls)
GLOBAL_PHONE_NUMBER=+1234567890
```

**Important Notes:**
- API key is server-only (never exposed to client)
- Must restart dev server after changing `.env.local`
- For production: Add to Vercel environment variables

### Agent Configuration

**File**: `src/data/usecases1.json`

Each agent entry contains:
- `name`: Display name of the agent
- `agentId`: Retell AI agent identifier
- `category`: Industry category
- `role`: Agent's specific role
- `description`: What the agent does
- `functionality`: Primary functions and capabilities
- `use_cases`: Specific scenarios the agent handles
- `sample_conversation`: Example dialog flow

---

## Agent Setup

### 1. Finance - EMI Payment Assistant

**Agent ID**: `agent_38efe8dc909c95c045d6827754`

**Name**: Priya - EMI Payment Assistant

**Company**: Prosper Financial Services

**Role**: Loan Servicing & Collections (Helpful tone, NOT aggressive)

**Prompt File**: `doc/MK_FINSERVE_AGENT_PROMPT.md`

**Key Features**:
- EMI payment assistance
- Payment date tracking
- Partial payment options
- Payment confirmation
- Escalation handling

**Industry Page**: `/industries/finance-and-legal`

**Tone**: Helpful, supportive, professional (not collection-style)

---

### 2. Education - Admission Counsellor

**Agent ID**: `agent_8132d8f06109249fdec5bdd917`

**Name**: AdmitBot - Admission Counsellor

**Institution**: Horizon College of Arts and Science

**Role**: College Admissions Verification

**Prompt File**: `ADMISSION_COUNSELLOR_AGENT_PROMPT.md`

**Key Features**:
- Admission inquiry verification
- Document submission tracking
- Visit scheduling
- Follow-up reminders
- Multi-language support (English primary)

**Industry Page**: `/industries/education`

**Tone**: Friendly, informative, encouraging

**Important Rules**:
- Does NOT use student's name during conversation
- Changed "calling from" to "from" (remove outbound call tone)
- All "school" references changed to "college"

---

### 3. Real Estate - Property Rental Assistant

**Agent ID**: `agent_df19e049ff7975f2559836d74e`

**Name**: Amelia - Property Rental Assistant

**Company**: Urban Living Properties

**Role**: Property Rentals & Lead Qualification

**Prompt File**: `2LET_PROPERTY_AGENT_PROMPT.md`

**Key Features**:
- Area interest qualification
- Property type preferences
- Budget range assessment
- Viewing appointment scheduling
- Property matching

**Industry Page**: `/industries/real-estate-and-housing`

**Tone**: Warm, professional, helpful

**Important Changes**:
- Removed specific UK location references (Burnley, Padiham, Nelson)
- Changed "regarding your recent rental inquiry" to "here to help you with"
- Generic placeholder contact details

---

### 4. Healthcare - Health Clinic Receptionist

**Agent ID**: `agent_f7664b8912fa2a5c8106f20668`

**Name**: Sarah - Health Clinic Receptionist

**Clinic**: Empower Clinic

**Role**: Health Clinic Reception & Appointment Booking

**Prompt File**: `HEALTH_CLINIC_RECEPTIONIST_AGENT_PROMPT.md`

**Key Features**:
- Appointment booking
- Patient information collection
- Emergency triage (redirects to 911 for life-threatening)
- Insurance verification
- Callback scheduling

**Industry Page**: `/industries/healthcare-and-wellness`

**Tone**: Caring, professional, calm

**Important Features**:
- Generic health clinic (not dental-specific)
- Emergency triage protocol included
- HIPAA-aware conversation flow

---

## Code Implementation

### Industry-to-Agent Mapping

**File**: `src/components/sections/HeroSection.tsx` (lines 22-28)

```typescript
// Industry to Agent ID mapping
const industryAgentMap: Record<string, string> = {
  'Education': 'agent_8132d8f06109249fdec5bdd917',
  'Healthcare & Wellness': 'agent_f7664b8912fa2a5c8106f20668',
  'Real Estate & Housing': 'agent_df19e049ff7975f2559836d74e',
  'Finance & Legal': 'agent_38efe8dc909c95c045d6827754',
};
```

**Purpose**: Maps industry name to Retell agent ID for automatic agent selection

---

### State Management

**File**: `src/components/sections/HeroSection.tsx` (lines 108-112)

```typescript
// Retell AI state
const [isCallActive, setIsCallActive] = useState(false);
const [isConnecting, setIsConnecting] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retellClientRef = useRef<any>(null);
```

**States**:
- `isCallActive`: True when voice call is in progress
- `isConnecting`: True while establishing connection
- `retellClientRef`: Reference to RetellWebClient instance

---

### Start Call Function

**File**: `src/components/sections/HeroSection.tsx` (lines 131-202)

```typescript
const startRetellCall = async () => {
  const agentId = industryAgentMap[industry];

  if (!agentId) {
    console.error(`No agent ID found for industry: ${industry}`);
    return;
  }

  try {
    setIsConnecting(true);
    console.log(`Starting call with agent: ${agentId}`);

    // Call API to create web call
    const response = await fetch("/api/createWebCall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create web call");
    }

    const { access_token } = await response.json();
    console.log("Access token received");

    // Dynamically import Retell SDK
    const { RetellWebClient } = await import("retell-client-js-sdk");
    const retell = new RetellWebClient();
    retellClientRef.current = retell;

    // Register event listeners
    retell.on("call_started", () => {
      console.log("Call started");
      setIsCallActive(true);
      setIsConnecting(false);
      setIsInteracting(true);
    });

    retell.on("agent_start_talking", () => {
      console.log("Agent started talking");
    });

    retell.on("agent_stop_talking", () => {
      console.log("Agent stopped talking");
    });

    retell.on("call_ended", () => {
      console.log("Call ended");
      setIsCallActive(false);
      setIsConnecting(false);
      setIsInteracting(false);
    });

    retell.on("error", (error) => {
      console.error("Retell error:", error);
      setIsCallActive(false);
      setIsConnecting(false);
      setIsInteracting(false);
    });

    // Start the call
    await retell.startCall({ accessToken: access_token });
  } catch (error) {
    console.error("Error starting call:", error);
    setIsConnecting(false);
    setIsInteracting(false);
  }
};
```

**Flow**:
1. Get agent ID based on industry
2. Fetch access token from backend API
3. Dynamically import Retell SDK (reduces initial bundle size)
4. Create RetellWebClient instance
5. Register event listeners for call lifecycle
6. Start the call with access token

---

### Stop Call Function

**File**: `src/components/sections/HeroSection.tsx` (lines 204-210)

```typescript
const stopRetellCall = () => {
  if (retellClientRef.current) {
    console.log("Stopping call");
    retellClientRef.current.stopCall();
    retellClientRef.current = null;
  }
};
```

**Purpose**: Cleanly ends active call and resets client reference

---

### Click Handler

**File**: `src/components/sections/HeroSection.tsx` (lines 212-240)

```typescript
const handleTryAgentClick = () => {
  console.log("Try Agent clicked!");

  // If call is active, stop it
  if (isCallActive) {
    stopRetellCall();
    return;
  }

  // Check if email exists in localStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('savedEmails');
    const emails = saved ? JSON.parse(saved) : [];
    console.log("Saved emails:", emails);
    if (emails.length > 0) {
      // Email exists, start call
      console.log("Email exists, starting call");
      startRetellCall();
    } else {
      // No email, show dialog
      console.log("No email, showing dialog");
      setShowEmailDialog(true);
      setEmail("");
      setEmailError("");
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }
};
```

**Logic**:
- If call is active → stop it
- If email exists in localStorage → start call immediately
- If no email → show email capture dialog

---

### Email Submit Handler

**File**: `src/components/sections/HeroSection.tsx` (lines 242-261)

```typescript
const handleEmailSubmit = () => {
  if (!email) {
    setEmailError("Please enter your email address");
    return;
  }
  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  if (!savedEmails.includes(email)) {
    const updatedEmails = [email, ...savedEmails].slice(0, 10);
    setSavedEmails(updatedEmails);
    localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
  }

  setEmailError("");
  setShowEmailDialog(false);
  startRetellCall();
};
```

**Features**:
- Email validation
- Saves up to 10 emails in localStorage
- Email suggestions on subsequent visits
- Starts call immediately after submission

---

### UI State Display

**File**: `src/components/sections/HeroSection.tsx` (lines 350-354)

```typescript
<span className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase drop-shadow-lg">
  {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Tap to talk'}
</span>
```

**States Shown**:
- "Connecting..." → While establishing connection
- "End Call" → During active call
- "Tap to talk" → Ready to start

---

### Visual Feedback

**File**: `src/components/sections/HeroSection.tsx` (lines 356-364)

```typescript
{(isInteracting || isCallActive) && (
  <>
    <div className="absolute inset-0 rounded-full border-2 border-cyan-300/70 animate-ping" />
    <div
      className="absolute -inset-4 rounded-full border border-cyan-300/50 animate-ping"
      style={{ animationDelay: "300ms" }}
    />
  </>
)}
```

**Effect**: Pulsing cyan rings around orb during call

---

### Backend API Endpoint

**File**: `src/app/api/createWebCall/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { agentId } = await req.json();

    if (!agentId) {
      return NextResponse.json(
        { error: "Agent ID is required" },
        { status: 400 }
      );
    }

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
      const errorData = await callRes.json();
      return NextResponse.json(
        { error: errorData },
        { status: callRes.status }
      );
    }

    const callData = await callRes.json();
    return NextResponse.json(callData);
  } catch (error) {
    console.error("Error creating web call:", error);
    return NextResponse.json(
      { error: "Failed to create web call" },
      { status: 500 }
    );
  }
}
```

**Purpose**:
- Server-side API route
- Securely calls Retell API with server-only API key
- Returns access token to client
- Never exposes API key to browser

---

## Testing Guide

### Local Testing

#### 1. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:3000`

#### 2. Test on Industry Pages

**Education Agent**:
```
http://localhost:3000/industries/education
```

**Healthcare Agent**:
```
http://localhost:3000/industries/healthcare-and-wellness
```

**Real Estate Agent**:
```
http://localhost:3000/industries/real-estate-and-housing
```

**Finance Agent**:
```
http://localhost:3000/industries/finance-and-legal
```

#### 3. Test on Demo Page

```
http://localhost:3000/demo
```

All 4 agents available as cards with "Talk to Agent" buttons

---

### Testing Checklist

**First Time User (No Email Saved)**:
- [ ] Click "TAP TO TALK" orb
- [ ] Email dialog appears
- [ ] Enter email address
- [ ] Suggestions appear on focus (if previously saved)
- [ ] Click "Continue"
- [ ] Orb shows "Connecting..."
- [ ] Orb changes to "End Call"
- [ ] Pulsing cyan rings appear
- [ ] Agent speaks and responds to voice
- [ ] Click "End Call" to stop
- [ ] Orb returns to "Tap to talk"

**Returning User (Email Saved)**:
- [ ] Click "TAP TO TALK" orb
- [ ] Call starts immediately (no dialog)
- [ ] Agent responds correctly

**All Agents**:
- [ ] Test each of the 4 industry pages
- [ ] Verify correct agent responds for each industry
- [ ] Verify agent follows prompt instructions
- [ ] Check conversation flow is natural

**Browser Console**:
- [ ] No errors in console
- [ ] Expected logs appear:
  - "Try Agent clicked!"
  - "Starting call with agent: agent_xxxxx"
  - "Access token received"
  - "Call started"
  - "Agent started talking"
  - "Call ended"

---

### Manual Testing on Retell Dashboard

**IMPORTANT**: Before testing on website, verify agents work on Retell dashboard

**Steps**:
1. Login to Retell AI: https://beta.retellai.com/dashboard
2. Go to "Agents" tab
3. For each agent:
   - Click "Test" button
   - Speak with agent
   - Verify it responds correctly
   - Check prompt is uploaded and correct
4. If agent doesn't work on Retell = Won't work on website

**Agent Status Check**:
- [ ] Finance agent: Active ✅
- [ ] Education agent: Active ✅
- [ ] Real Estate agent: Active ✅
- [ ] Healthcare agent: Active ✅

---

## Troubleshooting

### Issue: "API key not configured" error

**Cause**: `.env.local` missing or API key incorrect

**Solution**:
1. Check `.env.local` exists in root directory
2. Verify API key: `RETELL_API_KEY=key_b3d2671c06f85c6c0e8b0f0b33f5`
3. Restart dev server: `npm run dev`

---

### Issue: "Failed to create web call" error

**Cause**: Agent ID incorrect or API key invalid

**Solution**:
1. Check agent ID in `usecases1.json` matches Retell dashboard
2. Verify API key on Retell dashboard (Settings → API Keys)
3. Check network/firewall settings
4. Review browser console for specific error

---

### Issue: Agent not speaking

**Cause**: Prompt not uploaded to Retell dashboard

**Solution**:
1. Go to Retell dashboard: https://beta.retellai.com/dashboard
2. Find agent by ID
3. Copy ENTIRE prompt from markdown file
4. Paste into "System Prompt" field
5. Click "Save"
6. Test on Retell dashboard first
7. Then test on website

---

### Issue: Wrong agent responds

**Cause**: Industry name mapping incorrect

**Solution**:
1. Check industry name in page URL
2. Verify mapping in `HeroSection.tsx` (lines 22-28)
3. Industry name must match exactly:
   - "Education"
   - "Healthcare & Wellness"
   - "Real Estate & Housing"
   - "Finance & Legal"

---

### Issue: Email dialog doesn't close

**Cause**: Email validation failing

**Solution**:
1. Check email format is valid
2. Press Enter or click "Continue" button
3. Check browser console for errors
4. Clear localStorage and try again:
   ```javascript
   localStorage.removeItem('savedEmails')
   ```

---

### Issue: Orb stuck on "Connecting..."

**Cause**: API call failing or timeout

**Solution**:
1. Check browser console for errors
2. Verify `/api/createWebCall` is returning access token
3. Check Retell API status
4. Refresh page and try again

---

### Issue: Call starts but no audio

**Cause**: Microphone permission not granted

**Solution**:
1. Check browser microphone permissions
2. Click lock icon in address bar → Allow microphone
3. Refresh page and try again
4. Test microphone in browser settings

---

### Issue: TypeScript build errors

**Error**: `'isAgentSpeaking' is assigned a value but never used`

**Solution**: Variable removed (not needed for current implementation)

**Error**: `Unexpected any. Specify a different type.`

**Solution**: Added `eslint-disable-next-line` comment (line 111)

---

## Deployment

### Build for Production

**Before deploying**, always run build to check for errors:

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (40/40)
✓ Finalizing page optimization
```

If build fails:
- Review error messages
- Fix TypeScript/ESLint errors
- Re-run build until successful

---

### Vercel Deployment

#### 1. Environment Variables

In Vercel dashboard:
1. Go to project → Settings → Environment Variables
2. Add:
   - Key: `RETELL_API_KEY`
   - Value: `key_b3d2671c06f85c6c0e8b0f0b33f5`
   - Environment: Production, Preview, Development
3. Click "Save"

#### 2. Deploy

```bash
git add .
git commit -m "Add Retell voice integration"
git push origin main
```

Vercel auto-deploys from main branch.

#### 3. Verify Deployment

1. Check deployment status in Vercel dashboard
2. Visit production URL
3. Test all 4 industry pages
4. Verify agents respond correctly

---

### Production Testing Checklist

- [ ] All 4 industry pages load correctly
- [ ] Voice calls work on all pages
- [ ] Email capture works
- [ ] Agents respond with correct prompts
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Call quality is good
- [ ] End call works properly

---

## Maintenance

### Adding New Agents

**Steps**:
1. Create agent on Retell dashboard
2. Upload prompt from markdown file
3. Get agent ID
4. Add entry to `usecases1.json` in appropriate category
5. Update `industryAgentMap` in `HeroSection.tsx` if new industry
6. Test on demo page first
7. Create industry page if needed

**Template for usecases1.json**:
```json
"agent-key": {
  "name": "Agent Name",
  "agentId": "agent_xxxxxxxxxxxxxxxxxxxxx",
  "category": "Category Name",
  "role": "Agent Role",
  "description": "What the agent does",
  "functionality": {
    "primary_functions": [
      "Function 1",
      "Function 2"
    ]
  },
  "use_cases": [
    "Use case 1",
    "Use case 2"
  ],
  "sample_conversation": "Example dialog"
}
```

---

### Updating Agent Prompts

**Steps**:
1. Edit prompt in markdown file (e.g., `MK_FINSERVE_AGENT_PROMPT.md`)
2. Copy ENTIRE updated content
3. Go to Retell dashboard
4. Find agent
5. Paste into "System Prompt" field
6. Click "Save"
7. Test on Retell dashboard
8. Test on website

**Important**:
- Prompts are stored on Retell, not in website code
- Markdown files are documentation/reference only
- Must manually upload to Retell after editing

---

### Monitoring

**Key Metrics**:
- Call success rate
- Average call duration
- Errors in browser console
- API response times
- User email capture rate

**Retell Dashboard Analytics**:
- Go to https://beta.retellai.com/dashboard
- View call logs
- Check agent performance
- Review conversation transcripts

---

## Best Practices

### Email Collection
- ✅ Ask once, save in localStorage
- ✅ Show suggestions for returning users
- ✅ Validate format before submission
- ✅ Limit to 10 saved emails
- ❌ Don't ask every time

### Call Management
- ✅ Show clear visual feedback (connecting, active)
- ✅ Allow users to end call anytime
- ✅ Handle errors gracefully
- ✅ Reset state after call ends
- ❌ Don't leave calls hanging

### User Experience
- ✅ Provide immediate feedback on click
- ✅ Clear button text ("Connecting...", "End Call")
- ✅ Visual indicators (pulsing rings)
- ✅ Smooth animations
- ❌ Don't surprise users with auto-play

### Code Quality
- ✅ Type safety with TypeScript
- ✅ Error handling in all async functions
- ✅ Console logging for debugging
- ✅ Clean up resources (call instances)
- ❌ Don't expose API keys to client

---

## Support Resources

### Documentation
- **Retell AI Docs**: https://docs.retellai.com
- **Next.js Docs**: https://nextjs.org/docs
- **Project README**: `README.md`
- **Claude Instructions**: `CLAUDE.md`

### Dashboards
- **Retell AI Dashboard**: https://beta.retellai.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard

### Related Files
- `RETELL_INTEGRATION_COMPLETE.md` - Initial setup summary
- `IMPORTANT_MANUAL_STEPS.md` - Manual configuration guide
- `usecases1.json` - Agent configuration data

---

## Summary

### What's Integrated

✅ **4 Industry-Specific AI Voice Agents**:
1. Finance - EMI Payment Assistant
2. Education - Admission Counsellor
3. Real Estate - Property Rental
4. Healthcare - Health Clinic Receptionist

✅ **Working Features**:
- Voice call initiation from industry pages
- Email capture before first use
- Real-time call state management
- Visual feedback during calls
- Clean call termination
- Demo page with all agents

✅ **Technical Implementation**:
- Retell SDK integration
- Backend API endpoint
- Environment configuration
- TypeScript type safety
- Error handling
- Production build passing

### Status: 🟢 Production Ready

**Date**: 2025-10-01
**Version**: 1.0
**Build Status**: ✅ Passing
**Deployment**: Ready

---

## Quick Reference

### Agent IDs
```
Finance:      agent_38efe8dc909c95c045d6827754
Education:    agent_8132d8f06109249fdec5bdd917
Real Estate:  agent_df19e049ff7975f2559836d74e
Healthcare:   agent_f7664b8912fa2a5c8106f20668
```

### API Key
```
key_b3d2671c06f85c6c0e8b0f0b33f5
```

### Important URLs
```
Dev:        http://localhost:3000
Retell:     https://beta.retellai.com/dashboard
Demo Page:  /demo
Industry:   /industries/[slug]
```

### Key Files
```
.env.local                              → API key
src/components/sections/HeroSection.tsx → Integration code
src/app/api/createWebCall/route.ts      → Backend API
src/data/usecases1.json                 → Agent config
```

---

**End of Documentation**

For questions or issues, check the Troubleshooting section or review console logs.
