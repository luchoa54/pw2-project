"use client";

import { Card } from "flowbite-react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductDto } from "../Product.types";
import styles from "../Product.module.css";

interface ProductCardProps {
  product: ProductDto;
}

export function ProductCard({ product }: ProductCardProps) {
  const [qtdCart, setQtdCart] = useState<number>(0);
  const decreaseCart = () => setQtdCart((p) => Math.max(p - 1, 0));
  const increaseCart = () => setQtdCart((p) => Math.max(p + 1, 100));
  return (
    <Card href={`/product/${product.id}`} className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      <p className="flex gap-2">
        <button className={styles.buttonIcon} onClick={decreaseCart} disabled={qtdCart == 0}>
          <FaMinus />
        </button>
        {qtdCart}
        <button className={styles.buttonIcon} onClick={increaseCart}>
          <FaPlus />
        </button>
      </p>
    </Card>
  );
}

export default ProductCard;
