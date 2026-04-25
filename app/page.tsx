"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (!stored) {
            // Pas connecté, renvoie vers login
            router.replace("/authentication/login");
            return;
        }

        const user = JSON.parse(stored);

        // Redirige selon le rôle
        if (user.role === "admin") {
            router.replace("/dashboard/admin");
        } else if (user.role === "organizer") {
            router.replace("/organizer/dashboard");
        } else {
            router.replace("/user/user-dashboard");
        }
    }, [router]);

    // Affiche rien pendant la redirection
    return null;
}