"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import StatCard from "@/app/components/StatCard";
import FloatingNav from "@/app/components/MenuBar";
import { useState, useEffect } from "react";
import { AuthUser } from "@/app/components/ProtectedRoute";
import { useRouter } from "next/navigation";

type EventDTO = {
    id: number;
    description: string;
    date: string;
    address: string;
    city: string;
    price: number;
    place: number;
    imageUrl: string;
    ticketCount: number;
    organizerName: string[];
};

const badgeClass: Record<string, string> = {
    "À venir": "bg-green-100 text-green-700",
    "En cours": "bg-amber-100 text-amber-700",
    "Terminé": "bg-gray-200 text-gray-500",
};

function getEventStatus(dateStr: string): string {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const daysDiff = diff / (1000 * 60 * 60 * 24);
    if (daysDiff > 0) return "À venir";
    if (daysDiff > -1) return "En cours";
    return "Terminé";
}

function DashboardContent({ user }: { user: AuthUser }) {
    const router = useRouter();
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/backend/event/organizer/${user.id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setEvents(data))
            .catch((err) => setError(`Erreur: ${err.message}`))
            .finally(() => setLoading(false));
    }, [user.id]);

    const totalTicketsSold = events.reduce((acc, e) => acc + e.ticketCount, 0);
    const totalRevenue = events.reduce((acc, e) => acc + e.ticketCount * e.price, 0);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6 space-y-6">

                {/* Header avec boutons */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-400">
                            Bienvenue, <span className="font-medium text-gray-600">{user.name}</span> — voici vos stats du mois
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => router.push("/organizer/artist/add")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm hover:bg-gray-50 transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                                <path d="M7 4.5v5M4.5 7h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            Ajouter un artiste
                        </button>
                        <button
                            onClick={() => router.push("/organizer/create")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-none bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="white" strokeWidth="1.2"/>
                                <path d="M7 4.5v5M4.5 7h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            Créer un concert
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-3">
                    <StatCard label="Concerts" value={String(events.length)} sub="total créés" />
                    <StatCard label="Billets vendus" value={String(totalTicketsSold)} sub="total billets" />
                    <StatCard label="Revenus potentiels" value={`${totalRevenue.toLocaleString("fr-FR")} €`} sub="basé sur les places vendues" />
                </div>

                {/* Liste concerts */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Mes concerts</h2>

                    {loading && <p className="text-xs text-gray-400 text-center py-4">Chargement...</p>}
                    {error && <p className="text-xs text-red-400 text-center py-4">{error}</p>}
                    {!loading && !error && events.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-4">Aucun concert créé pour le moment.</p>
                    )}

                    <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-800">
                        {events.slice(0, 3).map((c) => {
                            const status = getEventStatus(c.date);
                            return (
                                <div key={c.id} className="flex items-center gap-3 py-3">
                                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                        {c.imageUrl ? (
                                            <img src={c.imageUrl} alt={c.description} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-800 dark:text-white">{c.description}</div>
                                        <div className="text-xs text-gray-400">
                                            {c.date ? new Date(c.date).toLocaleDateString("fr-FR") : "—"} · {c.address}, {c.city}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 mr-2">{c.ticketCount}/{c.place} billets</div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeClass[status]}`}>
                                        {status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {events.length > 3 && (
                    <button
                        onClick={() => router.push("/organizer/concerts")}
                        className="w-full text-xs text-blue-600 hover:text-blue-700 text-center pt-3 border-t border-gray-100 mt-2"
                    >
                        Voir tous les concerts ({events.length}) →
                    </button>
                )}
            </main>
        </div>
    );
}

export default function OrganizerDashboard() {
    return (
        <ProtectedRoute requiredRole="organizer">
            {(user) => <DashboardContent user={user} />}
        </ProtectedRoute>
    );
}