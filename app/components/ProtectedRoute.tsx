"use client";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { subscribeToSessionChanges } from "@/app/utils/sessionStorage";

export type AuthUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
};

type Props = {
    children: (user: AuthUser) => ReactNode;
    requiredRole?: string;
};

function getSnapshot(): string | null {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("user");
}

function getServerSnapshot(): null {
    return null;
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
    const router = useRouter();

    const stored = useSyncExternalStore(
        subscribeToSessionChanges,
        getSnapshot,
        getServerSnapshot
    );

    const user: AuthUser | null = stored ? JSON.parse(stored) : null;

    const isAllowed = user !== null &&
        (!requiredRole || user.role === requiredRole);

    useEffect(() => {
        if (!stored || !isAllowed) {
            const timer = setTimeout(() => {
                const currentStored = sessionStorage.getItem("user");
                if (!currentStored) {
                    router.replace("/authentication/login");
                } else {
                    const currentUser = JSON.parse(currentStored);
                    if (requiredRole && currentUser.role !== requiredRole) {
                        router.replace("/authentication/login");
                    }
                }
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [stored, isAllowed, router, requiredRole]);

    if (!stored) return null;
    if (!isAllowed) return null;

    return <>{children(user!)}</>;
}