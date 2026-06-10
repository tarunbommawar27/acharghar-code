import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, size?: string, quantity?: number) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  bump: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "achar-ghar-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);
    return {
      items,
      count,
      subtotal,
      bump,
      add: (product, size = "500g", quantity = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.product.id === product.id && p.size === size);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
            return copy;
          }
          return [...prev, { product, size, quantity }];
        });
        setBump((b) => b + 1);
      },
      remove: (productId, size) =>
        setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size))),
      setQty: (productId, size, quantity) =>
        setItems((prev) =>
          prev
            .map((i) =>
              i.product.id === productId && i.size === size
                ? { ...i, quantity: Math.max(1, quantity) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, bump]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
