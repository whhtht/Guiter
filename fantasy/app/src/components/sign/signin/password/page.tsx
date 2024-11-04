import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, resetCode, magicLink } from "../../../../api/auth/page";
import { getCartName, postLocalCartitem } from "../../../../api/cartitem/page";
import { useCart } from "../../../../hooks/useCart.hook/page";

import { Box, Typography, Input, Button, IconButton } from "@mui/material";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { setCartItemCount, fetchCart } = useCart();
  const email = localStorage.getItem("email") || "";
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  // 点击“Continue”按钮时的处理函数
  const handleContinue = async () => {
    // 检查密码是否为空
    if (!password) {
      setError("Please enter your password.");
    } else {
      // 调用登录的 API
      try {
        const response = await signIn(email, password);
        const { idToken, accessToken, refreshToken } = response.data;
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("accessToken:", accessToken);
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
            // 设置购物车商品数量
            setCartItemCount(cart.quantity);
            // 调用 fetchCart 来更新购物车
            fetchCart();
          } catch (error) {
            setError("Failed to get cart items.");
          }
        }
        navigate("/");
      } catch (error) {
        // 显示错误信息
        const errorResponse = error as { message: string };
        const errorMessage = errorResponse.message;
        setError(errorMessage);
      }
    }
  };

  // 点击“Forgot password”时的处理函数
  const handleResetCode = async () => {
    try {
      const response = await resetCode(email);
      if (response.status === 200) {
        navigate("/signin/resetcode");
      }
    } catch (error) {
      setError("Failed to send reset password code.");
    }
  };

  const handleMagicLink = async () => {
    try {
      console.log(`Magic link has been sent to ${email}`);
      const response = await magicLink(email);
      if (response.status === 200) {
        console.log(`testttttttttttttttttt`);
      }
    } catch (error) {
      setError("Failed to send magic link.");
    }
  };

  // 切换密码可见性
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 按下回车键时，调用按钮的点击处理函数
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleContinue(); // 调用按钮的点击处理函数
    }
  };

  return (
    <Box>
      {/* 顶部显示 */}
      <Box
        sx={{
          borderBottom: "1px solid #DDDCDE",
          padding: "0px 72px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "72px",
          }}
        >
          <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Logo Name
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 登录表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "82px 0px 222px 0px",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          Welcome back!
        </Typography>

        {/* 修改邮箱地址 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "8px",
            margin: "0px 0px 7px 0px",
          }}
        >
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
            onClick={() => localStorage.removeItem("email")}
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

        {/* 密码输入框 */}
        <Box
          onKeyDown={handleKeyDown}
          sx={{
            width: "395px",
            height: "98px",
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
            Your password
          </Typography>
          <Input
            disableUnderline
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
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

          <Typography
            onClick={handleResetCode}
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Typography>
        </Box>

        {/* 登录按钮 */}
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
            Continue
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
          onClick={handleMagicLink}
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
          Sign in with Magic Link
        </Typography>
      </Box>

      {/* 页脚 */}
      <Box
        sx={{
          width: "100%",
          height: "72px",
          backgroundColor: "#02000C",
          margin: "106px 0px 0px 0px",
        }}
      />
    </Box>
  );
};

export default Password;
