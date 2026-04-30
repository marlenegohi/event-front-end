import TicketCard from "@/app/components/TcketCard";

type TicketData = {
    id: number;
    eventDescription: string;
    eventDate: string;
    eventCity: string;
    eventAddress: string;
    eventImageUrl: string;
    clientName: string;
};

type TicketListProps = {
    tickets: TicketData[];
    loading?: boolean;
};

const TicketList = ({ tickets, loading = false }: TicketListProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-500 mb-3">
                Mes billets
            </h2>
            {loading ? (
                <p className="text-gray-400 dark:text-gray-500 text-sm">Chargement de vos billets...</p>
            ) : tickets.length === 0 ? (
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Vous n'avez pas encore de billets. Achetez-en un depuis la section "À la une" !
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            image={ticket.eventImageUrl}
                            date={ticket.eventDate}
                            artist={ticket.eventDescription}
                            venue={`${ticket.eventAddress}, ${ticket.eventCity}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketList;