// app/organizer/artists/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingNav from "@/app/components/MenuBar";

const genres = ["Pop", "Rock", "Hip-hop", "Jazz", "Classique", "Électro", "R&B", "Metal"];

export default function AddArtistPage() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        nationality: "",
        bio: "",
        instagram: "",
        spotify: "",
    });

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log({ ...form, genres: selectedGenres });
        // appel API ici
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-lg font-medium text-gray-800 dark:text-white">Ajouter un artiste</h1>
                        <p className="text-xs text-gray-400">Renseignez les informations de l'artiste</p>
                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* Colonne gauche */}
                    <div className="flex-1 flex flex-col gap-4">

                        {/* Infos générales */}
                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5">
                            <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Informations générales</div>

                            <div className="flex gap-3 mb-3">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-400 mb-1.5 block">Prénom</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={form.firstName}
                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-gray-400 mb-1.5 block">Nom / Nom de scène</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={form.lastName}
                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="text-xs text-gray-400 mb-1.5 block">Nationalité</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Américain, Français..."
                                    value={form.nationality}
                                    onChange={(e) => handleChange("nationality", e.target.value)}
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block">Biographie</label>
                                <textarea
                                    rows={4}
                                    placeholder="Décrivez l'artiste..."
                                    value={form.bio}
                                    onChange={(e) => handleChange("bio", e.target.value)}
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                                />
                            </div>
                        </div>

                        {/* Genre musical */}
                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5">
                            <div className="text-sm font-medium text-gray-800 dark:text-white mb-3">Genre musical</div>
                            <div className="flex flex-wrap gap-2">
                                {genres.map((genre) => (
                                    <button
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        className={`px-3 py-1.5 rounded-full border text-xs transition-colors
                                            ${selectedGenres.includes(genre)
                                            ? "bg-blue-50 border-blue-400 text-blue-700 font-medium"
                                            : "border-gray-200 text-gray-400 hover:bg-gray-50"
                                        }`}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="w-52 flex-shrink-0 flex flex-col gap-4">

                        {/* Photo */}
                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                            <div className="text-sm font-medium text-gray-800 dark:text-white mb-3">Photo de l'artiste</div>
                            <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
                                <div className="text-2xl mb-2 opacity-30">+</div>
                                <div className="text-xs">Glissez une photo</div>
                                <div className="text-xs mt-1 opacity-60">PNG, JPG — max 5MB</div>
                            </div>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                            <div className="text-sm font-medium text-gray-800 dark:text-white mb-3">Réseaux sociaux</div>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Instagram</label>
                                    <input
                                        type="text"
                                        placeholder="@artiste"
                                        value={form.instagram}
                                        onChange={(e) => handleChange("instagram", e.target.value)}
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Spotify</label>
                                    <input
                                        type="text"
                                        placeholder="lien Spotify"
                                        value={form.spotify}
                                        onChange={(e) => handleChange("spotify", e.target.value)}
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                    >
                        Enregistrer l'artiste
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-6 py-2.5 rounded-lg transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </main>
        </div>
    );
}