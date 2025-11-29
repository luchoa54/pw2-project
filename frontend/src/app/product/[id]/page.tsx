import ProductDetails from "@/views/product/item/ProductDetails";
import React from "react";

interface ProductPageProps {
    params: {
        id: string
    };
}

async function ProductPage( { params } : ProductPageProps) {
    const { id } = params;
    const resp = await fetch(`${process.env.NEXT_PUBLIC_DOCKER_API}/product/${id}`)
    const product = await resp.json()
    return <ProductDetails product={product}></ProductDetails>
}

export default ProductPage