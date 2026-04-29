// components/purchase/ConcertSummaryCard.tsx

type ConcertSummaryCardProps = {
    name: string;
    date: string;
    venue: string;
    price: number;
    image?: string;
};

const ConcertSummaryCard = ({ name, date, venue, price, image }: ConcertSummaryCardProps) => {
    return (
        <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 bg-blue-100 overflow-hidden`}>
                {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 dark:text-white">{name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{date} · {venue}</div>
            </div>
            <div className="text-right flex-shrink-0">
                <div className="text-base font-medium text-gray-800 dark:text-white">{price} €</div>
                <div className="text-xs text-gray-400">par billet</div>
            </div>
        </div>
    );
};

export default ConcertSummaryCard;