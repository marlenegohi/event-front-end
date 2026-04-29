"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthInputProps = {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    link?: { text: string; href: string };
};

const AuthInput = ({ label, type, placeholder, value, onChange, link }: AuthInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    return (
        <div className="mb-3">
            <div className="flex justify-between mb-1.5">
                <label className="text-xs text-gray-400">{label}</label>
                {link && (
                    <a href={link.href} className="text-xs text-blue-600 hover:underline">
                        {link.text}
                    </a>
                )}
            </div>
            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthInput;