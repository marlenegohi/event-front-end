import FloatingNav from "@/app/components/MenuBar";


const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
            <FloatingNav />
            <main className="ml-64 flex-1 p-6">
                {children}
            </main>
        </div>
    );
};

export default OrganizerLayout;