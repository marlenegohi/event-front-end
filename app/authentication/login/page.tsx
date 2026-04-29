"use client";
import { isValidEmail } from "@/app/utils/validation";
import { setSessionItem } from "@/app/utils/sessionStorage";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import AuthInput from "@/app/components/AuthInput";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Veuillez entrer une adresse email valide.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/backend/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("✅ Login successful - Role:", data.role, "| User:", data.name);

                const userData = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                };

                setSessionItem("user", JSON.stringify(userData));

                // Redirige selon le rôle avec replace pour éviter le back
                if (data.role === "admin") {
                    console.log("🚀 Redirecting to admin dashboard");
                    window.location.replace("/dashboard/admin");
                } else if (data.role === "organizer") {
                    console.log("🚀 Redirecting to organizer dashboard");
                    window.location.replace("/organizer/dashboard");
                } else {
                    console.log("🚀 Redirecting to user dashboard");
                    window.location.replace("/user/user-dashboard");
                }
            } else {
                const msg = await res.text();
                setError(msg || "Identifiants incorrects.");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <div className="text-center mb-6">
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                    Connexion
                </h1>
                <p className="text-xs text-gray-400 mt-1">Accédez à votre espace</p>
            </div>

            <AuthInput
                label="Email"
                type="email"
                placeholder="john@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                link={{ text: "Mot de passe oublié ?", href: "/authentication/forgot" }}
            />

            {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2"
            >
                {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                Pas encore de compte ?{" "}
                <Link href="/authentication/register" className="text-blue-600 hover:underline">
                    S&apos;inscrire
                </Link>
            </p>
        </AuthCard>
    );
}