// 定义了购物车上下文的数据结构和类型
import { createContext } from "react";

// 定义 Product 类型
export interface Product {
  quantity: number;
  id: string;
  cart: { type: string };
  product: {
    name: string;
    price: string;
    specificationDetail: {
      Condition: string;
    };
  };
}

// 定义 CartContextType 类型
export interface CartContextType {
  accessToken: string | null;
  localCartItems: Product[];
  localSaveItems: Product[];
  localCartCount: number | null;
  localSaveCount: number | null;
  localTotal: number | null;
  fetchCart: () => void;
  cartItems: Product[];
  cartItemCount: number;
  addToCart: (product: Product) => void;
  putFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeFromSave: (product: Product) => void;
  cartTotal: number;
  setCartItems: (product: Product[]) => void;
  setCartItemCount: (count: number) => void;
  setCartTotal: (total: number) => void;
  cartStatus: (productName: string) => void;
  saveItems: Product[];
  setSaveItems: (product: Product[]) => void;
  saveItemCount: number;
}

// 创建 CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
