// components/purchase/TicketSelector.tsx
"use client";

type TicketSelectorProps = {
    quantity: number;
    price: number;
    available: number;
    max?: number;
    onChange: (qty: number) => void;
};

const TicketSelector = ({ quantity, price, available, max = 8, onChange }: TicketSelectorProps) => {
    const handleMinus = () => {
        if (quantity > 1) onChange(quantity - 1);
    };

    const handlePlus = () => {
        if (quantity < max && quantity < available) onChange(quantity + 1);
    };

    return (
        <div className="border border-gray-100 rounded-2xl p-4">
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">
                Nombre de billets
            </div>

            <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800 rounded-xl px-4 py-3">
                <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                        Billet standard
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                        {price} € / billet · {available} places disponibles
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleMinus}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white text-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >
                        −
                    </button>
                    <span className="text-base font-medium text-gray-800 dark:text-white min-w-[20px] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={handlePlus}
                        disabled={quantity >= max || quantity >= available}
                        className="w-8 h-8 rounded-lg border border-transparent bg-blue-600 text-white text-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-green-50 rounded-lg">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#3B6D11" strokeWidth="1.1"/>
                    <path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="#3B6D11" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs text-green-800">Maximum {max} billets par commande</span>
            </div>
        </div>
    );
};

export default TicketSelector;