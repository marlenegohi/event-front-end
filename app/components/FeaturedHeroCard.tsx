"use client";

import { useRouter } from "next/navigation";

export const FeaturedHeroCard = () => {
    const router = useRouter();

    const images = [
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const duplicatedImages = [...images, ...images];

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
                            {duplicatedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="image-item relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${(index % images.length) + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="buy-overlay absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                        <button
                                            onClick={() => router.push(`/concerts/${(index % images.length) + 1}/purchase`)}
                                            className="w-full bg-white text-gray-900 text-xs font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
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