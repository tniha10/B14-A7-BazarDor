
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "Logout failed.");
                return;
            }

            toast.success("Logged out successfully!");
            router.push("/signin");
        } catch {
            toast.error("Something went wrong during logout.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-60"
        >
            {loading ? "Logging out..." : "Logout"}
        </button>
    );
}