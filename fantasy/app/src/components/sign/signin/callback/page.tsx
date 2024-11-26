import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { threePartyLogin } from "../../../../api/auth/page";

import { getCartName, postLocalCartitem } from "../../../../api/cartitem/page";
import { useCart } from "../../../../hooks/useCart.hook/hook/page";
import { useProfile } from "../../../../hooks/useProfile.hook/hook/page";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { setCartItemCount, fetchCart } = useCart();
  const { fetchAddress } = useProfile();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [accessToken, setAccessToken] = useState("");
  const lastVisitedPath = localStorage.getItem("lastVisitedPath") || "";
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCartData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await threePartyLogin(code!);
        const { email, name, method, idToken, accessToken, refreshToken } =
          response.data;
        if (accessToken) {
          localStorage.setItem("email", email);
          localStorage.setItem("name", name);
          localStorage.setItem("method", method);
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setAccessToken(accessToken);
          console.log("accessToken", accessToken);
          // 检查并上传 localStorage 中的购物车数据
          const localCart = localStorage.getItem("cart");
          if (localCart) {
            const cartItems = JSON.parse(localCart);
            for (const item of cartItems) {
              await postLocalCartitem(
                item.product.name,
                item.cart.type,
                item.quantity
              );
            }
            localStorage.removeItem("cart");
          }
          // 获取数据库中的购物车数据并更新前端
          try {
            const cartResponse = await getCartName();
            const cart = cartResponse.data;
            setCartItemCount(cart.quantity);
            fetchCart();
            fetchAddress();
          } catch (error) {
            throw new Error("Failed to get cart items.");
          }
          localStorage.removeItem("lastVisitedPath");
          navigate(lastVisitedPath);
        } else {
          navigate("/signin");
          localStorage.setItem("error", response.data.message);
        }
      } catch (error) {
        throw new Error(
          "Third-party identity provider login failed. Please try again."
        );
      }
    };
    fetchCartData();
  }, [
    code,
    accessToken,
    navigate,
    setCartItemCount,
    fetchCart,
    fetchAddress,
    lastVisitedPath,
  ]);

  return <div>正在登录...</div>;
};

export default Callback;
