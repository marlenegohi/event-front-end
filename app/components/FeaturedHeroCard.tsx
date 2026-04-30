"use client";

import { useRouter } from "next/navigation";

type Event = {
    id: number;
    description: string;
    imageUrl: string;
    date: string;
    city: string;
    price: number;
};

type FeaturedHeroCardProps = {
    events: Event[];
};

export const FeaturedHeroCard = ({ events }: FeaturedHeroCardProps) => {
    const router = useRouter();

    const duplicatedEvents = [...events, ...events];

    return (
        <>
            <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .infinite-scroll {
          animation: scroll-right 100s linear infinite;
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .image-item:hover .buy-overlay {
          opacity: 1;
        }

        .buy-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
      `}</style>

            <h2 className="text-2xl font-bold text-blue-500 mb-3">
                À la une
            </h2>
            <div className="w-full h-[320px] bg-white relative overflow-hidden rounded-3xl">
                <div className="relative z-10 w-full flex items-center justify-center py-8">
                    <div className="scroll-container w-full max-w-6xl">
                        <div className="infinite-scroll flex gap-6 w-max">
                            {duplicatedEvents.map((event, index) => (
                                <div
                                    key={`${event.id}-${index}`}
                                    className="image-item relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src={event.imageUrl || "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop"}
                                        alt={event.description}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="buy-overlay absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4 gap-2">
                                        <div className="text-white text-center">
                                            <h3 className="text-sm font-bold mb-1">{event.description}</h3>
                                            <p className="text-xs">{event.city}</p>
                                            <p className="text-xs font-semibold mt-1">{event.price}€</p>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/user/ticket/${event.id}`)}
                                            className="w-3/4 bg-white text-gray-900 text-xs font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            Acheter un billet
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};