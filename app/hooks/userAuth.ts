"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export function useAuth(requiredRole?: string) {
    const router = useRouter();

    const [user] = useState<AuthUser | null>(() => {
        if (typeof window === "undefined") return null;

        const stored = sessionStorage.getItem("user");
        if (!stored) {
            router.replace("/authentication/login");
            return null;
        }

        const parsed: AuthUser = JSON.parse(stored);
        if (requiredRole && parsed.role !== requiredRole) {
            router.replace("/authentication/login");
            return null;
        }

        return parsed;
    });

    return { user, ready: user !== null };
}

export function logout() {
    sessionStorage.removeItem("user");
    window.location.href = "/authentication/login";
}