"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import CartItem from "./CartItem";
import { ProductDto } from "../product/Product.types";
import { CartContext } from "@/providers/CartProvider/CartProvider";
import api from "@/utils/api";

import { CartEmptyState } from "./components/CartEmptyState";
import { CartSummary } from "./components/CartSummary";
import { CartLoading } from "./components/CartLoading";

interface CartListProps {
  cartItems: ProductDto[];
}

function Cart({ cartItems: serverItems }: CartListProps) {
  const { cartProducts, isInitialized } = useContext(CartContext);
  const [searchString, setSearchString] = useState("");
  const [guestProducts, setGuestProducts] = useState<ProductDto[]>([]);
  const [loadingGuest, setLoadingGuest] = useState(false);

  useEffect(() => {
    if (serverItems.length > 0) return;
    if (!isInitialized) return;

    const localIds = Object.keys(cartProducts);

    if (localIds.length > 0) {
      setLoadingGuest(true);
      api.get("/product")
        .then((res) => {
          const allProducts = res.data;
          const myProducts = allProducts.filter((p: ProductDto) => cartProducts[p.id]);
          setGuestProducts(myProducts);
        })
        .catch((err) => console.error("Erro ao carregar produtos do guest", err))
        .finally(() => setLoadingGuest(false));
    }
  }, [serverItems, isInitialized, cartProducts]);

  const displayItems = serverItems.length > 0 ? serverItems : guestProducts;

  const activeProducts = useMemo(() => {
    if (!displayItems) return [];
    return displayItems.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchString.toLowerCase());
      const contextQty = cartProducts[p.id];
      const currentQty = isInitialized ? contextQty || 0 : (p as any).quantity || 0;
      return matchesSearch && currentQty > 0;
    });
  }, [displayItems, searchString, cartProducts, isInitialized]);

  const total = activeProducts.reduce((acc, p) => {
    const qty = isInitialized ? cartProducts[p.id] || 0 : (p as any).quantity || 1;
    return acc + parseFloat(p.price) * qty;
  }, 0);

  if (loadingGuest) {
    return <CartLoading />;
  }

  if (activeProducts.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meu Carrinho
        </h1>
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          {activeProducts.length} {activeProducts.length === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeProducts.map((p) => (
          <CartItem
            key={p.id}
            cartItem={p}
            quantity={isInitialized ? cartProducts[p.id] || 0 : (p as any).quantity || 1}
          />
        ))}
      </div>

      <CartSummary total={total} />
    </div>
  );
}

export default Cart;