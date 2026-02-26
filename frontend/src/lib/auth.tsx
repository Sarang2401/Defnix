"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi } from "./api";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Hydrate token from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("defnix_token");
        setToken(stored);
        setIsLoading(false);
    }, []);

    // Redirect to login if unauthenticated (except on login page)
    useEffect(() => {
        if (!isLoading && !token && pathname !== "/admin/login") {
            router.replace("/admin/login");
        }
    }, [isLoading, token, pathname, router]);

    const login = useCallback(
        async (email: string, password: string) => {
            const data = await fetchApi<{ accessToken: string }>("auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem("defnix_token", data.accessToken);
            setToken(data.accessToken);
            router.replace("/admin");
        },
        [router],
    );

    const logout = useCallback(() => {
        localStorage.removeItem("defnix_token");
        setToken(null);
        router.replace("/admin/login");
    }, [router]);

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
