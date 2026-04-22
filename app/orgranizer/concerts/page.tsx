import OrganizerLayout from "@/app/components/OrganizerLayout";
import Link from "next/link";

const concerts = [
    { id: 1, name: "Dua Lipa — Paris", date: "26 Jan 2025", venue: "Accor Arena", price: "45", sold: 320, total: 400, status: "À venir", color: "bg-blue-100", progress: 80 },
    { id: 2, name: "Imagine Dragons — Lyon", date: "13 Fév 2025", venue: "Halle Tony Garnier", price: "60", sold: 540, total: 600, status: "En cours", color: "bg-amber-100", progress: 90 },
    { id: 3, name: "The Weeknd — Bordeaux", date: "2 Mar 2025", venue: "Arkéa Arena", price: "75", sold: 800, total: 800, status: "Terminé", color: "bg-gray-100", progress: 100 },
];

const badgeClass: Record<string, string> = {
    "À venir": "bg-green-100 text-green-700",
    "En cours": "bg-amber-100 text-amber-700",
    "Terminé": "bg-gray-200 text-gray-500",
};

const progressColor: Record<string, string> = {
    "À venir": "bg-blue-500",
    "En cours": "bg-amber-500",
    "Terminé": "bg-gray-400",
};

export default function MesConcerts() {
    return (
        <OrganizerLayout>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-xl font-medium text-gray-800 dark:text-white">Mes concerts</h1>
                    <p className="text-sm text-gray-400">8 événements au total</p>
                </div>
                <Link href="/orgranizer/create" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    + Nouveau concert
                </Link>
            </div>

            {/* Filtres */}
            <div className="flex gap-2 mb-4">
                {["Tous", "À venir", "En cours", "Terminés"].map((f) => (
                    <button key={f} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                        {f}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
                {concerts.map((c) => (
                    <div key={c.id} className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4 flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl ${c.color} flex-shrink-0`} />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-800 dark:text-white">{c.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass[c.status]}`}>{c.status}</span>
                            </div>
                            <div className="text-xs text-gray-400 mb-2">{c.date} · {c.venue} · {c.price} €/billet</div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${progressColor[c.status]}`} style={{ width: `${c.progress}%` }} />
                                </div>
                                <span className="text-xs text-gray-400">{c.sold}/{c.total}</span>
                            </div>
                        </div>
                        <Link href={`/organizer/concerts/${c.id}`} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                            Voir détail
                        </Link>
                    </div>
                ))}
            </div>
        </OrganizerLayout>
    );
}