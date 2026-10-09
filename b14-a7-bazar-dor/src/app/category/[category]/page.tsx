import Link from "next/link";

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

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    try {
        const response = await fetch(`${BASE_URL}/products`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch category products");
        }

        const allProducts: Product[] = await response.json();

        const filteredProducts = allProducts.filter((product) => {
            if (product.category) {
                return product.category.toLowerCase() === category.toLowerCase();
            }
            if (product.categories) {
                return product.categories.some((cat) => cat.toLowerCase() === category.toLowerCase());
            }
            return false;
        });

        const categoryNameBn =
            category.toLowerCase() === "chal" ? "চাল" : category;

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

                    <div className="flex items-center justify-end rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-100 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>সাজান</span>
                            <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 outline-none">
                                <option>ডিফল্ট</option>
                                <option>কম দাম আগে</option>
                                <option>বেশি দাম আগে</option>
                            </select>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 font-medium">মোট {toBnDigit(filteredProducts.length)} টি পণ্য দেখানো হচ্ছে</p>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <Link key={product.id} href={`/product/${product.slug}`} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
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
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</div>
                    )}
                </div>
            </main>
        );
    } catch (error) {
        console.error("Category page error:", error);
        throw new Error("Could not load category products.");
    }
}