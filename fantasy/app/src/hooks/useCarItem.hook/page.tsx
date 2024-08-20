import { useState } from 'react';

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addItemToCart = (item: number) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.length;

  return {
    cartItems,
    addItemToCart,
    clearCart,
    cartItemCount,
  };
};
