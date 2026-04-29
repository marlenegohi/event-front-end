"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const stored = sessionStorage.getItem("user");

        if (!stored) {
            router.replace("/authentication/login");
            return;
        }

        const user = JSON.parse(stored);

        if (user.role === "admin") {
            router.replace("/dashboard/admin");
        } else if (user.role === "organizer") {
            router.replace("/organizer/dashboard");
        } else {
            router.replace("/user/user-dashboard");
        }
    }, [router]);

    return null;
}