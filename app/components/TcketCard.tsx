type TicketCardProps = {
    image: string;
    date: string;
    description: string;
    venue: string;
    city: string;
    price: number;
    status: string;
};

const TicketCard = ({ image, date, description, venue, city, price, status }: TicketCardProps) => {
    return (
        <div className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-neutral-800 rounded-2xl p-3 w-full">
            {/* Image */}
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                {image ? (
                    <img src={image} alt={description} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-blue-100" />
                )}
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-gray-400">{date}</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{description}</span>
                <div className="flex flex-row items-center gap-1 text-xs text-gray-400">
                    <span>📍</span>
                    <span>{venue}, {city}</span>
                </div>
            </div>

            {/* Prix + statut */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-sm font-medium text-gray-800 dark:text-white">{price} €</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    status === "SOLD"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                }`}>
                    {status === "SOLD" ? "Acheté" : status}
                </span>
            </div>
        </div>
    );
};

export default TicketCard;