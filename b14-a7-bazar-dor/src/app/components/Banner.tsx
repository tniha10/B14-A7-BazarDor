"use client";

import { useEffect, useState } from "react";

const Banner = () => {
    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const today = new Date();

        const formattedDate =
            today.toLocaleDateString("bn-BD", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

        setDateString(formattedDate);
    }, []);

    return (
        <section className="bg-[#f4f7ed] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-3xl bg-[#e8efd9] px-5 py-10 sm:px-8 md:py-14 lg:px-12">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-sm font-semibold text-[#61722d]">
                            {dateString}
                        </p>

                        <h1 className="text-3xl font-bold leading-tight text-[#1f2915] sm:text-4xl md:text-5xl">
                            আজকের বাজারদর জানুন
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                            আপনার প্রয়োজনীয় পণ্যের আজকের
                            বাজারদর দেখুন এবং বিভিন্ন বাজারের
                            দামের তুলনা করুন।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;