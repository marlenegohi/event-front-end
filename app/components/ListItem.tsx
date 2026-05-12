type ListItemProps = {
    initials: string;
    color?: string;
    title: string;
    subtitle?: string;
    badge?: string;
    onClick?: () => void;
};

const ListItem = ({ initials, color = "bg-blue-100 text-blue-800", title, subtitle, badge, onClick }: ListItemProps) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 py-3 px-2 rounded-lg transition-colors ${onClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800" : ""}`}
        >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${color}`}>
                {initials}
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 dark:text-white">{title}</div>
                {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
            </div>
            {badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                    {badge}
                </span>
            )}
        </div>
    );
};

export default ListItem;