interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`/api${url}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include',
    });

    let data: ApiResponse<T>;
    
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0,
      {}
    );
  }
}

export async function apiGet<T = any>(url: string, options: RequestInit = {}) {
  return apiRequest<T>(url, {
    ...options,
    method: 'GET',
  });
}

export async function apiPost<T = any>(
  url: string,
  body?: any,
  options: RequestInit = {}
) {
  return apiRequest<T>(url, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function apiPut<T = any>(
  url: string,
  body?: any,
  options: RequestInit = {}
) {
  return apiRequest<T>(url, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function apiDelete<T = any>(
  url: string,
  options: RequestInit = {}
) {
  return apiRequest<T>(url, {
    ...options,
    method: 'DELETE',
  });
}
