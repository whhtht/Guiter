import React, { useState, useEffect, useCallback } from "react";
import {
  postCart,
  putCart,
  deleteCart,
  getCartId,
} from "../../../api/cart/page";
import { CartContext, Product } from "../context/page";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState<string>("0");
  const accessToken = localStorage.getItem("accessToken");

  // 获取购物车数据
  const fetchCart = useCallback(async () => {
    try {
      if (accessToken) {
        // 如果用户已登录，从后端获取购物车信息
        const response = await getCartId();
        const cart = response.data;
        // 设置购物车商品和总价
        setCartItems(cart);
        calculateTotal(cart);
      }
    } catch (error) {
      console.error("获取购物车信息失败:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchCart();
    }
  }, [accessToken, fetchCart]);

  // 计算购物车总价
  const calculateTotal = (cartItems: Product[]) => {
    const totalCount = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    setCartItemCount(totalCount);
    const total = cartItems.reduce(
      (acc, item) =>
        acc + parseFloat(item.product.price || "0") * (item.quantity || 0),
      0
    );
    setCartTotal(Number(total.toFixed(2)).toFixed(2));
  };

  // 添加商品到购物车
  const addToCart = async (product: Product) => {
    // 如果用户未登录，直接添加到购物车
    if (!accessToken) {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.product.name === product.product.name
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
      return;
    }
    // 如果用户已登录，调用 postCart 添加商品到后端购物车
    try {
      await postCart(product.product.name); // 调用 postCart，并传递商品 ID
    } catch (error) {
      console.error("添加商品到后端购物车失败:", error);
    }
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.name === product.product.name
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        calculateTotal(updatedItems);
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        calculateTotal(updatedItems);
        return updatedItems;
      }
    });
  };

  // 从购物车中删除商品
  const deleteFromCart = async (product: Product) => {
    // 如果用户未登录，直接添加到购物车
    if (!accessToken) {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.product.name === product.product.name
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
          calculateTotal(updatedItems);
          return updatedItems;
        }
        return prevItems;
      });
    }
    // 如果用户已登录，调用 putCart 修改后端购物车商品数量
    try {
      await putCart(product.product.name); // 调用 postCart，并传递商品 ID
    } catch (error) {
      console.error("添加商品到后端购物车失败:", error);
    }
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.name === product.product.name
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex].quantity -= 1;
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        calculateTotal(updatedItems);
        return updatedItems;
      }
      return prevItems;
    });
  };

  // 从购物车中移除商品
  const removeFromCart = async (product: Product) => {
    if (!accessToken) {
      setCartItems((prevItems) => {
        const indexToRemove = prevItems.findIndex(
          (item) => item.product.name === product.product.name
        );
        if (indexToRemove > -1) {
          // 如果商品存在于购物车中
          const updatedItems = [...prevItems]; // 复制一份购物车商品
          const quantityToRemove = updatedItems[indexToRemove].quantity; // 获取要删除的商品数量
          setCartItemCount((prevCount) =>
            Math.max(prevCount - quantityToRemove, 0)
          ); // 更新购物车商品数量
          updatedItems.splice(indexToRemove, 1); // 删除商品
          calculateTotal(updatedItems);
          return updatedItems;
        }
        return prevItems;
      });
    }
    // 如果用户已登录，调用 deleteCart 删除后端购物车商品
    try {
      await deleteCart(product.product.name); // 调用 deleteCart，并传递商品 ID
    } catch (error) {
      console.error("从后端购物车中删除商品失败:", error);
    }
    setCartItems((prevItems) => {
      const indexToRemove = prevItems.findIndex(
        (item) => item.product.name === product.product.name
      );
      if (indexToRemove > -1) {
        const updatedItems = [...prevItems];
        const quantityToRemove = updatedItems[indexToRemove].quantity;
        setCartItemCount((prevCount) =>
          Math.max(prevCount - quantityToRemove, 0)
        );
        updatedItems.splice(indexToRemove, 1);
        calculateTotal(updatedItems);
        return updatedItems;
      }
      return prevItems;
    });
  };

  const value = {
    fetchCart,
    cartItems,
    cartItemCount,
    addToCart,
    deleteFromCart,
    removeFromCart,
    cartTotal,
    setCartItemCount,
    setCartItems,
    setCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
