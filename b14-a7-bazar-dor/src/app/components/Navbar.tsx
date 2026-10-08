"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
    {
        name: "সব পণ্য",
        href: "/",
    },
    {
        name: "চাল",
        href: "/category/chal",
    },
    {
        name: "ডাল",
        href: "/category/dal",
    },
    {
        name: "সবজি",
        href: "/category/shobji",
    },
    {
        name: "মাছ",
        href: "/category/mach",
    },
    {
        name: "মাংস",
        href: "/category/mangsho",
    },
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">

                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                            <Image src="/assets/logo-icon.png" alt="বাজার দর logo" width={32} height={32}/>
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900"> বাজার দর </h1>
                            <p className="text-xs text-gray-500"> বৃহস্পতিবার, ২৩ আশ্বিন ১৪৩৩ </p>
                        </div>
                    </Link>

                    <nav className="order-3 flex w-full gap-1 overflow-x-auto pb-1 lg:order-none lg:w-auto lg:justify-center">
                        {categories.map((category) => {
                            const isActive = category.href === "/" ? pathname === "/" : pathname.startsWith(category.href);

                            return (
                                <Link key={category.href} href={category.href} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${ isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50 hover:text-green-700" }`}>
                                    {category.name}
                                </Link>
                            );
                        })}

                    </nav>

                    <div className="flex shrink-0 items-center gap-2">
                        <Link href="/signin" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"> সাইন ইন </Link>

                        <Link href="/signup" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"> সাইন আপ </Link>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden border-t border-gray-100 bg-gray-50">
                <div className="ticker-track flex w-max">
                    <div className="flex shrink-0 items-center gap-8 px-4 py-3">
                        <TickerItem emoji="🍚" name="চাল" price="৭৫ টাকা/কেজি" change="▲ ২.১%" up />
                        <TickerItem emoji="🥔" name="আলু" price="৪৫ টাকা/কেজি" change="▼ ১.৪%" />
                        <TickerItem emoji="🧅" name="পেঁয়াজ" price="৮০ টাকা/কেজি" change="▲ ৩.২%" up />
                        <TickerItem emoji="🐟" name="ইলিশ" price="১,৮৫০ টাকা/কেজি" change="▼ ২.৯%" />
                        <TickerItem emoji="🥚" name="ডিম" price="১৩৫ টাকা/ডজন" change="▲ ১.২%" up />
                        <TickerItem emoji="🌶️" name="মরিচ" price="১২০ টাকা/কেজি" change="— ০.০%" flat />
                    </div>

                    {/* Duplicate content for infinite scrolling */}
                    <div className="flex shrink-0 items-center gap-8 px-4 py-3">
                        <TickerItem emoji="🍚" name="চাল" price="৭৫ টাকা/কেজি" change="▲ ২.১%" up />
                        <TickerItem emoji="🥔" name="আলু" price="৪৫ টাকা/কেজি" change="▼ ১.৪%" />
                        <TickerItem emoji="🧅" name="পেঁয়াজ" price="৮০ টাকা/কেজি" change="▲ ৩.২%" up />
                        <TickerItem emoji="🐟" name="ইলিশ" price="১,৮৫০ টাকা/কেজি" change="▼ ২.৯%" />
                        <TickerItem emoji="🥚" name="ডিম" price="১৩৫ টাকা/ডজন" change="▲ ১.২%" up />
                        <TickerItem emoji="🌶️" name="মরিচ" price="১২০ টাকা/কেজি" change="— ০.০%" flat />
                    </div>
                </div>
            </div>
        </header>
    );
};


type TickerItemProps = {
    emoji: string;
    name: string;
    price: string;
    change: string;
    up?: boolean;
    flat?: boolean;
};


const TickerItem = ({
    emoji,
    name,
    price,
    change,
    up,
    flat,
}: TickerItemProps) => {

    return (
        <div className="flex items-center gap-2 whitespace-nowrap text-sm">
            <span className="text-lg">{emoji}</span>
            <span className="font-medium text-gray-800">{name}</span>
            <span className="text-gray-500">{price}</span>
            <span className={flat ? "font-semibold text-gray-500" : up ? "font-semibold text-green-600" : "font-semibold text-red-500"}>
                {change}
            </span>
        </div>
    );
};

export default Navbar;