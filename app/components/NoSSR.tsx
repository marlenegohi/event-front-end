"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

function NoSSRWrapper({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false, // ← désactive le rendu serveur
});