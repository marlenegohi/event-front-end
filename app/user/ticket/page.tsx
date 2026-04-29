"use client";

import { useState } from "react";
import Stepper from "@/app/components/Stepper";
import ConcertSummaryCard from "@/app/components/ConcertSummary";
import TicketSelector from "@/app/components/TicketSelector";
import ContactForm from "@/app/components/ContactForm";
import OrderSummary from "@/app/components/OrderSummary";

const concert = {
    name: "Dua Lipa — Live Tour",
    date: "26 Jan 2025 · 20h00",
    venue: "Accor Arena, Paris",
    price: 45,
    available: 80,
};

export default function PurchasePage() {
    const [currentStep, setCurrentStep] = useState(2);
    const [quantity, setQuantity] = useState(1);
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleContactChange = (
        field: "firstName" | "lastName" | "email",
        value: string
    ) => {
        setContact((prev) => ({ ...prev, [field]: value }));
    };

    const handleContinue = () => {
        if (currentStep < 4) setCurrentStep((s) => s + 1);
    };

    const handleStepClick = (step: number) => {
        if (step === 1) {
            window.location.href = "/user/user-dashboard";
        } else {
            setCurrentStep(step);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 p-8">
            <div className="max-w-3xl mx-auto">
                <Stepper
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                />

                <div className="flex gap-6 items-start">
                    <div className="flex-1 flex flex-col gap-4">
                        <ConcertSummaryCard {...concert} />
                        <TicketSelector
                            quantity={quantity}
                            price={concert.price}
                            available={concert.available}
                            onChange={setQuantity}
                        />
                        <ContactForm
                            {...contact}
                            onChange={handleContactChange}
                        />
                    </div>

                    <div className="w-52 flex-shrink-0">
                        <OrderSummary
                            quantity={quantity}
                            price={concert.price}
                            onContinue={handleContinue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}