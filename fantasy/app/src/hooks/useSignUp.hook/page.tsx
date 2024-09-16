import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth/page";

export const useSignUp = () => {
  // Email Function
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = React.useState(false);
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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

  // Confirm Password Function
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordBackgroundColor, setConfirmPasswordBackgroundColor] =
    useState<string>("");
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  // Confirm Password Error Function
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (!inputConfirmPassword) {
      setConfirmPasswordError(false);
      setConfirmPasswordBackgroundColor("");
    }
  };
  const handleFocusConfirmPassword = () => {
    if (confirmPasswordError) {
      setConfirmPasswordBackgroundColor("#FDCDC5");
    }
  };
  const handleBlurConfirmPassword = () => {
    if (confirmPasswordError) {
      setConfirmPasswordBackgroundColor("#FFECE8");
    }
  };
  const handleClearConfirmPassword = () => {
    setConfirmPassword("");
  };

  // Message Function
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  // 注册按钮
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      setEmailError(true);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("");
      setConfirmPasswordBackgroundColor("");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("");
      return;
    }
    if (!confirmPassword) {
      setError("Please confirm your password.");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("");
      setConfirmPasswordBackgroundColor("#FFECE8");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setEmailError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("#FFECE8");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      const response = await signUp(email, password);
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
      setTimeout(() => navigate("/signin"), 2000);
      setError("");
    } catch (err) {
      const errorResponse = err as { message: string };
      const errorMessage = errorResponse.message;
      setError(errorMessage);
      setMessage("");
      setEmailError(true);
      setPasswordError(true);
      setConfirmPasswordError(true);
      setEmailBackgroundColor("#FFECE8");
      setPasswordBackgroundColor("#FFECE8");
      setConfirmPasswordBackgroundColor("#FFECE8");
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
    }
  };

  return {
    handleSignUp,
    email,
    showEmail,
    emailError,
    handeleEmailChange,
    handleFocusEmail,
    handleBlurEmail,
    emailBackgroundColor,
    handleClickShowEmail,
    handleMouseDownEmail,
    password,
    showPassword,
    passwordError,
    handelePasswordChange,
    handleFocusPassword,
    handleBlurPassword,
    passwordBackgroundColor,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClearPassword,
    confirmPassword,
    showConfirmPassword,
    confirmPasswordError,
    handleConfirmPasswordChange,
    handleFocusConfirmPassword,
    handleBlurConfirmPassword,
    confirmPasswordBackgroundColor,
    handleClickShowConfirmPassword,
    handleMouseDownConfirmPassword,
    handleClearConfirmPassword,
    error,
    message,
    rememberMe,
    handleRememberMeChange,
  };
};
