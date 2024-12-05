import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { magicLink } from "../../../../api/auth/page";
import { getCartName, postLocalCartitem } from "../../../../api/cartitem/page";
import { useCart } from "../../../../hooks/useCart.hook/hook/page";
import { useProfile } from "../../../../hooks/useProfile.hook/hook/page";
import { Header } from "../../signlayout/header/page";
import { Footer } from "../../signlayout/footer/page";

import { Box, Typography } from "@mui/material";

const MagicLink: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const { setCartItemCount, fetchCart } = useCart();
  const { fetchAddress } = useProfile();
  const [isExecuted, setIsExecuted] = useState(false);

  // 从查询参数中获取 tokens
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "";
  const idToken = queryParams.get("idToken") || "";
  const accessToken = queryParams.get("accessToken") || "";
  const refreshToken = queryParams.get("refreshToken") || "";
  const lastVisitedPath = localStorage.getItem("lastVisitedPath") || "";

  if (idToken && accessToken && refreshToken !== "") {
    localStorage.setItem("name", name);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
  console.log("accessToken:", accessToken);

  // 获取购物车信息
  useEffect(() => {
    if (!isExecuted) {
      const cartInformation = async () => {
        // 检查 localStorage 中是否有购物车
        if (localStorage.getItem("accessToken")) {
          const localCart = localStorage.getItem("cart") || "";
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
          try {
            // 调用获取购物车信息的 API
            const cartResponse = await getCartName();
            const cart = cartResponse.data;
            setCartItemCount(cart.quantity);
            fetchCart();
            fetchAddress();
          } catch (error) {
            throw new Error(error as string);
          }
          localStorage.removeItem("lastVisitedPath");
          navigate(lastVisitedPath);
        }
      };
      cartInformation();
      setIsExecuted(true);
    }
  }, [
    fetchCart,
    fetchAddress,
    isExecuted,
    navigate,
    setCartItemCount,
    lastVisitedPath,
  ]);

  const handleMagicLink = async () => {
    try {
      await magicLink(email);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <Box>
      <Header />

      {/* Magic Link 表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: " 82px 0px 447px 0px",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "center",
            color: "#02000C",
          }}
        >
          Click your magic link, <br /> and you'll be instantly signed in.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "10px 0px",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            We've sent the magic link to
          </Typography>

          {/* 返回重新输入邮箱地址 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                textAlign: "center",
                color: "#02000C",
              }}
            >
              {email}
            </Typography>
            <Typography
              component={Link}
              to="/signin"
              onClick={() => localStorage.clear()}
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "center",
                color: "#02000C",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Use a different email
            </Typography>
          </Box>
        </Box>

        {/* 重新获得 Magic Link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            Didn’t receive it?
          </Typography>
          <Typography
            onClick={handleMagicLink}
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              color: "#02000C",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Resend Magic Link
          </Typography>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default MagicLink;
