// 定义了一个用于包裹整个应用的组件，负责管理购物车的状态并将其提供给应用的所有部分
import React, { useState } from "react";
import { CartContext, Product } from "../cartContext/page";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState<string>("0");

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex > -1) {
        // 如果商品存在于购物车中
        const updatedItems = [...prevItems]; // 复制一份购物车商品
        updatedItems[existingItemIndex].quantity += 1; // 增加商品数量
        calculateTotal(updatedItems); // 重新计算总价
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        calculateTotal(updatedItems);
        return updatedItems;
      }
    });
    setCartItemCount((prevCount) => prevCount + 1);
  };

  const deleteFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex > -1) {
        // 如果商品存在于购物车中
        const updatedItems = [...prevItems]; // 复制一份购物车商品
        if (updatedItems[existingItemIndex].quantity > 1) {
          // 如果商品数量大于 1
          updatedItems[existingItemIndex].quantity -= 1; // 减少商品数量
        } else {
          updatedItems.splice(existingItemIndex, 1); // 删除商品
        }
        calculateTotal(updatedItems); // 重新计算总价
        return updatedItems;
      }
      return prevItems;
    });
    setCartItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // 更新购物车商品数量
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const indexToRemove = prevItems.findIndex((item) => item.id === id);
      if (indexToRemove > -1) {
        // 如果商品存在于购物车中
        const updatedItems = [...prevItems]; // 复制一份购物车商品
        const quantityToRemove = updatedItems[indexToRemove].quantity; // 获取要删除的商品数量

        updatedItems.splice(indexToRemove, 1); // 删除商品
        calculateTotal(updatedItems); // 重新计算总价
        setCartItemCount(
          (prevCount) => (prevCount ? prevCount - quantityToRemove : 0) // 更新购物车商品数量
        );
        return updatedItems;
      }
      return prevItems;
    });
  };

  const calculateTotal = (items: Product[]) => {
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    setCartTotal(Number(total.toFixed(2)).toFixed(2));
  };

  const value = {
    cartItems,
    cartItemCount,
    addToCart,
    deleteFromCart,
    removeFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
