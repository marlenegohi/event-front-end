type ListContainerProps = {
    title: string;
    subtitle?: string;
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    actionLabel?: string;
    onAction?: () => void;
    loading?: boolean;
    emptyMessage?: string;
    children: React.ReactNode;
};

const ListContainer = ({
                           title,
                           subtitle,
                           searchPlaceholder = "Rechercher...",
                           searchValue,
                           onSearchChange,
                           actionLabel,
                           onAction,
                           loading,
                           emptyMessage = "Aucun résultat.",
                           children,
                       }: ListContainerProps) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
                </div>
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-4">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 mb-4"
                />

                {loading && <p className="text-xs text-gray-400 text-center py-4">Chargement...</p>}

                {!loading && !children && (
                    <p className="text-xs text-gray-400 text-center py-4">{emptyMessage}</p>
                )}

                <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ListContainer;