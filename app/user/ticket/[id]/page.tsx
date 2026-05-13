"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Stepper from "@/app/components/Stepper";
import ConcertSummaryCard from "@/app/components/ConcertSummary";
import TicketSelector from "@/app/components/TicketSelector";
import ContactForm from "@/app/components/ContactForm";
import OrderSummary from "@/app/components/OrderSummary";
import {AuthUser} from "@/app/hooks/userAuth";

type Event = {
    id: number;
    description: string;
    imageUrl: string;
    date: string;
    address: string;
    city: string;
    price: number;
    place: number;
    ticketCount: number;
};

export default function TicketPurchasePage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(2);
    const [quantity, setQuantity] = useState(1);
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    // ← Lire l'user depuis sessionStorage
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("user");
        if (!stored) {
            router.replace("/authentication/login");
            return;
        }
        const parsed = JSON.parse(stored);
        if (parsed.role !== "user") {
            router.replace("/authentication/login");
            return;
        }
        setUser(parsed);

        // Pré-remplir le contact ici — dans un effect, pas dans le render
        const names = parsed.name.split(" ");
        setContact({
            firstName: names[0] || "",
            lastName: names.slice(1).join(" ") || "",
            email: parsed.email,
        });
    }, [router]);

    useEffect(() => {
        fetch(`/backend/event/${eventId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Événement introuvable");
                return res.text();
            })
            .then((text) => {
                if (!text || text.trim() === "") throw new Error("Événement introuvable");
                setEvent(JSON.parse(text));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [eventId]);

    const handleContactChange = (
        field: "firstName" | "lastName" | "email",
        value: string
    ) => {
        setContact((prev) => ({ ...prev, [field]: value }));
    };

    const handleContinue = async () => {
        if (currentStep < 3) {
            setCurrentStep((s) => s + 1);
        } else if (currentStep === 3) {
            await handlePurchase();
        }
    };

    const handleStepClick = (step: number) => {
        if (step === 1) router.push("/user/user-dashboard");
        else if (step < currentStep) setCurrentStep(step);
    };

    const handlePurchase = async () => {
        if (!event || !user) return;
        setError(null);
        setPurchasing(true);

        try {
            const purchasePromises = Array.from({ length: quantity }, () =>
                fetch("/backend/ticket/purchase", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        clientId: user.id,
                        eventId: event.id,
                    }),
                })
            );

            const results = await Promise.all(purchasePromises);
            const allSuccessful = results.every((res) => res.ok);

            if (allSuccessful) {
                setCurrentStep(4);
                setTimeout(() => router.push("/user/user-dashboard"), 2000);
            } else {
                const firstError = results.find((res) => !res.ok);
                const msg = firstError ? await firstError.text() : "Erreur lors de l'achat";
                setError(msg);
            }
        } catch {
            setError("Impossible de contacter le serveur");
        } finally {
            setPurchasing(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).replace(",", " ·");
    };

    // Attendre que l'user soit chargé
    if (!user || loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
                <p className="text-gray-400">Chargement...</p>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/user/user-dashboard")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retour au dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!event) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 p-8">
            <div className="max-w-3xl mx-auto">
                <Stepper currentStep={currentStep} onStepClick={handleStepClick} />

                {currentStep === 4 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Achat confirmé !
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Vos billets ont été envoyés à {contact.email}
                        </p>
                        <p className="text-sm text-gray-400">Redirection vers le dashboard...</p>
                    </div>
                ) : (
                    <div className="flex gap-6 items-start">
                        <div className="flex-1 flex flex-col gap-4">
                            <ConcertSummaryCard
                                name={event.description}
                                date={formatDate(event.date)}
                                venue={`${event.address}, ${event.city}`}
                                price={event.price}
                                image={event.imageUrl}
                            />
                            <TicketSelector
                                quantity={quantity}
                                price={event.price}
                                available={event.place - event.ticketCount}
                                onChange={setQuantity}
                            />
                            <ContactForm
                                {...contact}
                                onChange={handleContactChange}
                            />
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}
                        </div>
                        <div className="w-52 flex-shrink-0">
                            <OrderSummary
                                quantity={quantity}
                                price={event.price}
                                onContinue={handleContinue}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
