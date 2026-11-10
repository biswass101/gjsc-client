import { createAndSaveOAuthState } from "./state";

export function getFacebookRedirectUri(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth`;
}

/**
 * Redirects the browser to Meta/Facebook's official OAuth 2.0 Login Dialog.
 * After verification, Facebook redirects back to `/auth?code=...&state=facebook_...`
 * for server-side authorization code exchange.
 */
export function redirectToFacebookOAuth(appId: string): void {
  const redirectUri = getFacebookRedirectUri();
  const state = createAndSaveOAuthState("facebook");
  const scopes =
    process.env["NEXT_PUBLIC_FACEBOOK_OAUTH_SCOPES"] || "email,public_profile";

  const fbUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  fbUrl.searchParams.set("client_id", appId);
  fbUrl.searchParams.set("redirect_uri", redirectUri);
  fbUrl.searchParams.set("response_type", "code");
  fbUrl.searchParams.set("scope", scopes);
  fbUrl.searchParams.set("state", state);

  window.location.assign(fbUrl.toString());
}
