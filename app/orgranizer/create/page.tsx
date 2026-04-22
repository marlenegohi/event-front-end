
"use client";
import OrganizerLayout from "@/app/components/OrganizerLayout";

export default function CreateConcert() {
    return (
        <OrganizerLayout>
            <div className="mb-5">
                <h1 className="text-xl font-medium text-gray-800 dark:text-white">Créer un concert</h1>
                <p className="text-sm text-gray-400">Remplissez les informations de votre événement</p>
            </div>

            <div className="flex gap-6">
                {/* Formulaire */}
                <div className="flex-1 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-6 flex flex-col gap-4">
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Nom de l'événement</label>
                        <input type="text" placeholder="Ex: Dua Lipa Live Tour" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Date</label>
                            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Heure</label>
                            <input type="time" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Lieu</label>
                        <input type="text" placeholder="Ex: Accor Arena, Paris" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Prix du billet (€)</label>
                            <input type="number" placeholder="0.00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Nombre de places</label>
                            <input type="number" placeholder="500" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Artiste</label>
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <option>Sélectionner un artiste</option>
                            <option>Dua Lipa</option>
                            <option>Imagine Dragons</option>
                            <option>The Weeknd</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Description</label>
                        <textarea rows={3} placeholder="Décrivez l'événement..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Publier le concert
                        </button>
                        <button className="bg-gray-100 text-gray-500 text-sm px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Enregistrer brouillon
                        </button>
                    </div>
                </div>

                {/* Panneau droit */}
                <div className="w-52 flex flex-col gap-4">
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Affiche du concert</div>
                        <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 text-sm">
                            <div className="text-2xl mb-2 opacity-40">+</div>
                            <div>Glissez une image</div>
                            <div className="text-xs mt-1">PNG, JPG — max 5MB</div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-4">
                        <div className="text-xs font-medium text-gray-700 dark:text-white mb-3">Récapitulatif</div>
                        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                            <div className="flex justify-between"><span>Places</span><span>500</span></div>
                            <div className="flex justify-between"><span>Prix unit.</span><span>45 €</span></div>
                            <div className="border-t border-gray-200 my-1" />
                            <div className="flex justify-between font-medium text-gray-700 dark:text-white"><span>Potentiel</span><span>22 500 €</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </OrganizerLayout>
    );
}