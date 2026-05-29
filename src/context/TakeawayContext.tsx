import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { bundleMeals } from "@/data/bundles";
import { menu } from "@/data/menu";
import { MAX_CART_LINES, MAX_QTY_PER_ITEM } from "@/config/business";

type CartItem = {
  dishId: string;
  quantity: number;
};

type TakeawayContextValue = {
  unlocked: boolean;
  cart: CartItem[];
  vipCode: string;
  unlockWithCode: (code: string) => Promise<boolean>;
  addToCart: (dishId: string) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = "takeaway-template-state";

const TakeawayContext = createContext<TakeawayContextValue | null>(null);

const validDishIds = new Set<string>([
  ...menu.map((d) => d.id),
  ...bundleMeals.map((b) => b.id),
]);

function sanitizeCart(input: unknown): CartItem[] {
  if (!Array.isArray(input)) return [];
  const cleaned: CartItem[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const { dishId, quantity } = raw as Record<string, unknown>;
    if (typeof dishId !== "string") continue;
    if (!validDishIds.has(dishId)) continue;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    const q = Math.min(Math.max(Math.floor(quantity), 1), MAX_QTY_PER_ITEM);
    cleaned.push({ dishId, quantity: q });
    if (cleaned.length >= MAX_CART_LINES) break;
  }
  return cleaned;
}

export const TakeawayProvider = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [vipCode, setVipCode] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { unlocked?: unknown; cart?: unknown; vipCode?: unknown };
      setUnlocked(parsed.unlocked === true);
      setCart(sanitizeCart(parsed.cart));
      if (typeof parsed.vipCode === "string") setVipCode(parsed.vipCode.slice(0, 64));
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlocked, cart, vipCode }));
    } catch { /* ignore */ }
  }, [unlocked, cart, vipCode]);

  const value = useMemo(() => {
    const addToCart = (dishId: string) => {
      if (!validDishIds.has(dishId)) return;
      setCart((current) => {
        const existing = current.find((item) => item.dishId === dishId);
        if (existing) {
          if (existing.quantity >= MAX_QTY_PER_ITEM) return current;
          return current.map((item) =>
            item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        if (current.length >= MAX_CART_LINES) return current;
        return [...current, { dishId, quantity: 1 }];
      });
    };

    const removeFromCart = (dishId: string) => {
      setCart((current) =>
        current
          .map((item) =>
            item.dishId === dishId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    };

    const clearCart = () => setCart([]);

    const unlockWithCode = async (code: string): Promise<boolean> => {
      if (typeof code !== "string") return false;
      const trimmed = code.trim().slice(0, 64);

      try {
        const response = await fetch("/api/verify-vip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: trimmed }),
        });

        const data = (await response.json()) as { valid?: boolean; error?: string };
        const success = response.ok && data.valid === true;

        if (!response.ok) {
          console.error("VIP verification failed:", response.status, data.error ?? "Unknown error");
          return false;
        }

        if (success) {
          setUnlocked(true);
          setVipCode(trimmed);
        }
        return success;
      } catch (error) {
        console.error("Failed to verify VIP code:", error);
        return false;
      }
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
      const dish = [...menu, ...bundleMeals].find((entry) => entry.id === item.dishId);
      return sum + (dish?.price ?? 0) * item.quantity;
    }, 0);

    return {
      unlocked,
      cart,
      vipCode,
      unlockWithCode,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
    };
  }, [cart, unlocked, vipCode]);

  return <TakeawayContext.Provider value={value}>{children}</TakeawayContext.Provider>;
};

export const useTakeaway = () => {
  const context = useContext(TakeawayContext);
  if (!context) {
    throw new Error("useTakeaway must be used within TakeawayProvider");
  }
  return context;
};