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
    let changeText = "—০.০%";
    let changeColor = "bg-gray-100 text-gray-600";

    if (product.change.dir === "up") {
        changeText = `▲ ${bengaliDigits(
            Math.abs(product.change.pct).toFixed(1)
        )}%`;

        changeColor = "bg-green-50 text-green-600";
    }

    if (product.change.dir === "down") {
        changeText = `▼ ${bengaliDigits(
            Math.abs(product.change.pct).toFixed(1)
        )}%`;

        changeColor = "bg-red-50 text-red-600";
    }

    return (
        <Link href={`/product/${product.slug}`} className="block">
            <div className="rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-sm">
                <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5F7F2] text-lg">{product.image}</div>

                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-900">{product.nameBn}</h3>
                        <p className="mt-0.5 text-[10px] text-gray-500">{getUnitText(product.unit)}</p>
                    </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                        <p className="text-[9px] text-gray-500">আজকের দাম</p>
                        <p className="mt-0.5 text-sm font-bold text-gray-900">{bengaliDigits(product.today.toLocaleString("en-US"))}{" "}টাকা</p>
                    </div>

                    <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${changeColor}`}>{changeText}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;