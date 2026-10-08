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

interface AllProductsProps {
    products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    সব পণ্য
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    বাজারের সব পণ্যের আজকের দাম এক নজরে দেখুন
                </p>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;