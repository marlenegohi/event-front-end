"use client";
import NoSSR from "@/app/components/NoSSR";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import { useState } from "react";
import { AuthUser } from "@/app/components/ProtectedRoute";
import { useRouter } from "next/navigation";

const CLOUDINARY_CLOUD_NAME = "daxyb9gpe";
const CLOUDINARY_UPLOAD_PRESET = "eventProject";

async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
}

function CreateEventForm({ user }: { user: AuthUser }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [lieu, setLieu] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState(0);
    const [places, setPlaces] = useState(500);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setError("L'image ne doit pas dépasser 5MB.");
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        setError(null);
        if (!date || !lieu || !city || !price || !places) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        setLoading(true);
        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }
            const datetime = new Date(`${date}T${time || "00:00"}`);
            const res = await fetch("/backend/event/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: name || description,
                    date: datetime.toISOString(),
                    address: lieu,
                    city,
                    price,
                    place: places,
                    imageUrl,
                    organizerId: user.id,
                }),
            });
            if (res.ok) {
                window.location.href = "/organizer/dashboard";
            } else {
                const msg = await res.text();
                setError(msg || "Erreur lors de la création.");
            }
        } catch (err) {
            setError(`Erreur : ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-8">

                {/* Header avec bouton back */}
                <div className="flex items-center gap-3 mb-6">
                    <div>
                        <h1 className="text-lg font-medium text-gray-800 dark:text-white">Créer un concert</h1>
                        <p className="text-xs text-gray-400">Remplissez les informations de votre événement</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Formulaire gauche */}
                    <div className="flex-1 space-y-4">

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Nom de l&apos;événement</label>
                            <input
                                type="text"
                                placeholder="Ex: Dua Lipa Live Tour"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Heure</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Lieu</label>
                            <input
                                type="text"
                                placeholder="Ex: Accor Arena"
                                value={lieu}
                                onChange={(e) => setLieu(e.target.value)}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Ville</label>
                            <input
                                type="text"
                                placeholder="Ex: Paris"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Prix du billet (€)</label>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    value={price}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Nombre de places</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={places}
                                    onChange={(e) => setPlaces(parseInt(e.target.value))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Description</label>
                            <textarea
                                placeholder="Décrivez l'événement..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                            >
                                {loading ? "Publication..." : "Publier le concert"}
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-6 py-2.5 rounded-lg transition-colors">
                                Enregistrer brouillon
                            </button>
                        </div>
                    </div>

                    {/* Panneau droit */}
                    <div className="w-72 space-y-4">

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Affiche du concert</label>
                            <label className="block cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                                <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center hover:border-blue-400 transition-colors overflow-hidden bg-white">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <span className="text-2xl text-gray-300">+</span>
                                            <p className="text-xs text-gray-400 mt-2">Glissez une image</p>
                                            <p className="text-xs text-gray-300">PNG, JPG — max 5MB</p>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl p-4 space-y-2">
                            <p className="text-sm font-medium text-gray-800 dark:text-white mb-3">Récapitulatif</p>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Places</span>
                                <span>{places}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Prix unit.</span>
                                <span>{price.toFixed(2)} €</span>
                            </div>
                            <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-medium text-gray-800 dark:text-white">
                                <span>Potentiel</span>
                                <span>{(places * price).toLocaleString("fr-FR")} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CreateEventPage() {
    return (
        <NoSSR>
            <ProtectedRoute requiredRole="organizer">
                {(user) => <CreateEventForm user={user} />}
            </ProtectedRoute>
        </NoSSR>
    );
}