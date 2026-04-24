type AuthInputProps = {
    label: string;
    type: string;
    placeholder: string;
    value?: string;                                          
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    link?: { text: string; href: string };
};

const AuthInput = ({ label, type, placeholder, value, onChange, link }: AuthInputProps) => {
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
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
        </div>
    );
};

export default AuthInput;