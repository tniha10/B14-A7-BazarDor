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

const toBnDigit = (num: number | string | undefined): string => {
  if (num === undefined || num === null) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export default function CategoryPage(): React.JSX.Element {
  const params = useParams();
  const categoryParam = (params?.category as string) || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<"default" | "lowToHigh" | "highToLow">("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/products`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const allProducts: Product[] = await response.json();

        const filtered = allProducts.filter((product) => {
          if (product.category) {
            return product.category.toLowerCase() === categoryParam.toLowerCase();
          }
          if (product.categories) {
            return product.categories.some(
              (cat) => cat.toLowerCase() === categoryParam.toLowerCase()
            );
          }
          return false;
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
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

  const categoryNameBn =
    categoryParam.toLowerCase() === "chal"
      ? "চাল"
      : categoryParam.toLowerCase() === "sobji"
      ? "সবজি"
      : categoryParam;

  return (
    <main className="min-h-screen bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f6f0] text-3xl">🍚</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
            <p className="mt-1 text-xs text-gray-500">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-100 text-xs text-gray-600">
          <p className="text-xs text-gray-500 font-medium sm:hidden">মোট {toBnDigit(sortedProducts.length)} টি পণ্য</p>
          <div className="flex items-center gap-2">
            <span>সাজান:</span>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value as "default" | "lowToHigh" | "highToLow")} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 outline-none focus:border-emerald-500">
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <p className="hidden sm:block text-xs text-gray-500 font-medium">মোট {toBnDigit(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে</p>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                  <div className="h-5 w-1/3 rounded bg-gray-200" />
                  <div className="h-5 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5f6f0] text-2xl">{product.image || "🌾"}</div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-sm">{product.nameBn}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">{product.unit || "প্রতি কেজি"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">আজকের দাম</p>
                    <p className="text-lg font-extrabold text-gray-900">{toBnDigit(product.today)} টাকা</p>
                  </div>

                  {product.change && (
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold ${
                        product.change.dir === "up"
                          ? "bg-rose-50 text-rose-600"
                          : product.change.dir === "down"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
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
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="text-lg font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 max-w-sm">
              এই ক্যাটাগরিতে বর্তমানে কোনো ডেটা নেই অথবা লিংকটি ভুল হতে পারে।
            </p>
            <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors">হোম পেজে ফিরে যান</Link>
          </div>
        )}
      </div>
    </main>
  );
}