"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";
import ProfileSkeleton from "./ProfileSkeleton";

export default function ProfileCard() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [updating, setUpdating] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // Fill the input with the current name
    useEffect(() => {
        if (session?.user) {
            setName(session.user.name);
        }
    }, [session]);

    // Not logged in -> go to sign in
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/signin");
        }
    }, [isPending, session, router]);

    async function handleUpdate(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        setUpdating(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "Update failed.");
                return;
            }

            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setUpdating(false);
        }
    }

    async function handleLogout() {
        setLoggingOut(true);

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
            setLoggingOut(false);
        }
    }

    if (isPending || !session) {
        return (
            <main className="flex min-h-[75vh] flex-col items-center bg-[#f4f8f4] px-4 pb-12 pt-12">
                <ProfileSkeleton />
            </main>
        );
    }

    const user = session.user;

    return (
        <main className="flex min-h-[75vh] flex-col items-center bg-[#f4f8f4] px-4 pb-12 pt-12">
            <div className="w-full max-w-3xl space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1.5 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-200">
                            <svg
                                viewBox="0 0 24 24"
                                className="mt-3 h-12 w-12 text-gray-400"
                                fill="currentColor"
                            >
                                <circle cx="12" cy="8" r="4.5" />
                                <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" />
                            </svg>
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-base font-semibold text-gray-900">
                            {user.name}
                        </h2>
                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="whitespace-nowrap rounded-lg border border-red-500 px-4 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                    >
                        {loggingOut ? "..." : "↩ সাইন আউট"}
                    </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-5 text-sm font-semibold text-gray-900">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-xs font-medium text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="আপনার নাম"
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}