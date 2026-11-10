export type OAuthProvider = "google" | "facebook";

const OAUTH_STATE_KEY = "gjsc_oauth_state";
const STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface StoredOAuthState {
  provider: OAuthProvider;
  state: string;
  createdAt: number;
}

function generateRandomToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `${Date.now()}_${Math.random().toString(36).slice(2, 14)}`;
}

function writeStorage(value: string): void {
  try {
    sessionStorage.setItem(OAUTH_STATE_KEY, value);
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(OAUTH_STATE_KEY, value);
  } catch {
    /* ignore */
  }
}

function readStorage(): string | null {
  try {
    const s = sessionStorage.getItem(OAUTH_STATE_KEY);
    if (s) return s;
  } catch {
    /* ignore */
  }
  try {
    return localStorage.getItem(OAUTH_STATE_KEY);
  } catch {
    return null;
  }
}

export function clearOAuthState(): void {
  try {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(OAUTH_STATE_KEY);
  } catch {
    /* ignore */
  }
}

export function createAndSaveOAuthState(provider: OAuthProvider): string {
  const state = `${provider}_${generateRandomToken()}`;
  const payload: StoredOAuthState = {
    provider,
    state,
    createdAt: Date.now(),
  };
  writeStorage(JSON.stringify(payload));
  return state;
}

export function getOAuthProviderFromState(
  state: string | null | undefined
): OAuthProvider | null {
  if (state?.startsWith("google_")) return "google";
  if (state?.startsWith("facebook_")) return "facebook";
  try {
    const raw = readStorage();
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredOAuthState>;
    if (parsed.provider === "google" || parsed.provider === "facebook") {
      return parsed.provider;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function consumeAndVerifyOAuthState(
  returnedState: string | null | undefined
): { valid: boolean; provider: OAuthProvider | null } {
  const detected = getOAuthProviderFromState(returnedState);
  const raw = readStorage();
  clearOAuthState();

  if (!returnedState || !raw) {
    return { valid: false, provider: detected };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredOAuthState>;
    const isFresh =
      typeof parsed.createdAt === "number" && Date.now() - parsed.createdAt < STATE_TTL_MS;
    const valid =
      parsed.state === returnedState &&
      isFresh &&
      (parsed.provider === "google" || parsed.provider === "facebook");
    return {
      valid,
      provider:
        parsed.provider === "google" || parsed.provider === "facebook"
          ? parsed.provider
          : detected,
    };
  } catch {
    return { valid: false, provider: detected };
  }
}
