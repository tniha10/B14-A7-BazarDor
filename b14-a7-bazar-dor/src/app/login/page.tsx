"use client";

import React from "react";

export default function LoginPage() {
    const handleLogin = () => {
        document.cookie = "token=logged_in; path=/";
        window.location.href = "/";
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9f5] p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm text-center border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">লগইন করুন</h1>
                <p className="text-sm text-gray-500 mb-6">বাজার দর অ্যাপে প্রবেশ করতে লগইন করুন</p>
                <button onClick={handleLogin} className="w-full rounded-xl bg-[#4f6500] px-4 py-3 text-white font-medium hover:bg-[#3d4f00] transition-colors cursor-pointer">লগইন করুন (Demo Login)</button>
            </div>
        </div>
    );
}