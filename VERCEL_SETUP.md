# Vercel Deployment Setup Guide

## Environment Variables Configuration

To fix the 500 error on your deployed site, you need to configure environment variables in your Vercel project.

### Required Environment Variables

The following environment variables are required for the Retell AI integration to work:

1. **RETELL_API_KEY** - Your Retell AI API key for creating web calls
2. **GLOBAL_PHONE_NUMBER** (optional) - Phone number for voice calls

### Step-by-Step Instructions

#### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Log in to your account
3. Navigate to your project (website-d9lj)

#### 2. Add Environment Variables

1. Click on **Settings** tab
2. Select **Environment Variables** from the left sidebar
3. Add the following variables:

   **Variable 1:**
   - **Key**: `RETELL_API_KEY`
   - **Value**: `key_b3d2671c06f85c6c0e8b0f0b33f5` (or your valid Retell API key)
   - **Environments**: Select all three (Production, Preview, Development)

   **Variable 2 (Optional):**
   - **Key**: `GLOBAL_PHONE_NUMBER`
   - **Value**: `+1234567890` (or your actual phone number)
   - **Environments**: Select all three (Production, Preview, Development)

4. Click **Save** for each variable

#### 3. Verify API Key

Before redeploying, verify your Retell API key is valid:

1. Go to [Retell AI Dashboard](https://app.retellai.com)
2. Navigate to API Keys section
3. Verify the key `key_b3d2671c06f85c6c0e8b0f0b33f5` is active
4. If expired or invalid, generate a new key and update the environment variable in Vercel

#### 4. Verify Agent IDs

Make sure the following agent IDs in your code are valid and active:

- **Education**: `agent_8132d8f06109249fdec5bdd917`
- **Healthcare & Wellness**: `agent_f7664b8912fa2a5c8106f20668`
- **Real Estate & Housing**: `agent_df19e049ff7975f2559836d74e`
- **Finance & Legal**: `agent_38efe8dc909c95c045d6827754`

You can verify these in your Retell AI dashboard under Agents section.

#### 5. Redeploy Your Site

After adding the environment variables, you need to redeploy:

**Option A: Automatic Redeploy**
- Push a new commit to your repository
- Vercel will automatically trigger a new deployment

**Option B: Manual Redeploy**
1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **three dots** menu (⋯)
4. Select **Redeploy**
5. Confirm the redeployment

#### 6. Test the Deployment

Once redeployed:

1. Visit your deployed site: `https://website-d9lj.vercel.app`
2. Navigate to any industry page (e.g., `/industries/finance-and-legal`)
3. Click the "TAP TO TALK" button
4. Verify the call starts without 500 errors

#### 7. Check Logs (If Issues Persist)

If you still encounter errors:

1. Go to **Deployments** tab in Vercel
2. Click on the latest deployment
3. Select **Functions** tab
4. Find `/api/createWebCall` function
5. Click to view logs
6. Look for `[createWebCall]` prefixed logs for detailed error information

## Common Issues & Solutions

### Issue 1: Still Getting 500 Error

**Cause**: Environment variable not properly set or deployment didn't pick up changes

**Solution**:
- Double-check environment variable is saved in Vercel
- Ensure the variable is enabled for "Production" environment
- Try a manual redeploy from Vercel dashboard

### Issue 2: Invalid API Key Error

**Cause**: Retell API key is expired or invalid

**Solution**:
- Log in to Retell AI dashboard
- Generate a new API key
- Update `RETELL_API_KEY` in Vercel environment variables
- Redeploy the site

### Issue 3: Agent Not Found Error

**Cause**: Agent ID doesn't exist or is not active in Retell

**Solution**:
- Verify agent IDs in Retell AI dashboard
- Update agent IDs in `src/components/sections/HeroSection.tsx` (lines 23-28)
- Commit and push changes

### Issue 4: Environment Variable Not Loading

**Cause**: Vercel caching or build cache issues

**Solution**:
- Clear Vercel build cache
- Go to Settings → General → scroll to "Clear Cache"
- Redeploy after clearing cache

## Local Development

For local development, your environment variables are stored in `.env.local`:

```bash
# Retell AI Configuration
RETELL_API_KEY=key_b3d2671c06f85c6c0e8b0f0b33f5

# Global Phone Number (optional - for voice calls)
GLOBAL_PHONE_NUMBER=+1234567890
```

**Note**: Never commit `.env.local` to Git (it's already in `.gitignore`)

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Rotate API keys** regularly for security
3. **Use different keys** for development and production if possible
4. **Monitor API usage** in Retell dashboard to detect unauthorized usage
5. **Set up alerts** in Retell for unusual API activity

## Support

If you continue to experience issues:

1. Check the improved error messages in browser console
2. Review Vercel function logs for detailed error information
3. Contact Retell AI support if API-related issues persist
4. Verify your Retell account has sufficient credits/quota

## Next Steps

After successful deployment:

- Monitor the call analytics in Retell dashboard
- Test all industry-specific agents
- Set up monitoring/alerts for API failures
- Consider implementing rate limiting for production
