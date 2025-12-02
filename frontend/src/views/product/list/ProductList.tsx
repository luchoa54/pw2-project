"use client"

import React, { useState, useMemo } from "react";
import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa"; // Importando ícone de lupa
import ProductCard from "./ProductCard";
import { ProductDto } from "../Product.types";
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
        <div className="container mx-auto p-4">
            {/* Cabeçalho com Título e Busca */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white self-start md:self-auto">
                    Lista de Produtos
                </h1>
                
                <div className="w-full md:w-96">
                    <TextInput 
                        icon={FaSearch}
                        onChange={(e) => setSearchString(e.target.value)} 
                        type="text" 
                        placeholder="Pesquisar produto..." 
                        required 
                        className="w-full"
                    />
                </div>
            </div>

            {/* Conteúdo: Grid ou Mensagem de Vazio */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p}/>
                    ))}
                </div>   
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-gray-400 text-6xl mb-4">
                        <FaSearch />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Nenhum produto encontrado
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Não encontramos nada para "{searchString}". Tente outro termo.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductList