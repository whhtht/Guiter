import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth/page";

export const useSignIn = () => {
  // Email Function
  const [email, setEmail] = useState<string>("");
  const [showEmail, setShowEmail] = React.useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");
  const handleMouseDownEmail = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  const handleClickShowEmail = () => setShowEmail((showEmail) => !showEmail);

  // Email Error Function
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

  // Password Function
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

  // Password Error Function
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

  // Message Function
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
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
    try {
      const response = await signIn(email, password);
      const { idToken, accessToken, refreshToken } = response.data;
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      setMessage("Sign in successful");
      setError("");
      navigate("/homepage");
    } catch (error) {
      setError("Invalid email or password.");
      setMessage("");
      setEmailError(true);
      setPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
    }
  };

  // Remember Me Function
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
