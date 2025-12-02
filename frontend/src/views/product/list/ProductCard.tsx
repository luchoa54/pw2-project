"use client";

import { Card } from "flowbite-react";
import { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductDto } from "../Product.types";
import { CartContext } from "@/providers/CartProvider/CartProvider";

interface ProductCardProps {
  product: ProductDto;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartProducts, incCartProduct, decCartProduct } = useContext(CartContext);
  
  const qtdCart = cartProducts[product.id] ?? 0;
  const decreaseCart = () => decCartProduct(product.id);
  const increaseCart = () => incCartProduct(product.id);
  const formattedPrice = parseFloat(product.price.toString()).toFixed(2);

  return (
    <Card 
      className="max-w-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-200"
    >
      <div className="flex flex-col gap-2 h-full justify-between">
        <div>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h5>
          
          <p className="font-normal text-sm text-white-600 dark:text-gray-400 line-clamp-3 mb-4 h-15">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          
          <span className="text-2xl font-bold text-white-600 dark:text-white-400">
            <span className="text-sm font-normal text-gray-500 mr-1">R$</span>
            {formattedPrice}
          </span>

          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-md px-1 py-1 border-gray-100">
            
            <button
              onClick={decreaseCart}
              disabled={qtdCart === 0}
              className={`
                w-8 h-8 flex items-center justify-center rounded-full transition-colors
                ${qtdCart === 0 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-white-500 hover:bg-white hover:shadow-sm active:scale-95"
                }
              `}
            >
              <FaMinus size={12} />
            </button>

            <span className="font-semibold text-gray-900 dark:text-white w-6 text-center select-none">
              {qtdCart}
            </span>

            <button 
              onClick={increaseCart}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white-600 hover:bg-white hover:shadow-sm active:scale-95 transition-all"
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
 
export default ProductCard;