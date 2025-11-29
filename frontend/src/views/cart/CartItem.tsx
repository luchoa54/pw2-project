"use client";

import { Card } from "flowbite-react";
import { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductDto } from "@/views/product/Product.types";
import styles from "@/views/product/Product.module.css";
import { CounterContext } from "@/providers/CounterProvider/CounterProvider";
import { CartContext } from "@/providers/CartProvider/CartProvider";

interface CartCardProps {
  cartItem: ProductDto;
}

export function CartItem({ cartItem }: CartCardProps) {
  const { cartProducts, incCartProduct, decCartProduct } = useContext(CartContext)
  const qtdCart = cartProducts[cartItem.id] ?? 0
  const decreaseCart = () => decCartProduct(cartItem.id);
  const increaseCart = () => incCartProduct(cartItem.id);
  const count = useContext(CounterContext)
  
  return (
    // <Card href={`/product/${product.id}`} className="max-w-sm">
      <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {cartItem.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        <b>Preço:</b>{cartItem.price}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {cartItem.description}
      </p>
      <p className="flex gap-2">
        <button
          className={styles.buttonIcon}
          onClick={decreaseCart}
          disabled={qtdCart == 0}
        >
          <FaMinus />
        </button>
        {qtdCart}
        <button 
        className={styles.buttonIcon} 
        onClick={increaseCart}>
        <FaPlus />
        </button>
      </p>
    </Card>
  );
}
 
export default CartItem;
