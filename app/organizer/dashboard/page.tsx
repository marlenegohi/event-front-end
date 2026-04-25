"use client";
import NoSSR from "@/app/components/NoSSR";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import StatCard from "@/app/components/StatCard";
import FloatingNav from "@/app/components/MenuBar";

const concerts = [
    { id: 1, name: "Dua Lipa — Paris", date: "26 Jan 2025", venue: "Accor Arena", sold: 320, total: 400, status: "À venir", color: "bg-blue-100" },
    { id: 2, name: "Imagine Dragons — Lyon", date: "13 Fév 2025", venue: "Halle Tony Garnier", sold: 540, total: 600, status: "En cours", color: "bg-amber-100" },
    { id: 3, name: "The Weeknd — Bordeaux", date: "2 Mar 2025", venue: "Arkéa Arena", sold: 800, total: 800, status: "Terminé", color: "bg-gray-100" },
];

const badgeClass: Record<string, string> = {
    "À venir": "bg-green-100 text-green-700",
    "En cours": "bg-amber-100 text-amber-700",
    "Terminé": "bg-gray-200 text-gray-500",
};

export default function OrganizerDashboard() {
    return (
        <NoSSR>
            <ProtectedRoute requiredRole="organizer">
                {(user) => (
                    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
                        <FloatingNav />
                        <main className="ml-64 flex-1 p-6 space-y-6">
                            <div className="mb-5">
                                <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                                    Dashboard
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Bienvenue, <span className="font-medium text-gray-600">{user.name}</span> — voici vos stats du mois
                                </p>
                            </div>

                            <div className="flex gap-3 mb-6">
                                <StatCard label="Concerts" value="8" sub="+2 ce mois" />
                                <StatCard label="Billets vendus" value="1 240" sub="+18% vs mois dernier" />
                                <StatCard label="Revenus" value="24 800 €" sub="+12% vs mois dernier" />
                            </div>

                            <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white mb-4">
                                    Concerts récents
                                </h2>
                                <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-800">
                                    {concerts.map((c) => (
                                        <div key={c.id} className="flex items-center gap-3 py-3">
                                            <div className={`w-9 h-9 rounded-lg ${c.color} flex-shrink-0`} />
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-800 dark:text-white">
                                                    {c.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {c.date} · {c.venue}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 mr-2">
                                                {c.sold}/{c.total}
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeClass[c.status]}`}>
                                                {c.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                )}
            </ProtectedRoute>
        </NoSSR>
    );
}