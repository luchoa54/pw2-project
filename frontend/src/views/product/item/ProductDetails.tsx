// "use client" é necessário para o seletor de quantidade (useState)
"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductDto } from "../Product.types";

interface ProductDetailsProp {
  product: ProductDto;
}

function ProductDetails({ product }: ProductDetailsProp) {
  const [qtdCart, setQtdCart] = useState<number>(0);
  
  const increaseCart = () =>
    setQtdCart((prev) => Math.min(prev + 1, product.stock));
    
  const decreaseCart = () => setQtdCart((prev) => Math.max(prev - 1, 0));

  const formattedPrice = Number(product.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">

        <div className="md:w-1/2">
          <div className="w-full h-96 md:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            <span className="text-gray-500 text-lg">Imagem do Produto</span>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <p className="text-3xl font-light text-blue-600 dark:text-blue-400">
            {formattedPrice}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.stock > 0
              ? `${product.stock} unidades em estoque`
              : "Produto indisponível"}
          </p>

          <h2 className="text-xl font-semibold mt-4 dark:text-white">Descrição</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            
            <div className="flex gap-2 items-center border rounded-lg p-2 dark:border-gray-600">
              <button
                className="p-1 disabled:opacity-50"
                onClick={decreaseCart}
                disabled={qtdCart === 0}
              >
                <FaMinus />
              </button>
              
              <span className="w-10 text-center font-bold text-lg">
                {qtdCart}
              </span>

              <button
                className="p-1 disabled:opacity-50"
                onClick={increaseCart}
                disabled={qtdCart === product.stock || product.stock === 0}
              >
                <FaPlus />
              </button>
            </div>
            
            <Button
              size="lg"
              disabled={qtdCart === 0 || product.stock === 0}
              onClick={() => console.log(`Adicionando ${qtdCart} de ${product.name} ao carrinho`)}
            >
              Adicionar ao Carrinho
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;