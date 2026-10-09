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

const bengaliDigits = (value: number | string) => {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return String(value).replace(/\d/g, (digit) => {
        return digits[Number(digit)];
    });
};

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-3">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">সব পণ্য</h2>
                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">মোট {bengaliDigits(products.length)}টি পণ্য দেখানো হচ্ছে</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => (
                    <ProductCard key={product.id} product={product}/>))}
            </div>
        </section>
    );
};

export default AllProducts;