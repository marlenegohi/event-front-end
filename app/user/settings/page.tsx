// app/user/settings/page.tsx ou app/organizer/settings/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingNav from "@/app/components/MenuBar";

const SettingsPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                <div className="max-w-xl">

                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-lg font-medium text-gray-800 dark:text-white">Mon profil</h1>
                            <p className="text-xs text-gray-400">Modifiez vos informations personnelles</p>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4 p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
                            J
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-800 dark:text-white">John Doe</div>
                            <div className="text-xs text-gray-400">john@exemple.com</div>
                        </div>
                    </div>

                    {/* Infos générales */}
                    <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-3">
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Informations générales</div>
                        <div className="flex gap-3 mb-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Nom complet</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="john@exemple.com"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Téléphone</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="+33 6 00 00 00 00"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Adresse</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
                                    placeholder="12 rue de la Paix, Paris"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section organisateur — à afficher uniquement si role = organizer */}
                    <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-3">
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Informations organisateur</div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Nom de la société</label>
                            <input
                                type="text"
                                value={form.companyName}
                                onChange={(e) => handleChange("companyName", e.target.value)}
                                placeholder="Ex: EventPro SARL"
                                className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Sécurité */}
                    <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 mb-5">
                        <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">Sécurité</div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1.5 block">Confirmer</label>
                                <input
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                            Enregistrer
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-6 py-2.5 rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;