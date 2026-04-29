const SESSION_CHANGE_EVENT = "session-storage-change";

export function setSessionItem(key: string, value: string) {
    console.log("📝 Setting session:", key);
    sessionStorage.setItem(key, value);
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function removeSessionItem(key: string) {
    console.log("🗑️ Removing session item:", key);
    sessionStorage.removeItem(key);
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function clearSession() {
    console.log("🧹 Clearing session");
    sessionStorage.clear();
    window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

export function subscribeToSessionChanges(callback: () => void): () => void {
    window.addEventListener(SESSION_CHANGE_EVENT, callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener(SESSION_CHANGE_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}
