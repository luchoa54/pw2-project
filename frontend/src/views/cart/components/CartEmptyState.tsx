"use client";

import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

export function CartEmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-sm w-full">
        <div className="flex flex-col items-center pb-4 text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-6 dark:bg-blue-900/20">
            <FaShoppingBag className="text-4xl text-blue-600 dark:text-blue-400" />
          </div>

          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Seu carrinho está vazio
          </h5>

          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Parece que você ainda não adicionou nenhum produto. Explore nossa
            loja e encontre as melhores ofertas!
          </p>

          <Link href="/" className="w-full">
            <Button gradientDuoTone="cyanToBlue" className="w-full" size="lg">
              Começar a Comprar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}