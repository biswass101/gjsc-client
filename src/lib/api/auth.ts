import { apiClient, tokenStorage } from '../api-client';
import type { User } from '@/types';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string | undefined;
}

export interface AuthResponse {
  user: User & { id?: number | undefined; status?: string | undefined };
  tokens?: AuthTokens | undefined;
  token?: string | undefined;
}

export interface GoogleAuthPayload {
  code?: string | undefined;
  redirectUri?: string | undefined;
  idToken?: string | undefined;
  accessToken?: string | undefined;
}

export interface FacebookAuthPayload {
  code?: string | undefined;
  redirectUri?: string | undefined;
  accessToken?: string | undefined;
}

export type UserProfileUpdatePayload = Omit<Partial<User>, 'avatar' | 'phone' | 'address'> & {
  avatar?: string | null | undefined;
  phone?: string | null | undefined;
  address?: string | null | undefined;
};

function saveAuthToken(res: AuthResponse | undefined | null): void {
  const token = res?.tokens?.accessToken || res?.token;
  if (token) {
    tokenStorage.set(token);
  }
}

export const authApi = {
  async login(email: string, pass: string): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password: pass,
    });
    saveAuthToken(res);
    return res;
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string | undefined;
  }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/register', data);
    saveAuthToken(res);
    return res;
  },

  async loginWithGoogle(data: GoogleAuthPayload): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/google', data);
    saveAuthToken(res);
    return res;
  },

  async loginWithFacebook(data: FacebookAuthPayload): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/facebook', data);
    saveAuthToken(res);
    return res;
  },

  async linkGoogle(data: GoogleAuthPayload): Promise<{ user: User; message: string }> {
    return apiClient.post<{ user: User; message: string }>('/auth/link/google', data);
  },

  async linkFacebook(data: FacebookAuthPayload): Promise<{ user: User; message: string }> {
    return apiClient.post<{ user: User; message: string }>('/auth/link/facebook', data);
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async updateProfile(updates: UserProfileUpdatePayload): Promise<User> {
    return apiClient.patch<User>('/auth/profile', updates);
  },

  async changePassword(data: {
    currentPassword?: string | undefined;
    newPassword: string;
  }): Promise<{ success: boolean; hasPassword: boolean; message: string }> {
    return apiClient.patch<{ success: boolean; hasPassword: boolean; message: string }>(
      '/auth/password',
      data
    );
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Backend logout endpoint is best-effort (e.g. if token already invalid or network offline)
    } finally {
      tokenStorage.clear();
    }
  },
};
