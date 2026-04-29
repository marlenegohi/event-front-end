// components/purchase/OrderSummary.tsx

type OrderSummaryProps = {
    quantity: number;
    price: number;
    serviceFee?: number;
    onContinue: () => void;
};

const OrderSummary = ({ quantity, price, serviceFee = 3, onContinue }: OrderSummaryProps) => {
    const subtotal = quantity * price;
    const total = subtotal + serviceFee;

    return (
        <div className="border border-gray-100 rounded-2xl p-4 sticky top-4">
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">
                Récapitulatif
            </div>

            <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between text-gray-400">
                    <span>{quantity} billet{quantity > 1 ? "s" : ""} × {price} €</span>
                    <span>{subtotal} €</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Frais de service</span>
                    <span>{serviceFee} €</span>
                </div>
                <div className="border-t border-gray-100 my-1" />
                <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>{total} €</span>
                </div>
            </div>

            <button
                onClick={onContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-4"
            >
                Continuer →
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1a2.5 2.5 0 00-2.5 2.5V4H2v6h7V4H8.5V3.5A2.5 2.5 0 005.5 1zm0 1a1.5 1.5 0 011.5 1.5V4H4V3.5A1.5 1.5 0 015.5 2z" fill="currentColor" className="text-gray-300"/>
                </svg>
                <span className="text-xs text-gray-300">Paiement sécurisé</span>
            </div>
        </div>
    );
};

export default OrderSummary;