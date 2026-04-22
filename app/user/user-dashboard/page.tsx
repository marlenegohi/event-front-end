import {FeaturedHeroCard} from "@/app/components/FeaturedHeroCard";
import FloatingNav from "@/app/components/MenuBar";
import TicketList from "@/app/components/TicketList";
import SearchBar from "@/app/components/SearchBar";

export default function UserDashboard() {
    const tickets = [
        { image: "https://i.pravatar.cc/150?img=1", date: "January 26, 2020", artist: "Dua Lipa", venue: "Omeara" },
        { image: "https://i.pravatar.cc/150?img=2", date: "February 13, 2020", artist: "Imagine Dragons", venue: "O2 Academy Islington" },
        { image: "https://i.pravatar.cc/150?img=3", date: "March 2, 2020", artist: "The Weeknd", venue: "London Palladium" },
        { image: "https://i.pravatar.cc/150?img=4", date: "April 8, 2020", artist: "Parkway Drive", venue: "The Roundhouse" },
    ];

    return (
        <div className="w-screen min-h-screen bg-gray-50">
            <FloatingNav />
            <main className="ml-64 p-6 space-y-6">
                <FeaturedHeroCard />
                <SearchBar />
                <TicketList tickets={tickets} />
            </main>
        </div>
    );
}