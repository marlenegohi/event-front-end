"use client";
import FloatingNav from "@/app/components/MenuBar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import ListContainer from "@/app/components/ListContainer";
import ListItem from "@/app/components/ListItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ArtistDTO = {
    id: number;
    name: string;
    genre: string;
    biography: string;
    country: string;
};

const colors = [
    "bg-blue-100 text-blue-800",
    "bg-amber-100 text-amber-800",
    "bg-green-100 text-green-800",
    "bg-gray-100 text-gray-600",
    "bg-purple-100 text-purple-800",
];

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function ArtistListContent() {
    const router = useRouter();
    const [artists, setArtists] = useState<ArtistDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("/backend/artist/")
            .then((res) => {
                console.log("Status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Artistes reçus:", data);
                setArtists(data);
            })
            .catch((err) => console.error("Erreur chargement artistes:", err))
            .finally(() => setLoading(false));
    }, []);

    const filtered = artists.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                <ListContainer
                    title="Artistes"
                    subtitle={`${artists.length} artiste${artists.length > 1 ? "s" : ""} disponible${artists.length > 1 ? "s" : ""}`}
                    searchPlaceholder="Rechercher un artiste..."
                    searchValue={query}
                    onSearchChange={setQuery}
                    actionLabel="+ Ajouter"
                    onAction={() => router.push("/organizer/artist/add")}
                    loading={loading}
                    emptyMessage="Aucun artiste trouvé."
                >
                    {filtered.map((artist, index) => (
                        <ListItem
                            key={artist.id}
                            initials={getInitials(artist.name)}
                            color={colors[index % colors.length]}
                            title={artist.name}
                            subtitle={artist.country}
                            badge={artist.genre}
                        />
                    ))}
                </ListContainer>
            </main>
        </div>
    );
}

export default function ArtistsPage() {
    return (
        <ProtectedRoute requiredRole="organizer">
            {() => <ArtistListContent />}
        </ProtectedRoute>
    );
}