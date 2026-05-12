"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import { useState, useEffect } from "react";
import { AuthUser } from "@/app/components/ProtectedRoute";
import TicketCard from "@/app/components/TcketCard";
import { FeaturedHeroCard } from "@/app/components/FeaturedHeroCard";
import { useRouter } from "next/navigation";

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
    place: number;
    description: string;
    address: string;
    imageUrl: string;
    date: string;
    city: string;
    price: number;
    createdAt: string;
    artisteName: string[];
    organizerName: string[];
    ticketCount: number;
    organizerId: number;
};

const FILTERS = ["Tous", "Rock", "Pop", "Jazz", "Hip-hop", "Classique"];

function UserDashboardContent({ user }: { user: AuthUser }) {
    const router = useRouter();
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [searchResults, setSearchResults] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("Tous");
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        fetch(`/backend/ticket/client/${user.id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur chargement tickets");
                return res.json();
            })
            .then((data) => setTickets(data))
            .catch(() => setError("Impossible de charger vos billets."))
            .finally(() => setLoading(false));

        fetch("/backend/event/")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch(() => console.error("Erreur chargement events"));
    }, [user.id]);

    const handleSearch = async () => {
        if (!query.trim() && activeFilter === "Tous") return;

        setSearching(true);
        setHasSearched(true);

        try {

            if (query.trim()) {
                // Cherche par ville ou artiste selon le contenu
                const cityRes = await fetch(`/backend/event/city/${encodeURIComponent(query.trim())}`);
                const artistRes = await fetch(`/backend/event/search?artist=${encodeURIComponent(query.trim())}`);

                const cityData = cityRes.ok ? await cityRes.json() : [];
                const artistData = artistRes.ok ? await artistRes.json() : [];

                // Fusionne et déduplique
                const merged = [...cityData, ...artistData];
                const unique = merged.filter(
                    (e, i, arr) => arr.findIndex((x) => x.id === e.id) === i
                );
                setSearchResults(unique);
            } else {
                // Filtre par genre (artiste)
                const res = await fetch(`/backend/event/search?artist=${encodeURIComponent(activeFilter)}`);
                const data = res.ok ? await res.json() : [];
                setSearchResults(data);
            }
        } catch {
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleReset = () => {
        setQuery("");
        setActiveFilter("Tous");
        setHasSearched(false);
        setSearchResults([]);
    };

    return (
        <div className="w-screen min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 p-6 space-y-4">

                <div>
                    <p className="text-sm text-gray-400">
                        Bonjour, <span className="font-medium text-gray-600">{user.name}</span>
                    </p>
                </div>

                {events.length > 0 && <FeaturedHeroCard events={events} />}

                {/* SearchBar connectée */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Rechercher un concert, un artiste, un lieu..."
                            className="flex-1 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                        >
                            Rechercher
                        </button>
                        {hasSearched && (
                            <button
                                onClick={handleReset}
                                className="text-xs text-gray-400 hover:text-gray-600 px-3"
                            >
                                Réinitialiser
                            </button>
                        )}
                    </div>

                    {/* Filtres */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400">Filtrer par</span>
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                                    activeFilter === f
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "border-gray-300 text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                        <span className="text-gray-300 mx-1">|</span>
                        {["Lieu", "Date", "Prix"].map((f) => (
                            <button
                                key={f}
                                className="px-3 py-1 rounded-full text-xs border border-gray-300 text-gray-500 hover:bg-gray-50"
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Résultats de recherche */}
                {hasSearched && (
                    <div>
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                            Résultats de recherche
                        </h2>
                        {searching && <p className="text-xs text-gray-400">Recherche en cours...</p>}
                        {!searching && searchResults.length === 0 && (
                            <p className="text-xs text-gray-400">Aucun événement trouvé.</p>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            {searchResults.map((event) => (
                                <div
                                    key={event.id}
                                    onClick={() => router.push(`/user/ticket/${event.id}`)}
                                    className="flex items-center gap-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-3 cursor-pointer hover:border-blue-300 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                        {event.imageUrl ? (
                                            <img src={event.imageUrl} alt={event.description} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{event.description}</p>
                                        <p className="text-xs text-gray-400">📍 {event.address}, {event.city}</p>
                                        <p className="text-xs text-blue-600 font-medium mt-0.5">{event.price} €</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mes billets */}
                {loading && <p className="text-xs text-gray-400">Chargement...</p>}
                {error && <p className="text-xs text-red-400">{error}</p>}

                {!loading && !error && !hasSearched && (
                    <>
                        <h1 className="text-2xl font-bold text-blue-500">Mes billets</h1>
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