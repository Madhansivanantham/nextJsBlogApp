/**
 * Get the base URL for API calls
 * Works on both client and server side
 */
export function getBaseUrl(): string {
  // Client-side: use NEXT_PUBLIC_SITE_URL
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }

  // Server-side: prioritize VERCEL_URL for Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fall back to NEXT_PUBLIC_SITE_URL
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

/**
 * Construct a full API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getBaseUrl();
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}
