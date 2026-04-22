import OrganizerLayout from "@/app/components/OrganizerLayout";
import StatCard from "@/app/components/StatCard";

const buyers = [
    { initials: "MA", name: "Marie A.", tickets: 2, color: "bg-blue-100 text-blue-800" },
    { initials: "PB", name: "Paul B.", tickets: 1, color: "bg-green-100 text-green-800" },
    { initials: "SC", name: "Sara C.", tickets: 4, color: "bg-amber-100 text-amber-800" },
];

const months = ["Nov", "Déc", "Jan", "Fév", "Mar", "Avr"];
const heights = [30, 45, 55, 60, 70, 80];

export default function ConcertDetail() {
    return (
        <OrganizerLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex-shrink-0" />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-medium text-gray-800 dark:text-white">Dua Lipa — Paris</h1>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">À venir</span>
                    </div>
                    <p className="text-xs text-gray-400">26 Jan 2025 · Accor Arena · 45 €/billet</p>
                </div>
                <button className="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                    Modifier
                </button>
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-5">
                <StatCard label="Billets vendus" value="320" />
                <StatCard label="Places restantes" value="80" />
                <StatCard label="Revenus" value="14 400 €" />
                <StatCard label="Taux de remplissage" value="80%" />
            </div>

            {/* Graphique + acheteurs */}
            <div className="flex gap-4">
                {/* Graphique */}
                <div className="flex-1 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Évolution des ventes</h2>
                    <div className="flex items-end gap-2 h-24">
                        {heights.map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className={`w-full rounded-t-sm ${i === heights.length - 1 ? "bg-blue-600" : "bg-blue-200"}`}
                                    style={{ height: `${h}%` }}
                                />
                                <span className="text-xs text-gray-300">{months[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Acheteurs */}
                <div className="w-52 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Derniers acheteurs</h2>
                    <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-800">
                        {buyers.map((b) => (
                            <div key={b.initials} className="flex items-center gap-3 py-2.5">
                                <div className={`w-7 h-7 rounded-full ${b.color} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
                                    {b.initials}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-800 dark:text-white">{b.name}</div>
                                    <div className="text-xs text-gray-400">{b.tickets} billet{b.tickets > 1 ? "s" : ""}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </OrganizerLayout>
    );
}