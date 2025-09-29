const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  path: string;
  body?: unknown;
  token?: string | null;
}

export interface AuthResponse {
  userId: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  token?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface HackathonResponse {
  id: string;
  name?: string | null;
  description?: string | null;
  isPublic: boolean;
  startDate: string; // ISO
  endDate: string; // ISO
}

export interface HackathonCreateRequest {
  name?: string | null;
  description?: string | null;
  isPublic: boolean;
  startDate: string; // ISO
  endDate: string; // ISO
}

function buildHeaders(token?: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function apiRequest<T>({ method = "GET", path, body, token }: RequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method,
    headers: buildHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed: ${response.status} ${response.statusText}`);
  }

  const hasJson = (response.headers.get("content-type") || "").includes("application/json");
  return (hasJson ? (await response.json()) : (await response.text())) as T;
}

// Auth endpoints
export function login(request: LoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>({ method: "POST", path: "/api/Auth/login", body: request });
}

export function register(request: RegisterRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>({ method: "POST", path: "/api/Auth/register", body: request });
}

// Hackathons endpoints
export function getHackathons(token?: string | null): Promise<HackathonResponse[]> {
  return apiRequest<HackathonResponse[]>({ method: "GET", path: "/api/Hackathons", token });
}

export function getHackathon(id: string, token?: string | null): Promise<HackathonResponse> {
  return apiRequest<HackathonResponse>({ method: "GET", path: `/api/Hackathons/${id}`, token });
}

export function createHackathon(payload: HackathonCreateRequest, token?: string | null): Promise<HackathonResponse> {
  return apiRequest<HackathonResponse>({ method: "POST", path: "/api/Hackathons", body: payload, token });
}

export function updateHackathon(id: string, payload: HackathonCreateRequest, token?: string | null): Promise<void> {
  return apiRequest<void>({ method: "PUT", path: `/api/Hackathons/${id}`, body: payload, token });
}

export function deleteHackathon(id: string, token?: string | null): Promise<void> {
  return apiRequest<void>({ method: "DELETE", path: `/api/Hackathons/${id}`, token });
}

export const ApiConfig = {
  API_BASE_URL,
};

