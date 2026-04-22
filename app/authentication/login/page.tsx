import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import RoleSelector from "@/app/components/RoleSelector";
import AuthInput from "@/app/components/AuthInput";

const roles = [
    { label: "Utilisateur", value: "user" },
    { label: "Organisateur", value: "organizer" },
    { label: "Admin", value: "admin" },
];

export default function LoginPage() {
    return (
        <AuthCard>
            <div className="text-center mb-6">
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">Connexion</h1>
                <p className="text-xs text-gray-400 mt-1">Accédez à votre espace</p>
            </div>

            <RoleSelector roles={roles} defaultRole="user" />

            <AuthInput
                label="Email"
                type="email"
                placeholder="john@exemple.com"
            />
            <AuthInput
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                link={{ text: "Mot de passe oublié ?", href: "/authentication/forgot" }}
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2">
                Se connecter
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                Pas encore de compte ?{" "}
                <Link href="/authentication/register" className="text-blue-600 hover:underline">
                    S'inscrire
                </Link>
            </p>
        </AuthCard>
    );
}