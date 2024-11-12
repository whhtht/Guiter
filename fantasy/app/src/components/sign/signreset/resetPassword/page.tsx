import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, signIn } from "../../../../api/auth/page";
import { getCartName, postLocalCartitem } from "../../../../api/cartitem/page";
import { useCart } from "../../../../hooks/useCart.hook/page";
import { Header } from "../../signlayout/header/page";
import { Footer } from "../../signlayout/footer/page";

import { Box, Input, Typography, IconButton, Button } from "@mui/material";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { setCartItemCount, fetchCart } = useCart();
  const email = localStorage.getItem("email") || "";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const lastVisitedPath = localStorage.getItem("lastVisitedPath") || "";
  console.log("lastVisitedPath", lastVisitedPath);

  // 切换密码可见性
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 处理密码输入
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 输入过程中清除密码的错误提示
    if (error) {
      setError("");
    }
  };

  // 密码规则
  const passwordRules = [
    {
      label: "At least 8 characters",
      validate: (password: string) => password.length >= 8,
    },
    {
      label: "At least 1 upper letter",
      validate: (password: string) => /[A-Z]/.test(password),
    },
    {
      label: "At least 1 number or special character",
      validate: (password: string) => /[0-9!@#$%^&*]/.test(password),
    },
  ];

  // 保存新密码
  const handleContinue = async () => {
    setError("");
    try {
      const response = await resetPassword(email, password);
      if (response.status === 200) {
        // 重置密码成功后 sign in
        const signInResponse = await signIn(email, password);
        const { idToken, accessToken, refreshToken } = signInResponse.data;
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("accessToken:", accessToken);
        // 检查 localStorage 中是否有购物车
        if (localStorage.getItem("accessToken")) {
          const localCart = localStorage.getItem("cart") || "";
          // 如果有本地购物车，将购物车信息存储到数据库
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
          // 如果没有本地购物车,获取购物车信息
          try {
            const cartResponse = await getCartName();
            const cart = cartResponse.data;
            setCartItemCount(cart.quantity);
            fetchCart();
          } catch (error) {
            const errorResponse = error as { message: string };
            const errorMessage = errorResponse.message;
            setError(errorMessage);
          }
        }
        localStorage.removeItem("lastVisitedPath");
        navigate(lastVisitedPath);
      }
    } catch (error) {
      const errorResponse = error as { message: string };
      const errorMessage = errorResponse.message;
      setError(errorMessage);
    }
  };

  return (
    <Box>
      <Header />

      {/* 新密码表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: error ? "82px 0px 159px 0px" : "82px 0px 181px 0px",
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
          Change your password or sign in
        </Typography>

        {/* 修改邮箱地址 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
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

        {/* 输入新密码 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "395px",
            margin: "8px 0px 0px 0px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#76757C",
            }}
          >
            Your new password
          </Typography>
          <Input
            disableUnderline
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            endAdornment={
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{ color: "#02000C" }}
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon
                    sx={{ width: "22px", height: "22px" }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    sx={{ width: "22px", height: "22px" }}
                  />
                )}
              </IconButton>
            }
            sx={{
              width: "395px",
              height: "48px",
              border: "1px solid #02000C",
              margin: "2px 0px 0px 0px",
              padding: "0px 16px",
            }}
          />
          {error && (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                color: "#EB001B",
              }}
            >
              {error}
            </Typography>
          )}
          {passwordRules.map((rule, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              {rule.validate(password) ? (
                <CheckCircleIcon
                  sx={{
                    width: "14px",
                    height: "14px",
                    color: "#008A02",
                    marginRight: "6px",
                  }}
                />
              ) : null}
              {rule.label}
            </Typography>
          ))}
        </Box>

        {/* 保存并登录按钮 */}
        <Button
          onClick={handleContinue}
          sx={{
            width: "395px",
            height: "48px",
            border: "1px solid #02000C",
            borderRadius: "4px",
            backgroundColor: "#02000C",
            textTransform: "none",
            "&:hover": { backgroundColor: "#02000C" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            Save and Sign In
          </Typography>
        </Button>

        {/* 分割线 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "395px",
            height: "24px",
            margin: "16px 0px",
          }}
        >
          <Box sx={{ width: "168px", borderTop: "1px solid #DDDCDE" }} />
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
            Or
          </Typography>
          <Box sx={{ width: "168px", borderTop: "1px solid #DDDCDE" }} />
        </Box>

        {/* 使用其他方式登录 */}
        <Typography
          component={Link}
          to="/signin/password"
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "center",
            color: "#02000C",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Sign in without changing password
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
};

export default ResetPassword;
