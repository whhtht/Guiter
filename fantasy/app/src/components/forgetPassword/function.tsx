import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../api/auth/page";

export const useForgetPassword = () => {
  // Email Function
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailBackgroundColor, setEmailBackgroundColor] = useState<string>("");

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

  // Message Function
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      setEmailError(true);
      setEmailBackgroundColor("#FFECE8");
      return;
    } else {
      setError("");
      setEmailError(false);
      setEmailBackgroundColor("");
    }
    try {
      await forgetPassword(email);
      setMessage("Sign in successful");
      setError("");
      navigate("/forgetPassword/resetPassword", { state: { email } });
      console.log("Sign in successful", email);
    } catch (error) {
      setError("Invalid email.");
      setMessage("");
      setEmailError(true);
      setEmailBackgroundColor("#FFECE8");
      console.log("Invalid email.", email);
    }
  };

  return{
    email,
    emailError,
    emailBackgroundColor,
    handeleEmailChange,
    handleFocusEmail,
    handleBlurEmail,
    error,
    message,
    handleForgetPassword,
  };
};
