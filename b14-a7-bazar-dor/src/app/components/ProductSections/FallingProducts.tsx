import ProductCard from "./ProductCard";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface FallingProductsProps {
    products: Product[];
}

const FallingProducts = ({ products }: FallingProductsProps) => {
    const fallingProducts = [...products]
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    <span className="text-green-600">▼</span> আজ দাম কমেছে
                </h2>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {fallingProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default FallingProducts;