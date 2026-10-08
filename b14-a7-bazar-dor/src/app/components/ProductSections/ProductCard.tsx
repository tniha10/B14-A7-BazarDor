import Link from "next/link";

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

interface ProductCardProps {
    product: Product;
}

const bengaliDigits = (value: number | string) => {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return String(value).replace(/\d/g, (digit) => {
        return digits[Number(digit)];
    });
};

const getUnitText = (unit: string) => {
    switch (unit) {
        case "kg":
            return "প্রতি কেজি";
        case "litre":
            return "প্রতি লিটার";
        case "dozen":
            return "প্রতি ডজন";
        case "piece":
            return "প্রতি পিস";
        default:
            return unit;
    }
};

const ProductCard = ({ product }: ProductCardProps) => {
    const change = product.change.pct;

    let changeText = "— ০.০%";
    let changeColor = "bg-gray-100 text-gray-600";

    if (product.change.dir === "up") {
        changeText = `▲ ${bengaliDigits(Math.abs(change).toFixed(1))}%`;
        changeColor = "bg-green-100 text-green-700";
    }

    if (product.change.dir === "down") {
        changeText = `▼ ${bengaliDigits(Math.abs(change).toFixed(1))}%`;
        changeColor = "bg-red-100 text-red-700";
    }

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="group h-full cursor-pointer rounded-2xl border border-gray-200 bg-white p-5">
                <div className="mb-5 flex h-28 items-center justify-center rounded-xl bg-[#F7F8F3] text-6xl">{product.image}</div>
                <h3 className="text-lg font-bold text-gray-900">{product.nameBn}</h3>
                <p className="mt-1 text-sm text-gray-500">{getUnitText(product.unit)}</p>
                <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="mt-1 text-xl font-bold text-gray-900">{bengaliDigits(product.today.toLocaleString("en-US"))}{" "}টাকা</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${changeColor}`}>{changeText}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;