"use client"

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductDto } from "../Product.types";
import { TextInput } from "flowbite-react";

interface ProductListProps {
    products: ProductDto[]
}

function ProductList( { products } : ProductListProps ) {
    const [searchString, setSearchString] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect( () => {
        setFilteredProducts(
            products.filter((p) => 
                p.name.toLowerCase().includes(searchString.toLowerCase())
            )
        )
    }, [searchString, products])

    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                <TextInput onChange={(e) => setSearchString(e.target.value)} className="w-80"  type="text" placeholder="pesquisa" required />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredProducts.map(p => <ProductCard key={p.id} product ={p}/>)}
            </div>   
        </div>
    )
}

export default ProductList