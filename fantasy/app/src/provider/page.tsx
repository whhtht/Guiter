import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "../hooks/useCart.hook/provider/page";
import Home from "../components/home/main/page";
import Password from "../components/sign/signin/password/page";
import Magiclink from "../components/sign/signin/magiclink/page";
import Resetpassword from "../components/sign/signreset/resetPassword/page";
import Callback from "../components/sign/signin/callback/page";
import Productlist from "../components/home/productList/page";
import Productdetail from "../components/home/productDetail/page";
import Account from "../components/home/account/page";
import Profile from "../components/home/account/profile/page";
import Address from "../components/home/account/address/page";
import Cart from "../components/home/cart/page";
import Checkout from "../components/payment/checkout/page";
import Success from "../components/payment/success/page";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Provider: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/signin/password" element={<Password />} />
        <Route path="/signin/magiclink" element={<Magiclink />} />
        <Route path="/signin/resetpassword" element={<Resetpassword />} />
        <Route path="/signin/callback" element={<Callback />} />
        <Route path="/" element={<Home />} />
        <Route path="/productlist/:category" element={<Productlist />} />
        <Route path="/product/:productname" element={<Productdetail />} />
        <Route path="/account" element={<Account />}>
          <Route path="profile" element={<Profile />} />
          <Route path="address" element={<Address />} />
        </Route>
        <Route path="/order" element={<Account />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default Provider;
