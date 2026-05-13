"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FloatingNav from "@/app/components/MenuBar";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { AuthUser } from "@/app/components/ProtectedRoute";

type UserDetail = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    companyName?: string;
    role: string;
};

function SettingsContent({ user }: { user: AuthUser }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        password: "",
        confirmPassword: "",
    });

    // Charge les infos actuelles de l'utilisateur
    useEffect(() => {
        fetch(`/backend/user/${user.id}`)
            .then((res) => res.json())
            .then((data: UserDetail) => {
                setForm({
                    name: data.name ?? "",
                    email: data.email ?? "",
                    phone: data.phone ?? "",
                    address: data.address ?? "",
                    companyName: data.companyName ?? "",
                    password: "",
                    confirmPassword: "",
                });
            })
            .catch(() => setError("Impossible de charger vos informations."))
            .finally(() => setLoading(false));
    }, [user.id]);

    // Ajoute ces états après les autres useState
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setError(null);
        setSuccess(null);

        if (form.password && form.password !== form.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setSaving(true);
        try {
            const body: Record<string, string> = {
                name: form.name,
                phone: form.phone,
                address: form.address,
            };

            if (user.role === "organizer") {
                body.companyName = form.companyName;
            }
            if (form.password) {
                body.password = form.password;
            }

            const res = await fetch(`/backend/user/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setSuccess("Profil mis à jour avec succès !");

                // Met à jour le nom dans la session si changé
                const stored = sessionStorage.getItem("user");
                if (stored) {
                    const sessionUser = JSON.parse(stored);
                    sessionUser.name = form.name;
                    sessionStorage.setItem("user", JSON.stringify(sessionUser));
                }
            } else {
                const msg = await res.text();
                setError(msg || "Erreur lors de la mise à jour.");
            }
        } catch {
            setError("Impossible de contacter le serveur.");
        } finally {
            setSaving(false);
        }
    };

    const initiale = form.name?.charAt(0).toUpperCase() ?? "?";

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
                <FloatingNav />
                <main className="ml-64 flex-1 p-6 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Chargement...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                <div className="max-w-xl">

                    <div className="flex items-center gap-3 mb-6">
                        <div>
                            <h1 className="text-lg font-medium text-gray-800 dark:text-white">Mon profil</h1>
                            <p className="text-xs text-gray-400">Modifiez vos informations personnelles</p>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4 p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
                            {initiale}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-800 dark:text-white">{form.name}</div>
                            <div className="text-xs text-gray-400">{form.email}</div>
                            <div className="text-xs text-blue-500 mt-0.5">
                                {user.role === "organizer" ? "Organisateur" : user.role === "admin" ? "Admin" : "Utilisateur"}
                            </div>
                        </div>
                    </div>

                    {/* Infos générales */}
                    <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-3">
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Informations générales</div>
                        <div className="flex gap-3 mb-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Nom complet</label>
                                <input type="text" value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
                                {/* Email non modifiable */}
                                <input type="email" value={form.email} disabled
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Téléphone</label>
                                <input type="tel" value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="+33 6 00 00 00 00"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Adresse</label>
                                <input type="text" value={form.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    placeholder="12 rue de la Paix, Paris"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section organisateur — uniquement si role = organizer */}
                    {user.role === "organizer" && (
                        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-3">
                            <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Informations organisateur</div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1.5 block">Nom de la société</label>
                                <input type="text" value={form.companyName}
                                    onChange={(e) => handleChange("companyName", e.target.value)}
                                    placeholder="Ex: EventPro SARL"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>
                    )}

                    {/* Sécurité */}
                    <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-5">
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Sécurité</div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Nouveau mot de passe</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 pr-10 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            // Œil barré
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                                                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            // Œil ouvert
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Confirmer</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={form.confirmPassword}
                                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 pr-10 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirm ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                                                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                            {success}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                        >
                            {saving ? "Enregistrement..." : "Enregistrer"}
                        </button>
                        <button onClick={() => router.back()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-6 py-2.5 rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <ProtectedRoute>
            {(user) => <SettingsContent user={user} />}
        </ProtectedRoute>
    );
}