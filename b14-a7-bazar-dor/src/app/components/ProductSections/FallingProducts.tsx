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
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">আজ দাম কমেছে ▼</h2>
                <p className="mt-2 text-sm text-gray-500">যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {fallingProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    );
};

export default FallingProducts;