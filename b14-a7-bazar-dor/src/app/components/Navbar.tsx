"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "চাল", href: "/category/chal", icon: "🍚" },
  { name: "ডাল", href: "/category/dal", icon: "🥩" },
  { name: "তেল", href: "/category/tel", icon: "🛢️" },
  { name: "সবজি", href: "/category/shobji", icon: "🥬" },
  { name: "মাছ", href: "/category/mach", icon: "🐟" },
  { name: "মাংস", href: "/category/mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", href: "/category/dim-dudh", icon: "🥛" },
  { name: "মসলা", href: "/category/moshla", icon: "🌶️" },
];

const tickerItems = [
  { emoji: "🍚", name: "স্বর্ণা চাল", price: "৪৮ টাকা/কেজি", change: "▲ ২.১%", up: true },
  { emoji: "🍚", name: "মিনিকেট চাল", price: "৯৬ টাকা/কেজি", change: "▼ ২.৯%", up: false },
  { emoji: "🍚", name: "নাজিরশাইল চাল", price: "৬৮ টাকা/কেজি", change: "▲ ৩.৮%", up: true },
  { emoji: "🥩", name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", change: "▲ ২.৯%", up: true },
  { emoji: "🥩", name: "ছোলা", price: "১২০ টাকা/কেজি", change: "▼ ২.৪%", up: false },
  { emoji: "🥩", name: "অ্যাংকর ডাল", price: "৭৫ টাকা/কেজি", change: "▲ ১.২%", up: true },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#fafaf9] border-b border-gray-200">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/assets/logo-icon.png" alt="বাজার দর logo" width={40} height={40} className="object-contain h-10 w-10" priority/>

          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-xs text-gray-500">মঙ্গলবার, ১৯ আশ্বিন, ১৪৩০</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/signin" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition">সাইন ইন</Link>
          <Link href="/signup" className="rounded-lg bg-[#009645] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#007d39] transition shadow-sm">সাইন আপ</Link>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-[#fafaf9]">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 overflow-x-auto py-2 text-xs">
          {categories.map((category) => {
            const isActive = pathname === category.href;

            return (
              <Link key={category.href} href={category.href} className={`flex items-center gap-1.5 whitespace-nowrap font-medium transition ${ isActive ? "text-[#009645] font-bold border-b-2 border-[#009645] pb-0.5" : "text-gray-600 hover:text-[#009645]"}`}>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="overflow-hidden border-t border-gray-200 bg-[#f4f5f1]">
        <div className="ticker-track flex">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-4 py-2 text-xs font-medium whitespace-nowrap">
              <span>{item.emoji}</span>
              <span className="text-gray-900 font-semibold">{item.name}</span>
              <span className="text-gray-600">{item.price}</span>
              <span className={item.up ? "text-red-500 font-bold" : "text-emerald-600 font-bold"}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;