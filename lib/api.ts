2export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`/api${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred');
    (error as any).status = response.status;
    throw error;
  }

  return data;
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
