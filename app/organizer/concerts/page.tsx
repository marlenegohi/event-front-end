"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import ListContainer from "@/app/components/ListContainer";
import ListItem from "@/app/components/ListItem";
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

function getEventStatus(dateStr: string): string {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    const daysDiff = diff / (1000 * 60 * 60 * 24);
    if (daysDiff > 0) return "À venir";
    if (daysDiff > -1) return "En cours";
    return "Terminé";
}

function ConcertsListContent({ user }: { user: AuthUser }) {
    const router = useRouter();
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

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

    const filtered = events.filter((e) =>
        e.description.toLowerCase().includes(query.toLowerCase()) ||
        e.city.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
                <ListContainer
                    title="Mes concerts"
                    subtitle={`${events.length} concert${events.length > 1 ? "s" : ""} au total`}
                    searchPlaceholder="Rechercher un concert ou une ville..."
                    searchValue={query}
                    onSearchChange={setQuery}
                    actionLabel="+ Créer un concert"
                    onAction={() => router.push("/organizer/create")}
                    loading={loading}
                    emptyMessage="Aucun concert trouvé."
                >
                    {filtered.map((c) => (
                        <ListItem
                            key={c.id}
                            initials={c.description.slice(0, 2).toUpperCase()}
                            color="bg-blue-100 text-blue-800"
                            title={c.description}
                            subtitle={`${c.date ? new Date(c.date).toLocaleDateString("fr-FR") : "—"} · ${c.city} · ${c.price} €`}
                            badge={getEventStatus(c.date)}
                            onClick={() => router.push(`/organizer/concerts/${c.id}`)}
                        />
                    ))}
                </ListContainer>
            </main>
        </div>
    );
}

export default function ConcertsPage() {
    return (
        <ProtectedRoute requiredRole="organizer">
            {(user) => <ConcertsListContent user={user} />}
        </ProtectedRoute>
    );
}