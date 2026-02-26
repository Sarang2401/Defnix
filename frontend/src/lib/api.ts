const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Public API fetch — no auth required.
 * Used by server components and public pages.
 */
export async function fetchApi<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const url = `${API_BASE}/${path.replace(/^\//, "")}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(res.status, body || res.statusText);
    }

    return res.json() as Promise<T>;
}

/**
 * Authenticated API fetch — injects JWT from localStorage.
 * Used by admin dashboard (client components only).
 */
export async function fetchApiAuth<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("defnix_token") : null;

    const url = `${API_BASE}/${path.replace(/^\//, "")}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (res.status === 401) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("defnix_token");
            window.location.href = "/admin/login";
        }
        throw new ApiError(401, "Unauthorized");
    }

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(res.status, body || res.statusText);
    }

    // Handle 204 No Content (e.g. DELETE responses)
    if (res.status === 204) return undefined as T;

    return res.json() as Promise<T>;
}

/**
 * Upload file with auth — used for media uploads.
 */
export async function uploadFile<T>(
    path: string,
    file: File,
): Promise<T> {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("defnix_token") : null;

    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_BASE}/${path.replace(/^\//, "")}`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    if (res.status === 401) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("defnix_token");
            window.location.href = "/admin/login";
        }
        throw new ApiError(401, "Unauthorized");
    }

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(res.status, body || res.statusText);
    }

    return res.json() as Promise<T>;
}
