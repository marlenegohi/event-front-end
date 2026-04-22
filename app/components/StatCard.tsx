type StatCardProps = {
    label: string;
    value: string;
    sub?: string;
    subColor?: string;
};

const StatCard = ({ label, value, sub, subColor = "text-green-600" }: StatCardProps) => {
    return (
        <div className="bg-gray-100 dark:bg-neutral-800 rounded-xl p-4 flex-1">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="text-2xl font-medium text-gray-800 dark:text-white">{value}</div>
            {sub && <div className={`text-xs mt-1 ${subColor}`}>{sub}</div>}
        </div>
    );
};

export default StatCard;