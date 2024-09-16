import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth/page";
import { getCartId } from "../../api/cart/page";
import { useCart } from "../useCart.hook/page";

export const useSignIn = () => {
  const { setCartItemCount, fetchCart } = useCart();

  // 邮箱函数
  const [email, setEmail] = useState<string>("");
  const [showEmail, setShowEmail] = React.useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");
  const handleMouseDownEmail = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  const handleClickShowEmail = () => setShowEmail((showEmail) => !showEmail);

  // 邮箱错误函数
  const handeleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputemail = event.target.value;
    setEmail(inputemail);
    if (!inputemail) {
      setEmailError(false);
      setEmailBackgroundColor("");
    }
  };
  const handleFocusEmail = () => {
    if (emailError) {
      setEmailBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurEmail = () => {
    if (emailError) {
      setEmailBackgroundColor("#FFECE8");
    }
  };

  // 密码函数
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordBackgroundColor, setPasswordBackgroundColor] =
    useState<string>("");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  // 密码错误函数
  const handelePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputpassword = event.target.value;
    setPassword(inputpassword);
    if (!inputpassword) {
      setPasswordError(false);
      setPasswordBackgroundColor("");
    }
  };
  const handleFocusPassword = () => {
    if (passwordError) {
      setPasswordBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurPassword = () => {
    if (passwordError) {
      setPasswordBackgroundColor("#FFECE8");
    }
  };
  const handleClearPassword = () => {
    setPassword("");
  };

  // 登录函数
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();
  // 登录验证
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // 验证邮箱和密码
    if (!email) {
      setError("Please enter your email address.");
      setEmailError(true);
      setPasswordError(false);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setPassword("");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      setEmailError(false);
      setPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setPassword("");
      return;
    } else {
      setError("");
      setEmailError(false);
      setPasswordError(false);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("");
    }
    // 登录
    try {
      const response = await signIn(email, password);
      const { idToken, accessToken, refreshToken } = response.data;
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(accessToken);

      if (localStorage.getItem("accessToken")) {
        try {
          const cartResponse = await getCartId(); // 调用获取购物车信息的 API
          const cart = cartResponse.data;
          setCartItemCount(cart.quantity); // 设置购物车商品数量
          fetchCart(); // 调用 fetchCart 来更新购物车
        } catch (error) {
          console.error("登录获取购物车信息失败", error);
        }
      }

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      setMessage(response.data.message);
      setError("");
      navigate("/");
    } catch (error) {
      setError("Invalid email or password.");
      setMessage("");
      setEmailError(true);
      setPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
    }
  };

  // 记住我函数
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      const savedEmail = localStorage.getItem("email") || "";
      const savedPassword = localStorage.getItem("password") || "";
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, []);
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.setItem("rememberMe", "false");
    }
  };

  return {
    email,
    showEmail,
    setShowEmail,
    emailError,
    emailBackgroundColor,
    handleMouseDownEmail,
    handleClickShowEmail,
    handeleEmailChange,
    handleFocusEmail,
    handleBlurEmail,
    password,
    showPassword,
    passwordError,
    passwordBackgroundColor,
    handelePasswordChange,
    handleFocusPassword,
    handleBlurPassword,
    handleClearPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSignIn,
    error,
    message,
    rememberMe,
    handleRememberMeChange,
  };
};
