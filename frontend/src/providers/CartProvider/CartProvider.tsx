"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "@/utils/api";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface CartContextProps {
  cartProducts: Record<string, number>;
  incCartProduct: (productId: string) => void;
  decCartProduct: (productId: string) => void;
}

const initialCart: CartContextProps = {
  cartProducts: {},
  incCartProduct: () => {},
  decCartProduct: () => {},
};

export const CartContext = createContext<CartContextProps>(initialCart);

function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (user) {
      api.get("/purchase/cart").then((res) => {
        const items = res.data.purchaseItems || [];
        const cartState: Record<string, number> = {};
        items.forEach((i: any) => {
          cartState[i.productId] = i.quantity;
        });
        setCartProducts(cartState);
      });
    } else {
      const savedCart = localStorage.getItem("cartProducts");
      if (savedCart) {
        setCartProducts(JSON.parse(savedCart));
      }
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const incCartProduct = async (productId: string) => {
    if (user) {
      try {
        await api.post("/purchaseItem/inc", { productId });
      } catch (err) {
        console.log("Erro ao atualizar no backend", err);
      }
    }

    setCartProducts((c) => ({
      ...c,
      [productId]: (c[productId] ?? 0) + 1,
    }));
  };

  const decCartProduct = async (productId: string) => {
    if (user) {
      try {
        await api.post("/purchaseItem/dec", { productId });
      } catch (err) {
        console.log(err);
      }
    }

    if (cartProducts[productId] === 1) {
      const copyCartProducts = { ...cartProducts };
      delete copyCartProducts[productId];
      setCartProducts(copyCartProducts);
    } else {
      setCartProducts((c) => ({
        ...c,
        [productId]: c[productId] - 1,
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        incCartProduct,
        decCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;