import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../../../api/auth/page";

// Mui Imports
import { Box, Input, Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string;
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN as string;
  const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI as string;

  const googleLoginUrl = `${cognitoDomain}/authorize?client_id=${clientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=${redirectUri}&identity_provider=Google`;
  const facebookLoginUrl = `${cognitoDomain}/authorize?client_id=${clientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=${redirectUri}&identity_provider=Facebook`;

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const handleFacebookLogin = () => {
    window.location.href = facebookLoginUrl;
  };

  // 点击继续按钮时的处理函数
  const handleContinue = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Please enter your email address.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter your email address in format: xyz@example.com");
      setEmail("");
    } else {
      try {
        // 调用 checkUser 检查邮箱是否存在
        const response = await checkUser(email);
        // 如果用户存在，跳转到密码输入页面, 否则跳转到注册页面
        if (response.status === 200 && response.data.exists === true) {
          navigate("/signin/password");
        } else if (response.status === 200 && response.data.exists === false) {
          navigate("/signup");
        }
      } catch (error) {
        // 如果出现错误，显示错误信息
        setError("Error checking email. Please try again.");
      }
      localStorage.setItem("email", email);
    }
  };

  // 输入邮箱时的处理函数
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    // 输入过程中清除邮箱的错误提示
    if (error) {
      setError("");
    }
  };

  // 按下回车键时，调用按钮的点击处理函数
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleContinue();
    }
  };

  // 第三方登录失败时，显示错误信息
  useEffect(() => {
    const errorMessage = localStorage.getItem("error");
    if (errorMessage) {
      setError(errorMessage);
      localStorage.removeItem("error");
    }
  }, []);

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

      {/* 表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: " 82px 0px 95px 0px",
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
          Sign in or create an account
        </Typography>
        <Box
          sx={{
            width: "395px",
            height: "48px",
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
            Not sure if you have an account? Just enter your email, and we’ll
            check for you.
          </Typography>
        </Box>

        {/* 邮箱输入框 */}
        <Box sx={{ width: "395px", height: "74px" }}>
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
            Your email
          </Typography>
          <Input
            disableUnderline
            value={email}
            type="email"
            onChange={handleEmailChange}
            onKeyDown={handleEnter}
            autoComplete="off"
            sx={{
              width: "100%",
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
        </Box>

        {/* 继续登录按钮 */}
        <Button
          onClick={handleContinue}
          sx={{
            width: "395px",
            height: "48px",
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

        {/* Google账号登录 */}
        <Button
          onClick={handleGoogleLogin}
          startIcon={
            <GoogleIcon
              sx={{
                position: "absolute",
                top: "12px",
                left: "16px",
                width: "24px",
                height: "24px",
              }}
            />
          }
          sx={{
            position: "relative",
            width: "395px",
            height: "48px",
            textTransform: "none",
            border: "1px solid #02000C",
            borderRadius: "4px",
            "&:hover": { backgroundColor: "#FFFFFF" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            Continue with Google
          </Typography>
        </Button>

        {/* Facebook账号登录 */}
        <Button
          onClick={handleFacebookLogin}
          startIcon={
            <FacebookIcon
              sx={{
                position: "absolute",
                top: "12px",
                left: "16px",
                width: "24px",
                height: "24px",
              }}
            />
          }
          sx={{
            position: "relative",
            width: "395px",
            height: "48px",
            textTransform: "none",
            border: "1px solid #02000C",
            "&:hover": { backgroundColor: "#FFFFFF" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            Continue with Facebook
          </Typography>
        </Button>

        {/* Apple账号登录 */}
        <Button
          startIcon={
            <AppleIcon
              sx={{
                position: "absolute",
                top: "12px",
                left: "16px",
                width: "24px",
                height: "24px",
              }}
            />
          }
          sx={{
            position: "relative",
            width: "395px",
            height: "48px",
            textTransform: "none",
            border: "1px solid #02000C",
            "&:hover": { backgroundColor: "#FFFFFF" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "center",
              color: "#02000C",
            }}
          >
            Continue with Apple
          </Typography>
        </Button>
      </Box>

      {/* 页脚 */}
      <Box
        sx={{
          width: "100%",
          height: "72px",
          backgroundColor: "#02000C",
        }}
      />
    </Box>
  );
};

export default SignIn;
