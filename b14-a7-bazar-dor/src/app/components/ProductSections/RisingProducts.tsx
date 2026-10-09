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

interface RisingProductsProps {
    products: Product[];
}

const RisingProducts = ({ products }: RisingProductsProps) => {
    const risingProducts = [...products]
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
           
            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    <span className="text-red-500">▲</span> আজ দাম বেড়েছে
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {risingProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>))}
            </div>
        </section>
    );
};

export default RisingProducts;