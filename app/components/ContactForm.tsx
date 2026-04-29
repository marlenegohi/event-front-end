// components/purchase/ContactForm.tsx
"use client";

type ContactFormProps = {
    firstName: string;
    lastName: string;
    email: string;
    onChange: (field: "firstName" | "lastName" | "email", value: string) => void;
};

const ContactForm = ({ firstName, lastName, email, onChange }: ContactFormProps) => {
    return (
        <div className="border border-gray-100 rounded-2xl p-4">
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-4">
                Informations de contact
            </div>

            <div className="flex gap-3 mb-3">
                <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">Prénom</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => onChange("firstName", e.target.value)}
                        placeholder="John"
                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1.5 block">Nom</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => onChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-gray-400 mb-1.5 block">
                    Email — les billets seront envoyés ici
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="john@exemple.com"
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                />
            </div>
        </div>
    );
};

export default ContactForm;