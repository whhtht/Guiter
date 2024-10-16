import React, { useState, useEffect, useCallback } from "react";
import {
  getCartName,
  putCartitemStatus,
  postCartitem,
  putCartitem,
  deleteCartitem,
} from "../../../api/cartitem/page";
import { CartContext, Product } from "../context/page";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [saveItems, setSaveItems] = useState<Product[]>([]);
  const [localCartItems, setLocalCartItems] = useState<Product[]>([]);
  const [localSaveItems, setLocalSaveItems] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [saveItemCount, setSaveItemCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const accessToken = localStorage.getItem("accessToken");

  // 更新本地购物车数据
  const updateCartItems = () => {
    // 从 localStorage 获取购物车数据
    const localCartString = localStorage.getItem("cart");
    const localCart =
      typeof localCartString === "string" ? JSON.parse(localCartString) : [];
    // 分别设置本地购物车和保存的商品
    setLocalCartItems(
      localCart.filter((item: Product) => item.cart.type === "cart")
    );
    setLocalSaveItems(
      localCart.filter((item: Product) => item.cart.type === "saveforlater")
    );
  };

  // 初始化购物车数据并监听 localStorage 变化
  useEffect(() => {
    // 初始化购物车数据
    updateCartItems();
    // localStorage变化时，更新购物车数据
    const handleStorageChange = () => {
      updateCartItems();
    };
    // 添加事件监听器
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("manualUpdate", handleStorageChange);
    // 清除事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("manualUpdate", handleStorageChange);
    };
  }, []);

  // 手动触发更新 localStorage
  const updateLocalStorageAndState = (newData: Product[]) => {
    // 更新 localStorage
    localStorage.setItem("cart", JSON.stringify(newData));
    // 手动触发自定义事件
    window.dispatchEvent(new Event("manualUpdate"));
    // 主动更新 React 状态
    updateCartItems();
  };

  // 监听登出并清空购物车
  const handleLogout = () => {
    // 手动触发购物车清空事件
    window.dispatchEvent(new Event("manualUpdate"));
    // 更新页面购物车显示为空
    updateCartItems();
  };

  // 计算本地购物车商品数量
  const localCartCount = localCartItems.reduce(
    (count: number, item: { quantity: number }) => {
      return count + item.quantity;
    },
    0
  );
  const localSaveCount = localSaveItems.reduce(
    (count: number, item: { quantity: number }) => {
      return count + item.quantity;
    },
    0
  );

  // 计算本地购物车总价
  const localTotalPrice = localCartItems.reduce(
    (total: number, item: { quantity: number; product: { price: string } }) => {
      // 将价格转换为数字并乘以商品数量
      const localItemTotal =
        parseFloat(item.product.price || "0") * (item.quantity || 0);
      return total + localItemTotal;
    },
    0
  );
  const localTotal = parseFloat(localTotalPrice.toFixed(2));

  // 计算购物车内商品的总价
  const calculateTotal = (items: Product[]) => {
    // 计算购物车商品数量
    const totalCount = items
      .filter((item) => item.cart.type === "cart")
      .reduce((acc, item) => acc + (item.quantity || 0), 0);
    setCartItemCount(totalCount);
    // 计算购物车总价
    const total = items
      .filter((item) => item.cart.type === "cart")
      .reduce(
        (acc, item) =>
          acc + parseFloat(item.product.price || "0") * (item.quantity || 0),
        0
      );
    setCartTotal(parseFloat(total.toFixed(2)));
  };

  // 当商品数量发生变化的时候计算保存商品的数量
  useEffect(() => {
    const count = saveItems
      .filter((item) => item.cart.type === "saveforlater")
      .reduce((acc, item) => acc + (item.quantity || 0), 0);
    setSaveItemCount(count);
  }, [saveItems]);

  // 获取购物车数据
  const fetchCart = useCallback(async () => {
    try {
      if (accessToken) {
        // 如果用户已登录，从后端获取购物车信息
        const response = await getCartName();
        const cart = response.data;
        // 设置购物车商品和总价
        setCartItems(cart.filter((item: Product) => item.cart.type === "cart"));
        setSaveItems(
          cart.filter((item: Product) => item.cart.type === "saveforlater")
        );
        calculateTotal(cart);
      }
    } catch (error) {
      console.error("获取购物车信息失败:", error);
    }
  }, [accessToken]);
  // console.log("cartItems", cartItems);
  // console.log("saveItems", saveItems);

  // 当 accessToken 变化时，重新获取购物车数据
  useEffect(() => {
    if (accessToken) {
      fetchCart();
    }
  }, [accessToken, fetchCart]);

  // 更新物品所在状态
  const cartStatus = async (productName: string, type: string) => {
    if (!accessToken) {
      // 从 localStorage 获取购物车数据
      let cartData: Product[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      cartData = cartData.map((item) => {
        if (item.product.name === productName) {
          // 切换商品状态
          item.cart.type = item.cart.type === "cart" ? "saveforlater" : "cart";
        }
        return item;
      });
      // 更新 localStorage 和 React 状态
      updateLocalStorageAndState(cartData);
      return;
    }
    try {
      // 调用 getCartStatus，并传递商品名称
      const response = await putCartitemStatus(productName, type);
      const cartData = response;
      // 过滤购物车商品
      const cartItem = cartData.filter(
        (item: Product) => item.cart.type === "cart"
      );
      const saveforlater = cartData.filter(
        (item: Product) => item.cart.type === "saveforlater"
      );
      setCartItems(cartItem);
      setSaveItems(saveforlater);
      calculateTotal(cartItem);
    } catch (error) {
      console.error("获得购物车状态失败", error);
    }
  };

  // 添加商品到购物车
  const addToCart = async (product: Product) => {
    // 如果用户未登录，直接添加到购物车
    if (!accessToken) {
      // 更新购物车商品数量
      setCartItems((prevItems) => {
        // 查找购物车中是否有相同的商品
        const existingItemIndex = prevItems.findIndex(
          (item) => item.product.name === product.product.name
        );
        // 声明更新后的购物车数据
        let updatedItems;
        // 如果商品存在于购物车中
        if (existingItemIndex > -1) {
          // 增加商品数量
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += 1;
        } else {
          // 如果商品不存在于购物车中，添加商品
          updatedItems = [...prevItems, { ...product, quantity: 1 }];
        }
        // 计算总价
        calculateTotal(updatedItems);
        // 从 localStorage 获取当前的购物车数据，如果没有则初始化为空数组
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        // 查找 localStorage 中是否存在相同的商品
        const cartItemIndex = cartData.findIndex(
          (item: Product) => item.product.name === product.product.name
        );
        // 如果存在，增加数量
        if (cartItemIndex > -1) {
          cartData[cartItemIndex].quantity += 1;
        } else {
          // 如果不存在，新增物品（去掉 {type: "cart"}）
          cartData.push({ ...product, quantity: 1 });
        }
        // 将更新后的购物车数据存储到 localStorage
        updateLocalStorageAndState(cartData);
        return updatedItems;
      });
      return;
    }
    // 如果用户已登录，调用 postCartitem 添加商品到后端购物车
    try {
      await postCartitem(product.product.name);
    } catch (error) {
      console.error("添加商品到后端购物车失败:", error);
    }
    // 更新购物车商品数量
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

  // 从购物车中减少商品
  const putFromCart = async (product: Product) => {
    // 如果用户未登录，直接从购物车中减少商品
    if (!accessToken) {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.product.name === product.product.name
        );
        let updatedItems: Product[] = [...prevItems];
        // 如果商品存在于购物车中
        if (existingItemIndex > -1) {
          updatedItems = [...prevItems];
          // 如果商品数量大于 1
          if (updatedItems[existingItemIndex].quantity > 1) {
            // 减少商品数量
            updatedItems[existingItemIndex].quantity -= 1;
          } else {
            // 删除商品
            updatedItems.splice(existingItemIndex, 1);
          }
        }
        // 计算总价
        calculateTotal(updatedItems);
        // 从 localStorage 获取当前的购物车数据，如果没有则初始化为空数组
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        // 查找 localStorage 中是否存在相同的商品
        const cartItemIndex = cartData.findIndex(
          (item: Product) => item.product.name === product.product.name
        );
        // 如果数量大于 1，减少数量
        if (cartItemIndex > -1) {
          // 减少商品数量
          if (cartData[cartItemIndex].quantity > 1) {
            cartData[cartItemIndex].quantity -= 1;
          } else {
            // 如果数量为 1，移除商品
            cartData.splice(cartItemIndex, 1);
          }
        }
        // 将更新后的购物车数据存储到 localStorage
        updateLocalStorageAndState(cartData);
        // 如果购物车为空，移除 localStorage 中的 cart
        if (cartData.length === 0) {
          localStorage.removeItem("cart");
        }
        return updatedItems;
      });
      return;
    }
    // 如果用户已登录，调用 putCart 修改后端购物车商品数量
    try {
      await putCartitem(product.product.name);
    } catch (error) {
      console.error("添加商品到后端购物车失败:", error);
    }
    // 更新购物车商品数量
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
      // 如果用户未登录，直接从购物车中移除商品
      setLocalCartItems((prevItems) => {
        const indexToRemove = prevItems.findIndex(
          (item) => item.product.name === product.product.name
        );
        let updatedItems;
        if (indexToRemove > -1) {
          // 如果商品存在于购物车中
          updatedItems = [...prevItems];
          // 删除商品
          updatedItems.splice(indexToRemove, 1);
        } else {
          updatedItems = prevItems;
        }
        // 计算总价
        calculateTotal(updatedItems);
        // 从 localStorage 获取当前的购物车数据，如果没有则初始化为空数组
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        // 查找 localStorage 中是否存在相同的商品
        const cartItemIndex = cartData.findIndex(
          (item: Product) => item.product.name === product.product.name
        );
        // 如果存在，删除商品
        if (cartItemIndex > -1) {
          cartData.splice(cartItemIndex, 1);
          // 检查是否所有类型都为空
          const hasCartItems = cartData.some(
            (item: Product) => item.cart.type === "cart"
          );
          const hasSaveForLaterItems = cartData.some(
            (item: Product) => item.cart.type === "saveforlater"
          );

          // 只有当两种类型都没有物品时才删除 cart
          if (!hasCartItems && !hasSaveForLaterItems) {
            localStorage.removeItem("cart");
          } else {
            updateLocalStorageAndState(cartData);
          }
        }
        return updatedItems;
      });
      return;
    }
    // 如果用户已登录，调用 deleteCartitem 删除后端购物车商品
    try {
      await deleteCartitem(product.product.name);
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

  // 从保存到稍后购买中移除商品
  const removeFromSave = async (product: Product) => {
    if (!accessToken) {
      // 如果用户未登录，直接从购物车中移除商品
      setSaveItems((prevItems) => {
        const indexToRemove = prevItems.findIndex(
          (item) => item.product.name === product.product.name
        );
        let updatedItems;
        if (indexToRemove > -1) {
          // 如果商品存在于购物车中
          updatedItems = [...prevItems];
          // 删除商品
          updatedItems.splice(indexToRemove, 1);
        } else {
          updatedItems = prevItems;
        }
        // 计算总价
        calculateTotal(updatedItems);
        // 从 localStorage 获取当前的购物车数据，如果没有则初始化为空数组
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        // 查找 localStorage 中是否存在相同的商品
        const cartItemIndex = cartData.findIndex(
          (item: Product) => item.product.name === product.product.name
        );
        // 如果存在，删除商品
        if (cartItemIndex > -1) {
          cartData.splice(cartItemIndex, 1);
          // 检查是否所有类型都为空
          const hasCartItems = cartData.some(
            (item: Product) => item.cart.type === "cart"
          );
          const hasSaveForLaterItems = cartData.some(
            (item: Product) => item.cart.type === "saveforlater"
          );
          // 只有当两种类型都没有物品时才删除 cart
          if (!hasCartItems && !hasSaveForLaterItems) {
            localStorage.removeItem("cart");
          } else {
            updateLocalStorageAndState(cartData);
          }
        }
        return updatedItems;
      });
      return;
    }
    // 如果用户已登录，调用 deleteCartitem 删除后端购物车商品
    try {
      await deleteCartitem(product.product.name);
    } catch (error) {
      console.error("从后端购物车中删除商品失败:", error);
    }
    setSaveItems((prevItems) => {
      const indexToRemove = prevItems.findIndex(
        (item) => item.product.name === product.product.name
      );
      if (indexToRemove > -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(indexToRemove, 1);
        return updatedItems;
      }
      return prevItems;
    });
  };

  const value = {
    localCartItems,
    localSaveItems,
    localCartCount,
    localSaveCount,
    localTotal,
    accessToken,
    fetchCart,
    cartItems,
    cartItemCount,
    addToCart,
    putFromCart,
    removeFromCart,
    removeFromSave,
    cartTotal,
    setCartItemCount,
    setCartItems,
    setCartTotal,
    cartStatus,
    saveItems,
    setSaveItems,
    saveItemCount,
    handleLogout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
