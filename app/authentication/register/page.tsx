"use client";
import { isValidEmail } from "@/app/utils/validation";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import RoleSelector from "@/app/components/RoleSelector";
import AuthInput from "@/app/components/AuthInput";

const roles = [
    { label: "Utilisateur", value: "user" },
    { label: "Organisateur", value: "organizer" },
];

export default function RegisterPage() {
    const [role, setRole] = useState("user");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        setError(null);

        if (!firstName || !lastName || !email || !password) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Veuillez entrer une adresse email valide.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (role === "organizer" && !companyName) {
            setError("Le nom de l'entreprise est obligatoire pour un organisateur.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/backend/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    password,
                    role,
                    companyName: role === "organizer" ? companyName : undefined,
                    address: "",
                    phone: "",
                }),
            });

            if (res.ok) {
                // Redirection vers le login après succès
                window.location.href = "/authentication/login?registered=true";
            } else {
                const msg = await res.text();
                setError(msg || "Erreur lors de l'inscription.");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <div className="text-center mb-6">
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                    Créer un compte
                </h1>
                <p className="text-xs text-gray-400 mt-1">Rejoignez la plateforme</p>
            </div>

            <RoleSelector
                roles={roles}
                defaultRole="user"
                onChange={(value) => setRole(value)}
            />

            <div className="flex gap-3">
                <AuthInput
                    label="Prénom"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <AuthInput
                    label="Nom"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <AuthInput
                label="Email"
                type="email"
                placeholder="john@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Champ affiché uniquement pour les organisateurs */}
            {role === "organizer" && (
                <AuthInput
                    label="Nom de l'entreprise"
                    type="text"
                    placeholder="Ma Société SAS"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            )}

            <AuthInput
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Affichage de l'erreur */}
            {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2"
            >
                {loading ? "Création en cours..." : "Créer mon compte"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                Déjà un compte ?{" "}
                <Link href="/authentication/login" className="text-blue-600 hover:underline">
                    Se connecter
                </Link>
            </p>
        </AuthCard>
    );
}