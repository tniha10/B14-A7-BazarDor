"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  category?: string;
  categories?: string[];
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryInfo {
  nameBn: string;
  icon: string;
  aliases: string[];
}

type SortOption = "default" | "lowToHigh" | "highToLow";

const CATEGORIES: CategoryInfo[] = [
  { nameBn: "সব", icon: "🛒", aliases: ["all", "sob", "সব"] },
  { nameBn: "চাল", icon: "🍚", aliases: ["rice", "chal", "চাল"] },
  { nameBn: "ডাল", icon: "🫘", aliases: ["dal", "daal", "pulses", "lentils", "ডাল"] },
  { nameBn: "তেল", icon: "🛢️", aliases: ["oil", "tel", "তেল"] },
  {
    nameBn: "সবজি",
    icon: "🥦",
    aliases: ["vegetables", "vegetable", "veg", "sobji", "sabji", "shobji", "সবজি"],
  },
  { nameBn: "মাছ", icon: "🐟", aliases: ["fish", "mach", "mas", "মাছ"] },
  { nameBn: "মাংস", icon: "🥩", aliases: ["meat", "mangsho", "mangso", "মাংস"] },
  { nameBn: "ডিম", icon: "🥚", aliases: ["egg", "eggs", "dim", "ডিম"] },
  {
    nameBn: "মসলা",
    icon: "🌶️",
    aliases: ["spices", "spice", "moshla", "masala", "মসলা"],
  },
];

const styles = {
  main: "min-h-screen bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8",
  wrap: "mx-auto max-w-6xl space-y-6",
  card: "rounded-2xl border border-gray-100 bg-white shadow-sm",
  headerCard:
    "flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm",
  iconBox:
    "flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f6f0] text-3xl",
  sortBar:
    "flex items-center justify-between rounded-2xl border border-gray-100 " +
    "bg-white px-6 py-4 text-xs text-gray-600 shadow-sm sm:justify-end",
  select:
    "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs " +
    "font-medium text-gray-800 outline-none focus:border-emerald-500",
  grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  skeleton:
    "animate-pulse space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm",
  productCard:
    "flex flex-col justify-between rounded-2xl border border-gray-100 " +
    "bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
  productIcon:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl " +
    "bg-[#f5f6f0] text-2xl",
  emptyBox:
    "flex flex-col items-center justify-center space-y-4 rounded-2xl " +
    "border border-gray-100 bg-white p-12 text-center shadow-sm",
  homeBtn:
    "inline-flex items-center justify-center rounded-xl bg-emerald-600 " +
    "px-5 py-2.5 text-xs font-semibold text-white shadow-sm " +
    "transition-colors hover:bg-emerald-700",
};

const normalize = (value: string): string => {
  let v = value;
  try {
    v = decodeURIComponent(value);
  } catch {
    // keeps the raw value if it cannot be decoded
  }
  return v.trim().toLowerCase();
};

const findCategory = (param: string): CategoryInfo | undefined => {
  const key = normalize(param);
  return CATEGORIES.find((c) => c.aliases.includes(key));
};

const toBnDigit = (num: number | string | undefined): string => {
  if (num === undefined || num === null) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

const changeClass = (dir: "up" | "down" | "flat"): string => {
  const base =
    "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold ";
  if (dir === "up") return base + "bg-rose-50 text-rose-600";
  if (dir === "down") return base + "bg-emerald-50 text-emerald-600";
  return base + "bg-gray-100 text-gray-500";
};

export default function CategoryPage(): React.JSX.Element {
  const params = useParams();
  const categoryParam = (params?.category as string) || "";

  const categoryInfo = findCategory(categoryParam);
  const categoryNameBn = categoryInfo?.nameBn ?? normalize(categoryParam);
  const categoryIcon = categoryInfo?.icon ?? "🌾";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/products`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const allProducts: Product[] = Array.isArray(data)
          ? data
          : data.products ?? [];

        const info = findCategory(categoryParam);
        const wanted = info ? info.aliases : [normalize(categoryParam)];

        const filtered = allProducts.filter((product) => {
          if (info && info.aliases.includes("all")) return true;

          const productCats: string[] = [
            ...(product.category ? [product.category] : []),
            ...(product.categories ?? []),
          ].map((c) => normalize(c));

          return productCats.some((c) => wanted.includes(c));
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (categoryParam) {
      fetchProducts();
    }
  }, [categoryParam]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.today - b.today;
    if (sortOption === "highToLow") return b.today - a.today;
    return 0;
  });

  const totalText = toBnDigit(sortedProducts.length);

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <div className={styles.headerCard}>
          <div className={styles.iconBox}>{categoryIcon}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryNameBn}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className={styles.sortBar}>
          <p className="text-xs font-medium text-gray-500 sm:hidden">
            মোট {totalText} টি পণ্য
          </p>
          <div className="flex items-center gap-2">
            <span>সাজান:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className={styles.select}
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <p className="hidden text-xs font-medium text-gray-500 sm:block">
          মোট {totalText} টি পণ্য দেখানো হচ্ছে
        </p>

        {loading ? (
          <div className={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className={styles.skeleton}>
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                  <div className="h-5 w-1/3 rounded bg-gray-200" />
                  <div className="h-5 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={styles.productCard}
              >
                <div className="flex items-start gap-3">
                  <div className={styles.productIcon}>
                    {product.image || "🌾"}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">
                      {product.nameBn}
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {product.unit || "প্রতি কেজি"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-3">
                  <div>
                    <p className="text-[10px] font-medium text-gray-400">
                      আজকের দাম
                    </p>
                    <p className="text-lg font-extrabold text-gray-900">
                      {toBnDigit(product.today)} টাকা
                    </p>
                  </div>

                  {product.change && (
                    <span className={changeClass(product.change.dir)}>
                      {product.change.dir === "up" && "▲ "}
                      {product.change.dir === "down" && "▼ "}
                      {product.change.dir === "flat" && "— "}
                      {toBnDigit(product.change.pct)}%
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyBox}>
            <div className="text-5xl">🔍</div>
            <h3 className="text-lg font-bold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="max-w-sm text-xs text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো ডেটা নেই অথবা লিংকটি ভুল হতে পারে।
            </p>
            <Link href="/" className={styles.homeBtn}>
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}