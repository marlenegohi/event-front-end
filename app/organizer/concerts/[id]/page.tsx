"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import StatCard from "@/app/components/StatCard";
import { AuthUser } from "@/app/components/ProtectedRoute";

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
    artisteName: string[];
};

type TicketDTO = {
    id: number;
    clientName: string;
    purchaseDate: string;
    status: string;
};

function getEventStatus(dateStr: string): string {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 0) return "À venir";
    if (days > -1) return "En cours";
    return "Terminé";
}

const badgeClass: Record<string, string> = {
    "À venir": "bg-green-100 text-green-700",
    "En cours": "bg-amber-100 text-amber-700",
    "Terminé": "bg-gray-200 text-gray-500",
};

function ConcertDetailContent({ user }: { user: AuthUser }) {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [event, setEvent] = useState<EventDTO | null>(null);
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Charge l'event
        fetch(`/backend/event/${eventId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Événement introuvable");
                return res.json();
            })
            .then((data) => setEvent(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));

        // Charge les tickets de cet event
        fetch(`/backend/ticket/event/${eventId}`)
            .then((res) => res.ok ? res.json() : [])
            .then((data) => setTickets(data))
            .catch(() => setTickets([]));
    }, [eventId]);

    if (loading) return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Chargement...</p>
            </main>
        </div>
    );

    if (error || !event) return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 text-sm mb-4">{error ?? "Événement introuvable"}</p>
                    <button onClick={() => router.back()}
                        className="text-xs text-blue-600 hover:underline">
                        Retour
                    </button>
                </div>
            </main>
        </div>
    );

    const status = getEventStatus(event.date);
    const revenue = event.ticketCount * event.price;
    const remaining = event.place - event.ticketCount;
    const fillRate = Math.round((event.ticketCount / event.place) * 100);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => router.back()}
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-blue-100">
                        {event.imageUrl ? (
                            <img src={event.imageUrl} alt={event.description} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-100" />
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                                {event.description}
                            </h1>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass[status]}`}>
                                {status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400">
                            {event.date ? new Date(event.date).toLocaleDateString("fr-FR", {
                                day: "numeric", month: "long", year: "numeric"
                            }) : "—"} · {event.address}, {event.city} · {event.price} €/billet
                        </p>
                        {event.artisteName?.length > 0 && (
                            <p className="text-xs text-blue-500 mt-0.5">
                                🎤 {event.artisteName.join(", ")}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => router.push(`/organizer/concerts/${eventId}/edit`)}
                        className="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Modifier
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-3 mb-5">
                    <StatCard label="Billets vendus" value={String(event.ticketCount)} sub={`sur ${event.place} places`} />
                    <StatCard label="Places restantes" value={String(remaining)} />
                    <StatCard label="Revenus" value={`${revenue.toLocaleString("fr-FR")} €`} />
                    <StatCard label="Taux de remplissage" value={`${fillRate}%`} />
                </div>

                {/* Derniers acheteurs */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
                        Derniers acheteurs ({tickets.length})
                    </h2>

                    {tickets.length === 0 ? (
                        <p className="text-xs text-gray-400">Aucun acheteur pour le moment.</p>
                    ) : (
                        <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-800">
                            {tickets.slice(0, 10).map((t) => {
                                const initials = t.clientName
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2) ?? "?";
                                return (
                                    <div key={t.id} className="flex items-center gap-3 py-2.5">
                                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                            {initials}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-800 dark:text-white">
                                                {t.clientName ?? "Client inconnu"}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {t.purchaseDate
                                                    ? new Date(t.purchaseDate).toLocaleDateString("fr-FR")
                                                    : "—"}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{t.status}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function ConcertDetailPage() {
    return (
        <ProtectedRoute requiredRole="organizer">
            {(user) => <ConcertDetailContent user={user} />}
        </ProtectedRoute>
    );
}