"use client";
import { useState } from "react";

const genres = ["Tous", "Rock", "Pop", "Jazz", "Hip-hop", "Classique"];

const SearchBar = () => {
    const [activeGenre, setActiveGenre] = useState("Tous");

    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4 flex flex-col gap-3">
            {/* Barre de recherche */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-xl px-4 py-2.5">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-40 flex-shrink-0">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Rechercher un concert, un artiste, un lieu..."
                        className="bg-transparent outline-none text-sm text-gray-800 dark:text-white w-full placeholder-gray-300"
                    />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                    Rechercher
                </button>
            </div>

            {/* Filtres */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-300 mr-1">Filtrer par</span>

                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setActiveGenre(genre)}
                        className={`px-3 py-1.5 rounded-full border text-xs transition-colors
                            ${activeGenre === genre
                            ? "bg-blue-50 border-blue-400 text-blue-700 font-medium"
                            : "border-gray-200 text-gray-400 hover:bg-gray-50"
                        }`}
                    >
                        {genre}
                    </button>
                ))}

                <div className="w-px h-4 bg-gray-100 mx-1" />

                {["Lieu", "Date", "Prix"].map((f) => (
                    <button key={f} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-400 hover:bg-gray-50 transition-colors">
                        {f}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;