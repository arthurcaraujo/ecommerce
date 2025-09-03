type HttpMethod = "GET"|"POST"|"PUT"|"PATCH"|"DELETE";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://<your-mockapi-base>";
const headers = { "Content-Type": "application/json" };

async function request<T>(path: string, method: HttpMethod = "GET", body?: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`HTTP ${res.status}: ${text}`)
    }
    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, "POST", body),
    put:  <T>(path: string, body: unknown) => request<T>(path, "PUT", body),
    patch:<T>(path: string, body: unknown) => request<T>(path, "PATCH", body),
    delete:<T>(path: string) => request<T>(path, "DELETE"),
};