"use client"

import React, { useContext, useMemo, useState } from "react";
import CartItem from "./CartItem";
import { ProductDto } from "../product/Product.types";
import { CartContext } from "@/providers/CartProvider/CartProvider";

interface CartListProps {
    cartItems: ProductDto[]
}

function Cart( { cartItems } : CartListProps ) {
    // 1. Pegue o isInitialized do contexto
    const { cartProducts, isInitialized } = useContext(CartContext)
    const [searchString, setSearchString] = useState('')

    // 2. Filtramos os produtos ativos
    // Essa lista vai excluir os produtos que tem quantidade 0
    const activeProducts = useMemo(() => {
        if (!Array.isArray(cartItems)) return [];

        return cartItems.filter((p) => {
            // Filtro de texto
            const matchesSearch = p.name.toLowerCase().includes(searchString.toLowerCase());
            
            // Filtro de quantidade (Lógica Anti-Zumbi)
            // Se inicializado: Pega do contexto. Se undefined, assume 0.
            // Se NÃO inicializado: Pega do servidor (p.quantity).
            const contextQty = cartProducts[p.id];
            const currentQty = isInitialized 
                ? (contextQty || 0) 
                : (p as any).quantity || 0;

            // Só mantém na lista se corresponder à busca E tiver quantidade > 0
            return matchesSearch && currentQty > 0;
        })
    }, [cartItems, searchString, cartProducts, isInitialized]);

    const total = activeProducts.reduce((acc, p) => {
        // Como já filtramos os itens zero no activeProducts, 
        // aqui podemos confiar que eles tem quantidade.
        
        // Recalculamos a qtd só para garantir (ou podíamos ter retornado objetos com qtd no useMemo)
        const contextQty = cartProducts[p.id];
        const qty = isInitialized ? (contextQty || 0) : (p as any).quantity || 1;
        
        return acc + parseFloat(p.price) * qty;
    }, 0);

    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-bold">Lista de Produtos</h1>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {activeProducts.map(p => (
                    <CartItem 
                        key={p.id} 
                        cartItem={p} 
                        quantity={isInitialized ? (cartProducts[p.id] || 0) : (p as any).quantity || 1}
                    />
                ))}
            </div>   
            <div className="mt-4 text-xl font-bold">
                Total: R$ {total.toFixed(2)}
            </div>
        </div>
    )
}

export default Cart