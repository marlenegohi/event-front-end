// components/purchase/PurchaseStepper.tsx
"use client";

type PurchaseStepperProps = {
    currentStep: number;
    onStepClick: (step: number) => void;
};

const steps = [
    { id: 1, label: "Concert" },
    { id: 2, label: "Billets" },
    { id: 3, label: "Paiement" },
    { id: 4, label: "Confirmation" },
];

const PurchaseStepper = ({ currentStep, onStepClick }: PurchaseStepperProps) => {
    return (
        <div className="flex items-start gap-0 max-w-md mx-auto mb-8">
            {steps.map((step, index) => {
                const isDone = step.id < currentStep;
                const isActive = step.id === currentStep;
                const isPending = step.id > currentStep;

                return (
                    <div key={step.id} className="flex items-start" style={{ flex: index < steps.length - 1 ? "1" : "0" }}>
                        <div className="flex flex-col items-center gap-1">
                            <button
                                onClick={() => isDone && onStepClick(step.id)}
                                disabled={!isDone}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                                    ${isDone ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer" : ""}
                                    ${isActive ? "bg-blue-600 text-white cursor-default" : ""}
                                    ${isPending ? "bg-gray-100 text-gray-400 cursor-default" : ""}
                                `}
                            >
                                {isDone ? "✓" : step.id}
                            </button>
                            <span className={`text-xs whitespace-nowrap
                                ${isDone ? "text-green-700 cursor-pointer" : ""}
                                ${isActive ? "text-blue-600 font-medium" : ""}
                                ${isPending ? "text-gray-300" : ""}
                            `}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-px bg-gray-200 mx-2 mt-3" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PurchaseStepper;