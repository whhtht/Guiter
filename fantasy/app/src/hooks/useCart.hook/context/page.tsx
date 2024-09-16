// 定义了购物车上下文的数据结构和类型
import { createContext } from "react";

// 定义 Product 类型
export interface Product {
  quantity: number;
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
  fetchCart: () => void;
  cartItems: Product[];
  cartItemCount: number;
  addToCart: (product: Product) => void;
  deleteFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  cartTotal: string;
  setCartItems: (product: Product[]) => void;
  setCartItemCount: (count: number) => void;
  setCartTotal: (total: string) => void;
}

// 创建 CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
