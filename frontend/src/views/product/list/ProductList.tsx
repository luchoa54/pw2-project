"use client"

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { ProductDto } from "../Product.types";
import { TextInput } from "flowbite-react";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductListProps {
    products: ProductDto[]
}

function ProductList({ products }: ProductListProps) {
    const [searchString, setSearchString] = useState('')
    const debouncedSearch = useDebounce(searchString, 500);

    const filteredProducts = useMemo(() => {
        if (debouncedSearch && debouncedSearch.length < 3) {
             return products; 
        }

        return products.filter((p) => 
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    }, [products, debouncedSearch])

    return (
        <div>
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                <TextInput 
                    onChange={(e) => setSearchString(e.target.value)} 
                    className="w-80"  
                    type="text" 
                    placeholder="Pesquisa" 
                    required 
                />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>   
        </div>
    )
}

export default ProductList