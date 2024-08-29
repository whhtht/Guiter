// 定义了购物车上下文的数据结构和类型
import { createContext } from "react";

// 定义 Product 类型
export interface Product {
  id: number;
  name: string;
  condition: string;
  price: string;
  image: string;
  quantity: number;
}


// 定义 CartContextType 类型
export interface CartContextType {
  cartItems: Product[];
  cartItemCount: number;
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: string;
}

// 创建 CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
