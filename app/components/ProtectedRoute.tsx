"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

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

export default function ProtectedRoute({ children, requiredRole }: Props) {
    const router = useRouter();

    const stored = typeof window !== "undefined"
        ? sessionStorage.getItem("user")
        : null;

    const user: AuthUser | null = stored ? JSON.parse(stored) : null;

    const isAllowed = user !== null &&
        (!requiredRole || user.role === requiredRole);

    useEffect(() => {
        if (!isAllowed) {
            router.replace("/authentication/login");
        }
    }, [isAllowed, router]);

    // Tant que la vérification n'est pas faite ou non autorisé
    if (!isAllowed) return null;

    return <>{children(user!)}</>;
}