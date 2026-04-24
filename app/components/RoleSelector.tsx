"use client";
import { useState } from "react";

type Role = { label: string; value: string };
type RoleSelectorProps = {
    roles: Role[];
    defaultRole?: string;
    onChange?: (value: string) => void; // ← ajout
};

const RoleSelector = ({ roles, defaultRole, onChange }: RoleSelectorProps) => {
    const [selected, setSelected] = useState(defaultRole ?? roles[0].value);

    const handleSelect = (value: string) => {
        setSelected(value);
        onChange?.(value);
    };

    return (
        <div className="mb-4">
            <div className="text-xs text-gray-400 mb-1.5">Rôle</div>
            <div className="flex gap-2">
                {roles.map((role) => (
                    <button
                        key={role.value}
                        onClick={() => handleSelect(role.value)}
                        className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors
                            ${selected === role.value
                            ? "bg-blue-50 border-blue-400 text-blue-700"
                            : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                        }`}
                    >
                        {role.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoleSelector;