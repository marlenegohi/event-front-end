"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, Bell, User, Settings, Bookmark } from "lucide-react";

const FloatingNav = () => {
    const [active, setActive] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ height: 0, top: 0, left: 0, width: 0});
    const containerRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const items = [
        { id: 0, icon: <Home size={22} />, label: "Home" },
        { id: 1, icon: <Search size={22} />, label: "Search" },
        { id: 2, icon: <Bell size={22} />, label: "Alerts" },
        { id: 3, icon: <User size={22} />, label: "Profile" },
        { id: 4, icon: <Bookmark size={22} />, label: "Saved" },
        { id: 5, icon: <User size={22} />, label: "Profile" },
        { id: 6, icon: <Settings size={22} />, label: "Settings" },
    ];

    // Update indicator position when active changes or resize
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
                    top : btnRect.top - containerRect.top,
                    left: 0,   // dépasse du bord gauche du conteneur
                    width: containerRect.width,
                });
            }
        };

        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [active]);

    return (
            <div className="fixed left-0 top-0 z-50 h-screen w-64">
                    <div className="flex flex-row items-center w-full px-6 py-4 gap-3 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                            <img src="https://i.pravatar.cc/150" alt="avatar" className="w-full h-full object-cover"/>
                        </div>

                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            John Doe
                        </span>
                    </div>

                {/* séparateur */}
                <div className="w-full px-4 mb-2">
                    <div className="border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div
                    ref={containerRef}
                    className="relative flex flex-col items-center justify-start gap-2 h-full w-full pt-2"
                >
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        ref={(el) => {
                            btnRefs.current[item.id] = el;
                        }}
                        onClick={() => setActive(index)}
                        className="relative flex flex-row items-center justify-start gap-3 py-4 px-6 w-full text-sm font-medium text-gray-600 dark:text-gray-300">
                        <div className="z-10">{item.icon}</div>
                        {/* hide labels on small screens */}
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                ))}

                {/* Sliding Active Indicator */}
                <motion.div
                    animate={indicatorStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute rounded-xl bg-blue-500/10 dark:bg-blue-400/20"
                />
            </div>
        </div>
    );
};

export default FloatingNav;
