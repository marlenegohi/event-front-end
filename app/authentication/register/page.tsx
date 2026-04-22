import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import RoleSelector from "@/app/components/RoleSelector";
import AuthInput from "@/app/components/AuthInput";

const roles = [
    { label: "Utilisateur", value: "user" },
    { label: "Organisateur", value: "organizer" },
];

export default function RegisterPage() {
    return (
        <AuthCard>
            <div className="text-center mb-6">
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">Créer un compte</h1>
                <p className="text-xs text-gray-400 mt-1">Rejoignez la plateforme</p>
            </div>

            <RoleSelector roles={roles} defaultRole="user" />

            <div className="flex gap-3">
                <AuthInput label="Prénom" type="text" placeholder="John" />
                <AuthInput label="Nom" type="text" placeholder="Doe" />
            </div>

            <AuthInput label="Email" type="email" placeholder="john@exemple.com" />
            <AuthInput label="Mot de passe" type="password" placeholder="••••••••" />
            <AuthInput label="Confirmer le mot de passe" type="password" placeholder="••••••••" />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2">
                Créer mon compte
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