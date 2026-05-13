"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import ListContainer from "@/app/components/ListContainer";
import ListItem from "@/app/components/ListItem";
import { useState, useEffect } from "react";
import { AuthUser } from "@/app/components/ProtectedRoute";

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

const statusColor: Record<string, string> = {
    "VALID": "bg-green-100 text-green-800",
    "USED": "bg-gray-100 text-gray-500",
    "CANCELLED": "bg-red-100 text-red-700",
};

function TicketsListContent({ user }: { user: AuthUser }) {
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch(`/backend/ticket/client/${user.id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur chargement tickets");
                return res.json();
            })
            .then((data) => setTickets(data))
            .catch(() => setError("Impossible de charger vos billets."))
            .finally(() => setLoading(false));
    }, [user.id]);

    const filtered = tickets.filter((t) =>
        t.eventDescription?.toLowerCase().includes(query.toLowerCase()) ||
        t.eventCity?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
                <ListContainer
                    title="Mes billets"
                    subtitle={`${tickets.length} billet${tickets.length > 1 ? "s" : ""} au total`}
                    searchPlaceholder="Rechercher un concert ou une ville..."
                    searchValue={query}
                    onSearchChange={setQuery}
                    loading={loading}
                    emptyMessage="Vous n'avez pas encore de billets."
                >
                    {filtered.map((ticket) => (
                        <ListItem
                            key={ticket.id}
                            initials={ticket.eventDescription?.slice(0, 2).toUpperCase() ?? "??"}
                            color={statusColor[ticket.status] ?? "bg-blue-100 text-blue-800"}
                            title={ticket.eventDescription ?? "—"}
                            subtitle={`${ticket.eventDate
                                ? new Date(ticket.eventDate).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })
                                : "—"} · ${ticket.eventCity ?? "—"} · ${ticket.eventPrice ?? 0} €`}
                            badge={ticket.status}
                        />
                    ))}
                </ListContainer>
            </main>
        </div>
    );
}

export default function TicketsPage() {
    return (
        <ProtectedRoute requiredRole="user">
            {(user) => <TicketsListContent user={user} />}
        </ProtectedRoute>
    );
}