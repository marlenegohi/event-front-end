"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import SearchBar from "@/app/components/SearchBar";
import { useState, useEffect } from "react";
import { AuthUser } from "@/app/components/ProtectedRoute";
import TicketCard from "@/app/components/TcketCard";
import { FeaturedHeroCard } from "@/app/components/FeaturedHeroCard";

type TicketDTO = {
    id: number;
    status: string;
    purchaseDate: string;
    eventId: number;
    eventDescription: string;
    eventImageUrl: string;
    eventAddress: string;
    eventCity: string;
    eventPrice: number;
    eventDate: string;
};

type EventDTO = {
    id: number;
    description: string;
    imageUrl: string;
    date: string;
    city: string;
    price: number;
};

function UserDashboardContent({ user }: { user: AuthUser }) {
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Charge les tickets du client
        fetch(`/backend/ticket/client/${user.id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur chargement tickets");
                return res.json();
            })
            .then((data) => setTickets(data))
            .catch(() => setError("Impossible de charger vos billets."))
            .finally(() => setLoading(false));

        // Charge tous les events pour le carousel
        fetch("/backend/event/")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch(() => console.error("Erreur chargement events"));
    }, [user.id]);

    return (
        <div className="w-screen min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 p-6 space-y-4">

                {/* Header */}
                <div>
                    <p className="text-sm text-gray-400">
                        Bonjour, <span className="font-medium text-gray-600">{user.name}</span>
                    </p>
                </div>

                {/* Carousel des events — juste après le bonjour */}
                {events.length > 0 && <FeaturedHeroCard events={events} />}

                <SearchBar />

                {loading && <p className="text-xs text-gray-400">Chargement...</p>}
                {error && <p className="text-xs text-red-400">{error}</p>}

                {!loading && !error && (
                    <>
                        <h1 className="text-2xl font-bold text-blue-500 mb-3">
                            Mes billets
                        </h1>

                        {tickets.length === 0 ? (
                            <p className="text-xs text-gray-400">
                                Vous n&apos;avez pas encore de billets.
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                {tickets.map((ticket) => (
                                    <TicketCard
                                        key={ticket.id}
                                        image={ticket.eventImageUrl ?? ""}
                                        date={ticket.eventDate
                                            ? new Date(ticket.eventDate).toLocaleDateString("fr-FR", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            })
                                            : "—"
                                        }
                                        description={ticket.eventDescription ?? "—"}
                                        venue={ticket.eventAddress ?? "—"}
                                        city={ticket.eventCity ?? "—"}
                                        price={ticket.eventPrice ?? 0}
                                        status={ticket.status}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default function UserDashboard() {
    return (
        <ProtectedRoute requiredRole="user">
            {(user) => <UserDashboardContent user={user} />}
        </ProtectedRoute>
    );
}