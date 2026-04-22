const AuthCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-8 w-full max-w-sm">
            {/* Logo */}
            <div className="flex justify-center mb-6">
    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14a6 6 0 0112 0v1H4v-1z" fill="#185FA5"/>
        </svg>
        </div>
        </div>
    {children}
    </div>
    </div>
);
};

export default AuthCard;