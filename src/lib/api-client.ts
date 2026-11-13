/**
 * Glorious Japan Skin Care - Unified API Client
 * Provides typed, JWT-authenticated HTTP communication with the Express/MySQL backend.
 */

const API_BASE_URL =
  process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:4000/api/v1';

const TOKEN_KEY = 'gjsc_token';

export class ApiClientError extends Error {
  status: number;
  code: string | undefined;
  details: any;

  constructor(message: string, status: number, code?: string | undefined, details?: any) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* ignore */
    }
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined | null> | undefined;
  body?: any;
}

export async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers: customHeaders, body, ...restOptions } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, String(val));
      }
    });
    const queryString = query.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const token = tokenStorage.get();
  const headers = new Headers(customHeaders);

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let finalBody: BodyInit | undefined = undefined;
  if (body !== undefined) {
    if (typeof body === 'object' && !(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
      finalBody = JSON.stringify(body);
    } else {
      finalBody = body as BodyInit;
    }
  }

  try {
    const fetchOptions: RequestInit = {
      ...restOptions,
      headers,
    };
    if (finalBody !== undefined) {
      fetchOptions.body = finalBody;
    }

    const response = await fetch(url, fetchOptions);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorMessage =
        data?.error?.message ||
        data?.message ||
        `Request failed with status ${response.status}`;
      const errorCode = data?.error?.code || 'API_ERROR';
      const errorDetails = data?.error?.details;

      throw new ApiClientError(errorMessage, response.status, errorCode, errorDetails);
    }

    // Backend responses conform to { success: true, data: T }
    if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
      return data.data as T;
    }

    return (data as T) ?? ({} as T);
  } catch (error: any) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error?.message || 'Network connection failed. Please ensure the backend is running.',
      0,
      'NETWORK_ERROR'
    );
  }
}

export const apiClient = {
  get: <T = any>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null> | undefined,
    options?: RequestOptions
  ) => {
    const opts: RequestOptions = { method: 'GET', ...options };
    if (params !== undefined) opts.params = params;
    return request<T>(endpoint, opts);
  },

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) => {
    const opts: RequestOptions = { method: 'POST', ...options };
    if (body !== undefined) opts.body = body;
    return request<T>(endpoint, opts);
  },

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) => {
    const opts: RequestOptions = { method: 'PUT', ...options };
    if (body !== undefined) opts.body = body;
    return request<T>(endpoint, opts);
  },

  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) => {
    const opts: RequestOptions = { method: 'PATCH', ...options };
    if (body !== undefined) opts.body = body;
    return request<T>(endpoint, opts);
  },

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),

  upload: async <T = any>(endpoint: string, formData: FormData) => {
    const token = tokenStorage.get();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new ApiClientError(
        data?.error?.message || 'Upload failed',
        response.status,
        data?.error?.code || 'UPLOAD_ERROR'
      );
    }
    return data.data as T;
  },
};
