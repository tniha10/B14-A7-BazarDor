import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: MarketPrice[];
}

const toBn = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

const unitLabel = (unit: string) => (unit === "kg" ? "কেজি" : unit);

// Fetches the product list and finds the product by slug.
// Returns null if no product has that slug. Throws on network/server errors.
async function getProduct(slug: string): Promise<Product | null> {
  const url = `${BASE_URL}/products`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);

  const json = await res.json();
  const list: Product[] = Array.isArray(json) ? json : json?.data ?? [];

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // keep raw slug
  }

  return list.find((p) => p.slug === decoded) ?? null;
}

function ProductSkeleton() {
  return (
    <div className="bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
        <div className="h-4 w-48 rounded bg-gray-200" />
        <div className="h-32 rounded-2xl bg-white border border-gray-100" />
        <div className="h-40 rounded-2xl bg-white border border-gray-100" />
        <div className="h-72 rounded-2xl bg-white border border-gray-100" />
      </div>
    </div>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const isAuthenticated = true; // Set your auth state check here
  if (!isAuthenticated) {
    redirect("/login");
  }

  let product: Product | null = null;

  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Product Details Error:", error);
    return (
      <div className="bg-[#f7f8f3] flex flex-col items-center justify-center px-4 py-24">
        <p className="text-sm text-red-500">পণ্যটির তথ্য লোড করতে ব্যর্থ হয়েছে।</p>
        <Link
          href="/"
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Must stay OUTSIDE the try/catch, otherwise the catch swallows it
  if (!product) notFound();

  const markets = [...(product.markets ?? [])].sort((a, b) => a.max - b.max);

  const lowest = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const highest = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const average = product.today;

  const lowestMarket = markets.find((m) => m.min === lowest);
  const highestMarket = markets.find((m) => m.max === highest);

  const diff = Math.abs(product.today - product.yesterday);
  const dir = product.change?.dir ?? "flat";
  const pct = Math.abs(product.change?.pct ?? 0);

  const changeText =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const changeColor =
    dir === "up"
      ? "text-rose-600"
      : dir === "down"
      ? "text-emerald-600"
      : "text-gray-500";
  const changeArrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "–";

  return (
    <div className="bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-600">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-600"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        {/* Header card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f5f6f0] text-4xl">
              {product.image || product.categoryIcon || "🌾"}
            </div>

            <div className="flex-1 space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-500">
                প্রতি {unitLabel(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-600">{changeText}</p>
            </div>

            <div className="rounded-2xl bg-[#f5f6f0] px-6 py-4 text-center">
              <p className="text-[11px] text-gray-500">আজকের দাম</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {toBn(product.today)}
              </p>
              <p className="text-[11px] text-gray-500">
                টাকা / {unitLabel(product.unit)}
              </p>
              <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
                {changeArrow} {toBn(pct)}%
              </p>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-extrabold text-emerald-600">
                {toBn(lowest)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>
              {lowestMarket && (
                <p className="mt-1 text-[11px] text-gray-400">
                  {lowestMarket.market}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-xl font-extrabold text-rose-600">
                {toBn(highest)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>
              {highestMarket && (
                <p className="mt-1 text-[11px] text-gray-400">
                  {highestMarket.market}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="mt-1 text-xl font-extrabold text-emerald-600">
                {toBn(average)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>
              <p className="mt-1 text-[11px] text-gray-400">
                প্রতি {unitLabel(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise table */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500">
                    <th className="py-3 text-left font-medium">বাজার</th>
                    <th className="py-3 text-left font-medium">বিভাগ</th>
                    <th className="py-3 text-right font-medium">সর্বনিম্ন</th>
                    <th className="py-3 text-right font-medium">সর্বোচ্চ</th>
                    <th className="py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => {
                    const avg = (m.min + m.max) / 2;
                    return (
                      <tr
                        key={`${m.market}-${i}`}
                        className="border-b border-gray-100 odd:bg-[#fafbf8]"
                      >
                        <td className="py-3 pr-2 font-medium text-gray-900">
                          {m.market}
                        </td>
                        <td className="py-3 pr-2 text-gray-600">
                          {m.division}
                        </td>
                        <td className="py-3 text-right text-gray-700">
                          {toBn(m.min)} টাকা
                        </td>
                        <td className="py-3 text-right text-gray-700">
                          {toBn(m.max)} টাকা
                        </td>
                        <td className="py-3 text-right font-bold text-gray-900">
                          {toBn(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-gray-500">
              বর্তমানে কোনো নির্দিষ্ট বাজারভিত্তিক ডেটা পাওয়া যায়নি।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// The page itself does no dynamic work, so it prerenders instantly.
export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}