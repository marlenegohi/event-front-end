// app/user/user-dashboard/page.tsx
"use client";
import NoSSR from "@/app/components/NoSSR";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import TicketList from "@/app/components/TicketList";
import SearchBar from "@/app/components/SearchBar";
import {FeaturedHeroCard} from "@/app/components/FeaturedHeroCard";

const tickets = [
    { image: "https://i.pravatar.cc/150?img=1", date: "January 26, 2020", artist: "Dua Lipa", venue: "Omeara" },
    { image: "https://i.pravatar.cc/150?img=2", date: "February 13, 2020", artist: "Imagine Dragons", venue: "O2 Academy Islington" },
    { image: "https://i.pravatar.cc/150?img=3", date: "March 2, 2020", artist: "The Weeknd", venue: "London Palladium" },
    { image: "https://i.pravatar.cc/150?img=4", date: "April 8, 2020", artist: "Parkway Drive", venue: "The Roundhouse" },
];

export default function UserDashboard() {
    return (
        <NoSSR>
            <ProtectedRoute requiredRole="user">
                {(user) => (
                    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
                        <FloatingNav />
                        <main className="ml-64 flex-1 p-6 space-y-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Bonjour, <span className="font-medium text-gray-800 dark:text-white">{user.name}</span>
                            </p>
                            <FeaturedHeroCard />
                            <SearchBar />
                            <TicketList tickets={tickets} />
                        </main>
                    </div>
                )}
            </ProtectedRoute>
        </NoSSR>
    );
}