"use client";

import { useEffect, useState } from "react";

const Banner = () => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDateString(formattedDate);
  }, []);

  return (
    <section className="bg-[#f0f5f1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-[220px] items-center justify-between gap-6 rounded-2xl border border-[#e2eae3] bg-[#f9fcfa] p-6 sm:p-10 md:p-12">
          <div className="min-w-0 flex-1">
            <p className="mb-3 inline-block rounded-full bg-[#e1f5e8] px-4 py-1.5 text-xs font-semibold text-[#21864b] sm:text-sm">{dateString}</p>
            <h1 className="text-2xl font-extrabold text-[#111827] sm:text-3xl md:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#6b7280] sm:text-sm md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            
            <div className="mt-5">
              <button className="rounded-lg bg-[#008a45] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#00753a] sm:text-sm">সব পণ্য দেখুন</button>
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center sm:flex sm:w-48 md:w-64">
            <img src="/assets/bazar-hero.png" alt="সবজির ঝুড়ি" className="h-auto max-h-48 w-full object-contain md:max-h-56"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;