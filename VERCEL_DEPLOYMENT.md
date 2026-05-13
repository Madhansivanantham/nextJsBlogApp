# Vercel Deployment Guide

This guide explains how to deploy your Next.js blog application to Vercel with proper environment variable configuration for both local development and production.

## Environment Setup

### Local Development (`.env.local`)

Your `.env.local` file already includes:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

This is automatically used by the development server when you run:
```bash
npm run dev
```

### Production Build

For production builds (locally or on Vercel), the application uses:
1. **`VERCEL_URL`** - Automatically set by Vercel deployment (highest priority)
2. **`NEXT_PUBLIC_SITE_URL`** - Environment variable you set in Vercel dashboard (fallback)
3. **Hardcoded fallback** - `http://localhost:3000` (only if above not set)

## API URL Resolution

The `/lib/api.ts` utility function handles URL resolution automatically:

```typescript
export function getBaseUrl(): string {
  // Client-side
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }

  // Server-side: Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
```

## Deploying to Vercel

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Select the repository and branch

### Step 2: Configure Environment Variables

In the Vercel dashboard for your project:

1. Go to **Settings > Environment Variables**
2. Add the following variables:

#### For Production (`Production` environment):
```
MONGODB_URI = your_mongodb_connection_string
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
NEXTAUTH_SECRET = your_nextauth_secret
NEXTAUTH_URL = https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SITE_URL = https://your-vercel-domain.vercel.app
```

#### For Preview/Development (`Preview` environment):
```
MONGODB_URI = your_mongodb_connection_string (same or test DB)
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
NEXTAUTH_SECRET = your_nextauth_secret
NEXTAUTH_URL = https://your-branch-name.your-project.vercel.app
NEXT_PUBLIC_SITE_URL = https://your-branch-name.your-project.vercel.app
```

### Step 3: Deploy

The deployment will automatically trigger when you push to your repository:

```bash
git push origin main
```

## How It Works

### Fetch Calls

All fetch calls now use the `getApiUrl()` helper:

```typescript
// Instead of:
fetch('http://localhost:3000/api/posts')

// Now:
import { getApiUrl } from '@/lib/api';
fetch(getApiUrl('/api/posts'))
```

### Environment Variable Resolution

1. **Local Development (`npm run dev`)**
   - Uses `NEXT_PUBLIC_SITE_URL` from `.env.local`
   - Result: `http://localhost:3000`

2. **Local Production Build (`npm run build && npm start`)**
   - Uses `NEXT_PUBLIC_SITE_URL` from `.env.local`
   - Result: `http://localhost:3000`

3. **Vercel Deployment**
   - Server-side: Uses auto-generated `VERCEL_URL`
   - Client-side: Uses `NEXT_PUBLIC_SITE_URL` from dashboard
   - Result: `https://your-deployment.vercel.app`

## Testing Locally

### Development
```bash
npm run dev
```
Access at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```
Access at `http://localhost:3000`

## Troubleshooting

### API URLs Not Working After Deployment

**Check:**
1. Verify environment variables are set in Vercel dashboard
2. Ensure `NEXT_PUBLIC_SITE_URL` matches your Vercel domain
3. Check that `NEXTAUTH_URL` is set correctly

### CORS Issues

If you get CORS errors:
1. Verify the API is accessible from Vercel's domain
2. Check MongoDB Atlas IP whitelist (allow `0.0.0.0/0` or Vercel's IP ranges)
3. Ensure NextAuth configuration allows your Vercel domain

### Relative vs Absolute URLs

- **Client components**: Use `getApiUrl('/api/endpoint')`
- **API routes**: Use relative paths directly (`/api/posts`)
- **Server components**: Use `getApiUrl()` for absolute URLs

## Key Files Modified

- `/.env.local` - Added `NEXT_PUBLIC_SITE_URL`
- `/.env.example` - Template for environment variables
- `/lib/api.ts` - New utility functions for URL resolution
- `/app/page.tsx` - Updated to use `getApiUrl()`
- `/app/addBlog/page.tsx` - Updated to use `getApiUrl()`
- `/app/blog/[slug]/client.tsx` - Updated to use `getApiUrl()`
- `/app/blog/[slug]/comments/page.tsx` - Updated to use `getApiUrl()`

## Security Notes

- Never commit `.env.local` to Git (it's in `.gitignore`)
- Store sensitive values only in Vercel dashboard
- The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser - never include secrets
- Keep API keys and secrets in non-public environment variables
