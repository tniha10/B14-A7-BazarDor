export interface MarketPrice {
    bazar?: string;
    market?: string;
    name?: string;
    price?: number;
    min?: number;
    max?: number;
    average?: number;
}

export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    today: number;

    change?: {
        dir: "up" | "down" | "flat";
        pct: number;
    };

    description?: string;
    subtitle?: string;

    category?: string;
    categories?: string[];

    minPrice?: number;
    maxPrice?: number;
    averagePrice?: number;

    markets?: MarketPrice[];
    bazars?: MarketPrice[];
    marketPrices?: MarketPrice[];
    prices?: MarketPrice[];
}

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const marketPrices = product.markets || product.bazars || product.marketPrices || product.prices || [];

    const prices = marketPrices
        .map((item) => {
            if (typeof item.price === "number") {
                return item.price;
            }

            if (typeof item.min === "number") {
                return item.min;
            }

            return null;
        })
        .filter(
            (price): price is number =>
                price !== null
        );

    const minimumPrice = product.minPrice ?? (prices.length > 0 ? Math.min(...prices) : product.today);

    const maximumPrice = product.maxPrice ?? (prices.length > 0 ? Math.max(...prices) : product.today);

    const averagePrice = product.averagePrice ?? (prices.length > 0 ? Math.round(prices.reduce((total, price) => total + price, 0) / prices.length) : product.today);

    const getMarketName = (market: MarketPrice) => {
        return (market.bazar || market.market || market.name || "বাজার");
    };

    const getMarketPrice = (market: MarketPrice) => {
        if (
            typeof market.price === "number"
        ) {
            return market.price;
        }

        if (
            typeof market.average === "number"
        ) {
            return market.average;
        }

        if (
            typeof market.min === "number"
        ) {
            return market.min;
        }

        return product.today;
    };

    const getChangeText = () => {
        if (!product.change) {
            return "";
        }

        if (
            product.change.dir === "up"
        ) {
            return `▲ ${product.change.pct}%`;
        }

        if (
            product.change.dir === "down"
        ) {
            return `▼ ${product.change.pct}%`;
        }

        return `— ${product.change.pct}%`;
    };

    const getChangeClass = () => {
        if (!product.change) {
            return "text-gray-500";
        }

        if (
            product.change.dir === "up"
        ) {
            return "text-green-600";
        }

        if (
            product.change.dir === "down"
        ) {
            return "text-red-600";
        }

        return "text-gray-500";
    };

    return (
        <main className="min-h-screen bg-[#f8f9f5] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
                    <div className="grid gap-8 md:grid-cols-[180px_1fr]">
                        <div className="flex min-h-40 items-center justify-center rounded-2xl bg-[#f5f6f0] text-7xl sm:min-h-48">{product.image}</div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{product.nameBn}</h1>

                                {product.change && (
                                    <span className={`text-sm font-semibold ${getChangeClass()}`}>{getChangeText()}</span>
                                )}
                            </div>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                                {product.description || product.subtitle || `${product.nameBn} এর আজকের বাজারদর বিভিন্ন বাজার অনুযায়ী দেখুন।`}
                            </p>

                           <div className="mt-5 flex flex-wrap gap-2">
                                {product.categories?.map((category) => (
                                        <span key={category} className="rounded-full bg-[#eef4dc] px-3 py-1 text-sm font-medium text-[#4f6500]">{category}</span>
                                    )
                                )}

                                {product.category && !product.categories && (
                                        <span className="rounded-full bg-[#eef4dc] px-3 py-1 text-sm font-medium text-[#4f6500]">{product.category}</span>
                                    )}
                            </div>

                            <p className="mt-5 text-sm font-medium text-gray-500">{product.unit}</p>
                        </div>
                    </div>
                </section>

                <section className="mt-6">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">দামের সারাংশ</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{minimumPrice.toLocaleString("bn-BD")}{" "}টাকা</p>
                        </div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{maximumPrice.toLocaleString("bn-BD")}{" "}টাকা</p>
                        </div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">গড় দাম</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{averagePrice.toLocaleString("bn-BD")}{" "}টাকা</p>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">বাজারভিত্তিক আজকের দাম</h2>
                        <p className="mt-1 text-sm text-gray-500">বিভিন্ন বাজারে আজকের{" "}{product.nameBn} এর দাম</p>
                    </div>

                    {marketPrices.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-[#f7f8f3] text-left">
                                            <th className="px-5 py-4 text-sm font-semibold text-gray-700">বাজার</th>
                                            <th className="px-5 py-4 text-sm font-semibold text-gray-700">আজকের দাম</th>
                                            <th className="px-5 py-4 text-sm font-semibold text-gray-700">একক</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {marketPrices.map(
                                            (market, index) => (
                                                <tr key={`${getMarketName(market)}-${index}`} className="border-b border-gray-100 last:border-0">
                                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{getMarketName(market)}</td>

                                                    <td className="px-5 py-4 text-base font-bold text-gray-900">{getMarketPrice(market).toLocaleString(
                                                            "bn-BD"
                                                        )}{" "}
                                                        টাকা
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-gray-500">
                                                        {
                                                            product.unit
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                            <p className="text-gray-500">
                                বাজারভিত্তিক দামের
                                তথ্য পাওয়া যায়নি।
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default ProductDetails;