import { createAndSaveOAuthState, type OAuthMode } from "./state";

export function getGoogleRedirectUri(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth`;
}

/**
 * Redirects the browser to Google's official OAuth 2.0 Account Chooser & Consent page.
 * After verification, Google redirects back to `/auth?code=...&state=google_...`
 * for server-side authorization code exchange (or linking when `mode === "link"`).
 */
export function redirectToGoogleOAuth(clientId: string, mode: OAuthMode = "login"): void {
  const redirectUri = getGoogleRedirectUri();
  const state = createAndSaveOAuthState("google", mode);
  const scopes =
    process.env["NEXT_PUBLIC_GOOGLE_OAUTH_SCOPES"] ||
    "openid email profile https://www.googleapis.com/auth/user.addresses.read";

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", scopes);
  googleUrl.searchParams.set("state", state);
  googleUrl.searchParams.set("prompt", "select_account");
  googleUrl.searchParams.set("access_type", "online");

  window.location.assign(googleUrl.toString());
}
