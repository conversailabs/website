# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 marketing website for ConversAI Labs, an AI agent building platform. The site showcases the no-code admin panel that allows users to build custom AI voice agents for lead qualification, customer support, and automated conversations across voice, WhatsApp, and email.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Build for Vercel deployment (includes TypeScript checking)
npm run vercel-build
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript with strict mode
- **UI Components**: Custom component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Voice Integration**: Retell Client SDK
- **Forms**: react-hook-form with zod validation

### Directory Structure
- `/src/app/` - Next.js App Router pages and API routes
  - `/demo/` - Interactive demo page showcasing AI agent conversations
  - `/contact/` - Enhanced contact page with form and API integration
  - `/pricing/` - Comprehensive pricing page with plans and features
- `/src/components/` - React components organized by feature
  - `Hero.tsx` - Updated hero section highlighting AI agent building
  - `InteractiveDemo.tsx` - Interactive demo showcasing admin panel features
  - `TechnicalFeatures.tsx` - Technical differentiators and unique features
  - `AgentTemplates.tsx` - Industry-specific agent templates showcase
  - `ProblemSolution.tsx` - Problem/solution positioning with ROI calculator
- `/src/components/ui/` - Reusable UI components based on Radix UI
- `/src/data/` - JSON data files for industries, features, testimonials
- `/src/main/` - Main landing page section components
- `/src/lib/` - Utility functions (utils.ts contains cn() for className merging)

### Key Architectural Patterns

1. **Component Organization**: Components follow a pattern where main page sections are in `/src/main/` and reusable components are in `/src/components/`

2. **UI Component Library**: The `/src/components/ui/` directory contains a custom component library built on Radix UI primitives, following shadcn/ui patterns. Always use these components for consistency.

3. **API Integration**: The Retell AI integration is handled through `/src/app/api/createWebCall/` which requires environment variables:
   - `GLOBAL_PHONE_NUMBER` (server-only)
   - `RETELL_API_KEY` (server-only)
   
   Contact form submissions are handled via `/src/app/api/contact/` endpoint.

4. **Dynamic Routes**: Industry pages use dynamic routing at `/src/app/industries/[slug]/` with data from `/src/data/industries.json`

5. **TypeScript Path Aliases**: Use `@/*` to import from the src directory (e.g., `import { Button } from '@/components/ui/button'`)

## Important Considerations

1. **No Testing Infrastructure**: This project currently has no testing framework or tests. When adding new features, consider the lack of automated testing.

2. **SEO Optimization**: The site includes structured data and meta tags. The `seo-utils.ts` file contains utilities for generating structured data.

3. **Responsive Design**: Components use the `useIsMobile` hook from `/src/hooks/use-mobile.tsx` for responsive behavior.

4. **Form Handling**: Forms use react-hook-form with zod schemas. Contact forms are available at `/contact` with API integration at `/api/contact`.

5. **Animation**: Framer Motion is used throughout. Follow existing animation patterns for consistency.

6. **Error Handling**: The app includes ErrorBoundary component and loading states. Use LoadingSpinner and SkeletonLoader components for consistent UX.

7. **Toast Notifications**: The app includes toast notifications via the Toaster component in the layout. Use the `useToast` hook for user feedback.

## Git Workflow

**IMPORTANT**: Do NOT commit changes automatically. Only commit when explicitly asked by the user. The user will tell you when to commit changes.

**BEFORE PUSHING TO GITHUB**: Always run `npm run build` to check the production build is working correctly. Only push if the build succeeds without errors.

## Code Style Patterns

- Components use function declarations with explicit return types
- Props interfaces are defined inline or as separate types
- Tailwind classes use the `cn()` utility from `/src/lib/utils.ts` for conditional styling
- API routes follow Next.js 15 conventions with proper TypeScript types