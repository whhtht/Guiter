import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Typography,
  IconButton,
  Button,
  Checkbox,
} from "@mui/material";
import { signUp } from "../../../api/auth/page";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  // 动态调整密码输入框的高度和中间间距
  const [dynamicMargin, setDynamicMargin] = useState("82px 0px 185px 0px");
  const [passwordHeight, setPasswordHeight] = useState("74px");
  useEffect(() => {
    if (passwordError && focus) {
      setDynamicMargin("82px 0px 97px 0px");
      setPasswordHeight("162px");
    } else if (passwordError) {
      setDynamicMargin("82px 0px 185px 0px");
      setPasswordHeight("74px");
    } else if (focus) {
      setDynamicMargin("82px 0px 119px 0px");
      setPasswordHeight("140px");
    }
  }, [passwordError, focus]);

  // 切换密码可见性
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 处理输入框变化的逻辑
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 输入过程中清除密码的错误提示
    if (passwordError) {
      setPasswordError("");
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    // 输入过程中清除名字的错误提示
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

  // 点击继续按钮时的处理函数
  const handleContinue = async () => {
    // 清除错误信息
    setError("");
    setPasswordError("");
    // 用于标记是否有错误
    let hasError = false;
    // 检查密码是否符合规则
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9!@#$%^&*]/.test(password)
    ) {
      setPasswordError("Password must meet all the requirements.");
      hasError = true;
    }
    // 检查名字是否为空
    if (name.trim() === "") {
      setError("Please enter your full name.");
      hasError = true;
    }
    // 如果有任何错误，停止执行并显示错误信息
    if (hasError) return;
    // 调用 signUp 注册用户
    try {
      const response = await signUp(email, password, name)
      if (response.status === 200) {
        navigate("/signup/verification");
      }
    } catch (error) {
      setPasswordError("Sign up failed. Please try again.");
    }
  };

  // 按下回车键时，调用按钮的点击处理函数
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleContinue();
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

      {/* 注册表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: dynamicMargin,
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
          Create your account
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
            onClick={() => localStorage.removeItem("email")}
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
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

        {/* 输入全名 */}
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
            Your full name
          </Typography>
          <Input
            disableUnderline
            value={name}
            type="text"
            onChange={handleNameChange}
            onKeyDown={handleEnter}
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

        {/* 输入密码 */}
        <Box
          sx={{
            width: "395px",
            height: passwordHeight,
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
            Password
          </Typography>
          <Input
            disableUnderline
            value={password}
            type={showPassword ? "text" : "password"}
            onFocus={() => setFocus(true)}
            onChange={handlePasswordChange}
            onKeyDown={handleEnter}
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
          {passwordError && (
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
              {passwordError}
            </Typography>
          )}
          {/* 密码规则 */}
          {focus && (
            <Box>
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
          )}
        </Box>

        {/* 选择发送邮件 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "395px",
            gap: "8px",
            margin: "-8px 0px",
          }}
        >
          <Checkbox
            sx={{
              width: "16px",
              height: "16px",
              "&.MuiCheckbox-root": { color: "#02000C" },
            }}
          />
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            Send me exclusive offers via email
          </Typography>
        </Box>

        {/* 继续注册按钮 */}
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

        {/* 规则和使用守则 */}
        <Box sx={{ width: "395px" }}>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            By creating an account, you agree to our{" "}
            <Typography
              component={Link}
              to="/privacy"
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
              privacy policy
            </Typography>{" "}
            and{" "}
            <Typography
              component={Link}
              to="/terms"
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
              terms of use.
            </Typography>
          </Typography>
        </Box>
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

export default SignUp;
