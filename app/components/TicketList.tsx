import TicketCard from "@/app/components/TcketCard";

type Ticket = {
    image: string;
    date: string;
    artist: string;
    venue: string;
};

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-500 mb-3">
                Mes billets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.map((ticket, index) => (
                    <TicketCard key={index} {...ticket} />
                ))}
            </div>
        </div>
    );
};

export default TicketList;