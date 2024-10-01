import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "../hooks/useCart.hook/provider/page";
import Home from "../components/home/main/page";
import Signin from "../components/sign/signIn/page";
import Productlist from "../components/home/productList/page";
import Productdetail from "../components/home/productDetail/page";
import Cart from "../components/home/cart/page";
import Checkout from "../components/checkout/page";

const Provider: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/productlist/:category" element={<Productlist />} />
        <Route path="/product/:productName" element={<Productdetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartProvider>
  );
};

export default Provider;
