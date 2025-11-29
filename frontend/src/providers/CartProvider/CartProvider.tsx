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
  isInitialized: boolean;
}

const initialCart: CartContextProps = {
  cartProducts: {},
  incCartProduct: () => {},
  decCartProduct: () => {},
  isInitialized: false
};

export const CartContext = createContext<CartContextProps>(initialCart);

function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState<Record<string, number>>({});
  
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user) {
      api.get("/purchase/cart")
        .then((res) => {
          const rawData = res.data;
          const items = Array.isArray(rawData) ? rawData : (rawData.purchaseItems || []);
          
          const cartState: Record<string, number> = {};
          items.forEach((i: any) => {
            const id = i.productId || i.id; 
            cartState[id] = i.quantity || 1;
          });
          
          setCartProducts(cartState);
        })
        .catch(err => console.error(err))
        .finally(() => setIsInitialized(true));

    } else {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cartProducts");
        if (savedCart) {
          try {
            setCartProducts(JSON.parse(savedCart));
          } catch (error) {
            console.error("Erro ao ler localStorage", error);
          }
        }
      }
      setIsInitialized(true);
    }
  }, [user]);


  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts, user, isInitialized]);


  const incCartProduct = async (productId: string) => {
    setCartProducts((c) => ({
      ...c,
      [productId]: (c[productId] ?? 0) + 1,
    }));

    if (user) {
      try {
        await api.post("/purchaseItem/inc", { productId });
      } catch (err) { console.error(err); }
    }
  };

  const decCartProduct = async (productId: string) => {
    const currentQtd = cartProducts[productId];
    if (!currentQtd) return;

    if (user) {
      try {
        await api.post("/purchaseItem/dec", { productId });
      } catch (err) { console.error(err); }
    }

    if (currentQtd === 1) {
      const copy = { ...cartProducts };
      delete copy[productId];
      setCartProducts(copy);
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
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;