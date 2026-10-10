"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const categories = [
  { label: "সব", emoji: "🛒", href: "/" },
  { label: "চাল", emoji: "🌾", href: "/category/rice" },
  { label: "ডাল", emoji: "🫘", href: "/category/dal" },
  { label: "তেল", emoji: "🛢️", href: "/category/oil" },
  { label: "সবজি", emoji: "🥬", href: "/category/vegetables" },
  { label: "মাছ", emoji: "🐟", href: "/category/fish" },
  { label: "মাংস", emoji: "🥩", href: "/category/meat" },
  { label: "ডিম", emoji: "🥚", href: "/category/egg" },
  { label: "মসলা", emoji: "🌶️", href: "/category/spices" },
];

// Replace with your real data later
const tickerItems = [
  { emoji: "🥦", name: "ফুলকপি", price: "৫৪ টাকা/কেজি", change: 4.1 },
  { emoji: "🥚", name: "ডিম", price: "১৫৮ টাকা/ডজন", change: 3.9 },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৫৪ টাকা/কেজি", change: 12.5 },
  { emoji: "🐟", name: "রুই মাছ", price: "৪৬ টাকা/কেজি", change: -1.8 },
  { emoji: "🍆", name: "বেগুন", price: "৪৪ টাকা/কেজি", change: 8.8 },
  { emoji: "🫚", name: "আদা", price: "৮৫ টাকা/কেজি", change: 9.0 },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toBn = (n: number) =>
    n.toFixed(1).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Top row: logo + auth */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-emerald-700">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500">{today}</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md" />
            ) : session ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition hover:bg-gray-100"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-1.5 h-6 w-6 text-gray-400"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="8" r="4.5" />
                      <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" />
                    </svg>
                  </span>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {session.user?.name || session.user?.email}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-emerald-700 transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Second row: category links */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${
                isActive(c.href)
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Price ticker */}
      <div className="overflow-hidden border-b border-gray-200 bg-gray-50 py-2">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap text-sm">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-gray-700">
              <span>{item.emoji}</span>
              <span className="font-medium">{item.name}</span>
              <span>দাম {item.price}</span>
              <span
                className={`text-xs font-semibold ${
                  item.change >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {item.change >= 0 ? "▲" : "▼"} {toBn(Math.abs(item.change))}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}