import { Suspense } from "react";

import Banner from "./components/Banner";
import RisingProducts from "./components/ProductSections/RisingProducts";
import FallingProducts from "./components/ProductSections/FallingProducts";
import AllProducts from "./components/ProductSections/AllProducts";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } 
        catch (error) {
        console.error("Product fetching error:", error);

        return [];
    }
};

const ProductSections = async () => {
    const products = await getProducts();

    return (
        <>
            <RisingProducts products={products} />
            <FallingProducts products={products} />
            <AllProducts products={products} />
        </>
    );
};

const HomePage = () => {
    return (
        <main className="min-h-screen bg-[#F9FAF6]">
            <Banner />

            <Suspense
                fallback={
                    <div className="mx-auto max-w-7xl px-4 py-20 text-center text-gray-500">পণ্য লোড হচ্ছে...</div>
                }
            >
                <ProductSections />
            </Suspense>
        </main>
    );
};

export default HomePage;