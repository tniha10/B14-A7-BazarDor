import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

interface BazarPrice {
  id?: number | string;
  bazarName: string;
  location?: string;
  price: number;
}

interface ProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  description?: string;
  categories?: string[];
  category?: string;
  today: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  bazars?: BazarPrice[];
}

const toBnDigit = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "০";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const isAuthenticated = true; // Set your auth state check here
  if (!isAuthenticated) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error("Failed to fetch product details");
    }

    const product: ProductDetails = await res.json();

    const bazarList = product.bazars || [];
    const prices = bazarList.map((b) => b.price).filter((p) => typeof p === "number");
    
    const minPrice = product.minPrice ?? (prices.length ? Math.min(...prices) : product.today);
    const maxPrice = product.maxPrice ?? (prices.length ? Math.max(...prices) : product.today);
    const avgPrice =
      product.avgPrice ??
      (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : product.today);

    const categoriesList = product.categories || (product.category ? [product.category] : ["সবজি"]);

    return (
      <main className="min-h-screen bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f5f6f0] text-4xl">{product.image || "🌾"}</div>
              <div className="space-y-1.5 flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
                <p className="text-xs text-gray-500">{product.description || "আজকের বাজার দর সম্পর্কিত সর্বশেষ আপডেট ও বিস্তারিত তথ্য।"}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {categoriesList.map((cat, idx) => (
                    <span key={idx}className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{cat}</span>
                  ))}
                  <span className="rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{product.unit || "প্রতি কেজি"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                {toBnDigit(minPrice)} <span className="text-xs font-normal text-gray-500">টাকা</span>
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-rose-600">
                {toBnDigit(maxPrice)} <span className="text-xs font-normal text-gray-500">টাকা</span>
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-blue-600">
                {toBnDigit(avgPrice)} <span className="text-xs font-normal text-gray-500">টাকা</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">বাজারভিত্তিক আজকের দা</h2>
            {bazarList.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {bazarList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#fafbf8] p-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.bazarName}</p>
                      {item.location && (
                        <p className="text-xs text-gray-400">{item.location}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">{toBnDigit(item.price)} টাকা</p>
                      <p className="text-[10px] text-gray-400">{product.unit || "প্রতি কেজি"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-xs text-gray-500 py-6">বর্তমানে কোনো নির্দিষ্ট বাজারভিত্তিক ডেটা পাওয়া যায়নি।</p>
            )}
          </div>

        </div>
      </main>
    );
  } catch (error) {
    console.error("Product Details Error:", error);
    return (
      <div className="min-h-screen bg-[#f7f8f3] flex flex-col items-center justify-center p-4">
        <p className="text-sm text-red-500">পণ্যটির তথ্য লোড করতে ব্যর্থ হয়েছে।</p>
        <Link href="/" className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }
}