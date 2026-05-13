"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import FloatingNav from "@/app/components/MenuBar";
import { AuthUser } from "@/app/components/ProtectedRoute";

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

function EditEventContent({ user }: { user: AuthUser }) {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [form, setForm] = useState({
        description: "",
        date: "",
        time: "",
        address: "",
        city: "",
        price: 0,
        place: 0,
        imageUrl: "",
    });

    useEffect(() => {
        fetch(`/backend/event/${eventId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Événement introuvable");
                return res.json();
            })
            .then((data) => {
                const eventDate = data.date ? new Date(data.date) : null;
                setForm({
                    description: data.description ?? "",
                    date: eventDate ? eventDate.toISOString().split("T")[0] : "",
                    time: eventDate ? eventDate.toTimeString().slice(0, 5) : "",
                    address: data.address ?? "",
                    city: data.city ?? "",
                    price: data.price ?? 0,
                    place: data.place ?? 0,
                    imageUrl: data.imageUrl ?? "",
                });
                setImagePreview(data.imageUrl ?? null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [eventId]);

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
        setSuccess(null);

        if (!form.description || !form.date || !form.address || !form.city) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setSaving(true);
        try {
            let imageUrl = form.imageUrl;
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }

            const datetime = new Date(`${form.date}T${form.time || "00:00"}`);

            const res = await fetch(`/backend/event/${eventId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: form.description,
                    date: datetime.toISOString(),
                    address: form.address,
                    city: form.city,
                    price: form.price,
                    place: form.place,
                    imageUrl,
                }),
            });

            if (res.ok) {
                setSuccess("Événement modifié avec succès !");
                setTimeout(() => router.push(`/organizer/concerts/${eventId}`), 1500);
            } else {
                const msg = await res.text();
                setError(msg || "Erreur lors de la modification.");
            }
        } catch {
            setError("Impossible de contacter le serveur.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Chargement...</p>
            </main>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => router.back()}
                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-lg font-medium text-gray-800 dark:text-white">Modifier l&apos;événement</h1>
                        <p className="text-xs text-gray-400">{form.description}</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Formulaire */}
                    <div className="flex-1 space-y-4">

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Nom de l&apos;événement</label>
                            <input type="text" value={form.description}
                                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Date</label>
                                <input type="date" value={form.date}
                                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Heure</label>
                                <input type="time" value={form.time}
                                    onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Lieu</label>
                            <input type="text" value={form.address}
                                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Ville</label>
                            <input type="text" value={form.city}
                                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                                className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Prix (€)</label>
                                <input type="number" min={0} step={0.01} value={form.price}
                                    onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) }))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Nombre de places</label>
                                <input type="number" min={1} value={form.place}
                                    onChange={(e) => setForm((p) => ({ ...p, place: parseInt(e.target.value) }))}
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-red-400 bg-red-950 border border-red-800 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-xs text-green-400 bg-green-950 border border-green-800 rounded-lg px-3 py-2">
                                {success}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button onClick={handleSubmit} disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                            >
                                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                            </button>
                            <button onClick={() => router.back()}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-6 py-2.5 rounded-lg transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>

                    {/* Panneau droit — image */}
                    <div className="w-72 space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Affiche du concert</label>
                            <label className="block cursor-pointer">
                                <input type="file" accept="image/png,image/jpeg"
                                    onChange={handleImage} className="hidden" />
                                <div className="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl h-48 flex flex-col items-center justify-center hover:border-blue-500 transition-colors overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <span className="text-2xl text-gray-300">+</span>
                                            <p className="text-xs text-gray-400 mt-2">Changer l&apos;image</p>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        {/* Récapitulatif */}
                        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 space-y-2">
                            <p className="text-sm font-medium text-gray-800 dark:text-white mb-3">Récapitulatif</p>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Places</span>
                                <span>{form.place}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Prix unit.</span>
                                <span>{form.price.toFixed(2)} €</span>
                            </div>
                            <div className="border-t border-gray-100 dark:border-neutral-700 pt-2 flex justify-between text-sm font-medium text-gray-800 dark:text-white">
                                <span>Potentiel</span>
                                <span>{(form.place * form.price).toLocaleString("fr-FR")} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function EditEventPage() {
    return (
        <ProtectedRoute requiredRole="organizer">
            {(user) => <EditEventContent user={user} />}
        </ProtectedRoute>
    );
}