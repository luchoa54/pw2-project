"use client"

import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { ProductDto } from "../product/Product.types";
import { TextInput } from "flowbite-react";
import { CartContext } from "@/providers/CartProvider/CartProvider";

interface CartListProps {
    cartItems: ProductDto[]
}

function Cart( { cartItems } : CartListProps ) {
    const { cartProducts } = useContext(CartContext)
    const [searchString, setSearchString] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(cartItems)
    
    useEffect( () => {
        setFilteredProducts(
            cartItems.filter((p) => 
                p.name.toLowerCase().includes(searchString.toLowerCase()) && cartProducts[p.id]
            )
        )
    }, [cartProducts, searchString, cartItems])

    const total = filteredProducts.reduce(
        (acc, p) =>acc + parseFloat(p.price) * cartProducts[p.id], 
        0
    )

    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                <TextInput onChange={(e) => setSearchString(e.target.value)} className="w-80"  type="text" placeholder="Pesquisa" required />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredProducts.map(p => <CartItem key={p.id} cartItem ={p}/>)}
            </div>   
            <div className="mt-2">Total</div>
        </div>
    )
}

export default Cart