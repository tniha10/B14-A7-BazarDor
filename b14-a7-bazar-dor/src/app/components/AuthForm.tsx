"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";
import AuthSkeleton from "./AuthSkeleton";

type AuthFormProps = {
    mode: "signin" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isSignup = mode === "signup";

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // Basic form validation
        if (isSignup && !name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!password) {
            toast.error("Please enter your password.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (isSignup && password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            if (isSignup) {
                const { error } = await authClient.signUp.email({
                    name: name.trim(),
                    email: email.trim(),
                    password,
                });

                if (error) {
                    toast.error(error.message || "Registration failed.");
                    return;
                }

                toast.success("Registration successful! Please sign in.");
                router.push("/signin");
            } else {
                const { error } = await authClient.signIn.email({
                    email: email.trim(),
                    password,
                });

                if (error) {
                    toast.error(error.message || "Login failed.");
                    return;
                }

                toast.success("Login successful!");
                router.push("/");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSocialLogin(provider: "google" | "github") {
        setLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || `${provider} login failed.`);
                setLoading(false);
            }
        } catch {
            toast.error("Social login failed. Please try again.");
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-[75vh] flex-col items-center bg-[#f4f8f4] px-4 pb-12 pt-12">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "Welcome Back"}
                </h1>

                <p className="mt-1.5 text-xs text-gray-500">
                    {isSignup
                        ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
                        : "Sign in to continue to বাজার দর."}
                </p>
            </div>

            <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                {loading ? (
                    <AuthSkeleton />
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            {isSignup && (
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
                                        placeholder="যেমন: রহিম উদ্দিন"
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600"
                                    />
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1 block text-xs font-medium text-gray-700"
                                >
                                    ইমেইল
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1 block text-xs font-medium text-gray-700"
                                >
                                    পাসওয়ার্ড
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    autoComplete={
                                        isSignup ? "new-password" : "current-password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600"
                                />
                            </div>

                            {isSignup && (
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-1 block text-xs font-medium text-gray-700"
                                    >
                                        পাসওয়ার্ড নিশ্চিত করুন
                                    </label>

                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(event.target.value)
                                        }
                                        placeholder="আবার লিখুন"
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "Login"}
                            </button>
                        </form>

                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-[11px] text-gray-500">অথবা</span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => handleSocialLogin("google")}
                                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                            >
                                <svg viewBox="0 0 48 48" className="h-3.5 w-3.5 shrink-0">
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                    />
                                </svg>
                                Google দিয়ে চালিয়ে যান
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => handleSocialLogin("github")}
                                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                            >
                                <svg
                                    viewBox="0 0 16 16"
                                    className="h-3.5 w-3.5 shrink-0"
                                    fill="currentColor"
                                >
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        <p className="mt-5 text-center text-xs text-gray-600">
                            {isSignup
                                ? "অ্যাকাউন্ট আছে?"
                                : "Don't have an account?"}{" "}
                            <Link
                                href={isSignup ? "/signin" : "/signup"}
                                className="font-semibold text-green-700 hover:underline"
                            >
                                {isSignup ? "সাইন ইন করুন" : "Register"}
                            </Link>
                        </p>
                    </>
                )}
            </div>

            <Link
                href="/"
                className="mt-5 text-xs text-gray-400 hover:text-green-700 hover:underline"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}