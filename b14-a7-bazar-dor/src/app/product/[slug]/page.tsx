import { notFound } from "next/navigation";

import ProductDetails, {
    type Product,
} from "@/app/components/ProductDetails";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    try {
        // Get all products
        const productsResponse = await fetch(
            `${BASE_URL}/products`,
            {
                cache: "no-store",
            }
        );

        if (!productsResponse.ok) {
            throw new Error(
                `Failed to fetch products: ${productsResponse.status}`
            );
        }

        const products: Product[] =
            await productsResponse.json();

        // Find the product by slug
        const product = products.find(
            (item) => item.slug === slug
        );

        // Product not found
        if (!product) {
            notFound();
        }

        // Get complete product details
        const detailsResponse = await fetch(
            `${BASE_URL}/products/${product.id}`,
            {
                cache: "no-store",
            }
        );

        if (!detailsResponse.ok) {
            throw new Error(
                `Failed to fetch product details: ${detailsResponse.status}`
            );
        }

        const productDetails: Product =
            await detailsResponse.json();

        return (
            <ProductDetails
                product={productDetails}
            />
        );
    } catch (error) {
        console.error(
            "Product details error:",
            error
        );

        throw new Error(
            "Could not load product details."
        );
    }
}

