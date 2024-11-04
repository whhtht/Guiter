import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

import { getCartName, postLocalCartitem } from "../../../api/cartitem/page";
import { useCart } from "../../../hooks/useCart.hook/page";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { setCartItemCount, fetchCart } = useCart();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  console.log("code:", code);

  const [accessToken, setAccessToken] = useState("");
  const hasFetched = useRef(false); // 用于标记是否已经请求过

  useEffect(() => {
    const fetchCartData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true; // 标记为已请求过数据

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/ThreePartyLogin",
          { code }
        );
        const { idToken, accessToken, refreshToken } = response.data;
        console.log(
          "Third-party identity provider login response:",
          response.data
        );
        if (accessToken) {
          // 保存到 localStorage
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setAccessToken(accessToken);
          console.log("Third-party identity provider login successful.");
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
            localStorage.removeItem("cart"); // 清空 localStorage 中的购物车
          }

          // 获取数据库中的购物车数据并更新前端
          try {
            const cartResponse = await getCartName();
            const cart = cartResponse.data;
            setCartItemCount(cart.quantity);
            fetchCart(); // 更新购物车状态
          } catch (error) {
            console.error("获取购物车信息失败", error);
            throw new Error("Failed to get cart items.");
          }
          navigate("/");
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
  }, [code, accessToken, navigate, setCartItemCount, fetchCart]);

  return <div>正在登录...</div>;
};

export default Callback;
