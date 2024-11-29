import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "../hooks/useCart.hook/provider/page";
import { ProfileProvider } from "../hooks/useProfile.hook/provider/page";
import { ProductProvider } from "../hooks/useProduct.hook/provider/page";
import { OrderProvider } from "../hooks/useOrder.hook/provider/page";
import Home from "../components/home/main/page";
import Password from "../components/sign/signin/password/page";
import Magiclink from "../components/sign/signin/magiclink/page";
import Resetpassword from "../components/sign/signreset/resetPassword/page";
import Callback from "../components/sign/signin/callback/page";
import Productlist from "../components/home/product/page";
import Category from "../components/home/product/category/page";
import Productdetail from "../components/home/productDetail/page";
import Account from "../components/home/account/page";
import Profile from "../components/home/account/profile/page";
import Address from "../components/home/account/address/page";
import Detail from "../components/home/account/detail/page";
import Cart from "../components/home/cart/page";
import Checkout from "../components/payment/checkout/page";
import Success from "../components/payment/success/page";
import Notfound from "../components/notfound/page";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Provider: React.FC = () => {
  return (
    <CartProvider>
      <ProfileProvider>
        <ProductProvider>
          <OrderProvider>
            <Routes>
              <Route path="/signin/password" element={<Password />} />
              <Route path="/signin/magiclink" element={<Magiclink />} />
              <Route path="/signin/resetpassword" element={<Resetpassword />} />
              <Route path="/signin/callback" element={<Callback />} />
              <Route path="/" element={<Home />} />
              <Route path="/productlist" element={<Productlist />}>
                <Route path="" element={<Category />} />
                <Route path="acoustic" element={<Category />} />
                <Route path="banjo" element={<Category />} />
                <Route path="classical" element={<Category />} />
                <Route path="semiacoustic" element={<Category />} />
                <Route path="ukulele" element={<Category />} />
              </Route>
              <Route path="/product/:productname" element={<Productdetail />} />
              <Route path="/account" element={<Account />}>
                <Route path="profile" element={<Profile />} />
                <Route path="address" element={<Address />} />
              </Route>
              <Route path="/order" element={<Account />}>
                <Route path=":orderId" element={<Detail />} />
              </Route>
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
              <Route path="*" element={<Notfound />} />
            </Routes>
          </OrderProvider>
        </ProductProvider>
      </ProfileProvider>
    </CartProvider>
  );
};

export default Provider;
