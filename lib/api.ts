function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Base URL for API calls from the browser or server.
 * Browser: prefers NEXT_PUBLIC_SITE_URL, otherwise the current origin (works on Vercel without extra env).
 * Server: prefers NEXT_PUBLIC_SITE_URL, then VERCEL_URL, then localhost for `next dev`.
 */
export function getBaseUrl(): string {
  const publicSite = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (typeof window !== "undefined") {
    if (publicSite) return trimTrailingSlash(publicSite);
    return window.location.origin;
  }

  if (publicSite) return trimTrailingSlash(publicSite);

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
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
