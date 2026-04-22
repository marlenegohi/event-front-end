type TicketCardProps = {
    image: string;
    date: string;
    artist: string;
    venue: string;
};

const TicketCard = ({ image, date, artist, venue }: TicketCardProps) => {
    return (
            <div className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-neutral-800 rounded-2xl p-3 w-full">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={image} alt={artist} className="w-full h-full object-cover" />
                </div>

                {/* Infos */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">{date}</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{artist}</span>
                    <div className="flex flex-row items-center gap-1 text-xs text-gray-400">
                        <span>📍</span>
                        <span>{venue}</span>
                    </div>
                </div>
            </div>
    );
};

export default TicketCard;