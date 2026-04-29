"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, Bell, Settings, LogOut } from "lucide-react";
import { logout } from "@/app/hooks/userAuth";

type AuthUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
};

function getSessionUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
}

const FloatingNav = () => {
    const [active, setActive] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ height: 0, top: 0, left: 0, width: 0 });

    const [user] = useState<AuthUser | null>(getSessionUser);

    const containerRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const items = [
        { id: 0, icon: <Home size={22} />, label: "Home" },
        { id: 1, icon: <Search size={22} />, label: "Search" },
        { id: 2, icon: <Bell size={22} />, label: "Alerts" },
        { id: 3, icon: <Settings size={22} />, label: "Settings" },
    ];

    useEffect(() => {
        const updateIndicator = () => {
            if (btnRefs.current[active] && containerRef.current) {
                const btn = btnRefs.current[active];
                const container = containerRef.current;
                if (!btn) return;
                const btnRect = btn.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                setIndicatorStyle({
                    height: btnRect.height,
                    top: btnRect.top - containerRect.top,
                    left: 0,
                    width: containerRect.width,
                });
            }
        };
        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [active]);

    const initiale = user?.name?.charAt(0).toUpperCase() ?? "?";

    return (
    <div className="fixed left-0 top-0 z-50 h-screen w-64 flex flex-col">

        {/* Header avatar + nom */}
        <div className="flex flex-row items-center w-full px-6 py-4 gap-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-blue-600">
                {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-white text-sm font-semibold">{initiale}</span>
                )}
            </div>
            <div>
                <span className="text-sm font-semibold text-gray-800 dark:text-white block">
                    {user?.name ?? "Chargement..."}
                </span>
                <span className="text-xs text-gray-400">
                    {user?.role === "organizer" ? "Organisateur"
                        : user?.role === "admin" ? "Admin"
                        : "Utilisateur"}
                </span>
            </div>
        </div>

        {/* Séparateur */}
        <div className="w-full px-4 mb-2 flex-shrink-0">
            <div className="border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* Items navigation — flex-1 prend tout l'espace */}
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-start gap-2 w-full pt-2 flex-1 overflow-hidden"
        >
            {items.map((item, index) => (
                <button
                    key={item.id}
                    ref={(el) => { btnRefs.current[item.id] = el; }}
                    onClick={() => setActive(index)}
                    className="relative flex flex-row items-center justify-start gap-3 py-4 px-6 w-full text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                    <div className="z-10">{item.icon}</div>
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}

            <motion.div
                animate={indicatorStyle}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute rounded-xl bg-blue-500/10 dark:bg-blue-400/20"
            />
        </div>

        {/* Séparateur */}
        <div className="w-full px-4 flex-shrink-0">
            <div className="border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* Bouton déconnexion — toujours visible en bas */}
        <div className="flex-shrink-0 p-4">
            <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
            >
                <LogOut size={18} />
                Se déconnecter
            </button>
        </div>
    </div>
);
};

export default FloatingNav;