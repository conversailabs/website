# 🚨 IMPORTANT: Manual Steps Required on Retell AI Dashboard

## Why Agent Is Not Speaking

The agent IDs are in your code, BUT the **prompts are NOT uploaded** to Retell AI yet!

Think of it like this:
- ✅ You have the phone number (agent ID)
- ❌ Nobody is there to answer (no prompt uploaded)

---

## Step-by-Step: Upload Prompts to Retell AI

### 1. Login to Retell AI
Go to: https://beta.retellai.com/dashboard

### 2. For Each Agent, Do This:

#### Agent 1: Finance - EMI Payment
1. Click "Create Agent" or find agent: `agent_38efe8dc909c95c045d6827754`
2. Copy ENTIRE content from: `doc/MK_FINSERVE_AGENT_PROMPT.md`
3. Paste into "System Prompt" field on Retell
4. Set voice: Female, professional tone
5. Click "Save" or "Update"

#### Agent 2: Education - Admission Counsellor
1. Find agent: `agent_8132d8f06109249fdec5bdd917`
2. Copy content from: `ADMISSION_COUNSELLOR_AGENT_PROMPT.md`
3. Paste into "System Prompt"
4. Set voice: Female, friendly
5. Save

#### Agent 3: Real Estate - Property Rental
1. Find agent: `agent_df19e049ff7975f2559836d74e`
2. Copy content from: `2LET_PROPERTY_AGENT_PROMPT.md`
3. Paste into "System Prompt"
4. Set voice: Female, warm
5. Save

#### Agent 4: Healthcare - Health Clinic
1. Find agent: `agent_f7664b8912fa2a5c8106f20668`
2. Copy content from: `HEALTH_CLINIC_RECEPTIONIST_AGENT_PROMPT.md`
3. Paste into "System Prompt"
4. Set voice: Female, caring
5. Save

---

## Verify Agents Are Active

On Retell Dashboard:
1. Go to "Agents" tab
2. Check status of all 4 agents:
   - ✅ Should show "Active" (green)
   - ❌ If "Inactive" - click to activate

---

## Test Directly on Retell (Before Your Website)

For each agent:
1. Click "Test" button on Retell dashboard
2. Speak with agent
3. Verify it responds correctly
4. If NOT working on Retell = Won't work on website

---

## Common Issues & Solutions

### Issue: "Agent not found"
**Solution**: Agent ID doesn't exist or was deleted
- Create new agent on Retell
- Update agent ID in `usecases1.json`

### Issue: "Access denied"
**Solution**: API key is wrong
- Check API key on Retell dashboard (Settings → API Keys)
- Update `.env.local` with correct key

### Issue: Agent speaks but says wrong things
**Solution**: Prompt not uploaded or outdated
- Re-upload full prompt from markdown file
- Make sure to copy ENTIRE file content

### Issue: Agent doesn't respond to questions
**Solution**: Prompt formatting issue
- Check for syntax errors in prompt
- Ensure all sections are included
- Test on Retell dashboard first

---

## After Upload: Website Integration

Once prompts are uploaded and tested on Retell dashboard, then we can:

**Option A: Add Voice to Industries Pages**
- Integrate Retell SDK into HeroSection component
- "Tap to Talk" will actually call agent

**Option B: Redirect to Demo Page**
- "Tap to Talk" redirects to `/demo` with agent selected
- Demo page already has Retell working

**Option C: Add Agent Cards** (Like demo page)
- Show agent cards on industry pages
- Each card has "Talk to Agent" button

---

## Quick Checklist

Before testing on website:

- [ ] Logged into Retell AI dashboard
- [ ] Found/created 4 agents with correct IDs
- [ ] Uploaded prompt for Finance agent
- [ ] Uploaded prompt for Education agent
- [ ] Uploaded prompt for Real Estate agent
- [ ] Uploaded prompt for Healthcare agent
- [ ] All agents show "Active" status
- [ ] Tested each agent directly on Retell dashboard
- [ ] Agents respond correctly when tested

**ONLY AFTER ALL CHECKED**, your website will work!

---

## Questions?

**Q: Can I use different agent IDs?**
A: Yes! Just update the IDs in `usecases1.json` after creating new agents.

**Q: Can I modify the prompts?**
A: Yes! Edit markdown files, then re-upload to Retell dashboard.

**Q: How do I know if API key is correct?**
A: Check `.env.local` - should match "API Keys" section on Retell dashboard.

**Q: Can I test without uploading prompts?**
A: No! Agents need prompts to know how to respond.

---

## Next Steps

1. ✅ Upload all 4 prompts to Retell (MANUAL - you must do this)
2. ✅ Test all agents on Retell dashboard (MANUAL)
3. ⏳ Add Retell SDK to HeroSection (I can code this)
4. ⏳ Test on website (After steps 1-2 complete)

**Status**: ⏸️ Waiting for prompt upload on Retell dashboard
