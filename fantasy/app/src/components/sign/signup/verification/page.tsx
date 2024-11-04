import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifySignUpCode, resendSignUpCode } from "../../../../api/auth/page";

import { Box, Typography, Input, Button } from "@mui/material";

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const [error, setError] = useState("");
  const [values, setValues] = useState(Array(6).fill(""));

  // 使用 useRef 来获取 MUI Input 元素的引用
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // 处理输入框变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // 限制为一个字符
    if (value.length > 1) return;

    // 更新输入框的值
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // 自动聚焦到下一个输入框
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // 当输入的值达到6位时自动验证
    if (newValues.every((val) => val !== "")) {
      handleVerify(newValues.join(""));
    }

    setError("");
  };

  // 处理提交的验证码
  const handleVerify = async (code: string) => {
    if (code.length === 0) {
      setError("Please enter your code.");
    } else if (code.length < 6 && code.length > 0) {
      setError("Please enter six digits verification code.");
      // 清空输入框
      setValues(Array(6).fill(""));
      // 将焦点回到第一个输入框
      if (inputsRef.current[0]) {
        inputsRef.current[0].focus();
      }
    } else {
      // 调用 verifySignUpCode 函数验证验证码
      try {
        const response = await verifySignUpCode(email, code);
        if (response.status === 200) {
          navigate("/signin");
        }
      } catch (error) {
        setError("Your code isn’t correct. Please try again.");
        setValues(Array(6).fill(""));
        if (inputsRef.current[0]) {
          inputsRef.current[0].focus();
        }
      }
    }
  };

  const [success, setSuccess] = useState("");
  // 处理重新发送验证码
  const handleResend = async () => {
    try {
      const response = await resendSignUpCode(email);
      if (response.status === 200) {
        setSuccess("Verification code resent.");
      }
    } catch (error) {
      setError("Failed to resend verification code.");
    }
  };

  // 处理键盘按下事件
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // 处理退格键
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    // 处理回车键
    if (e.key === "Enter") {
      handleVerify(values.join(""));
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

      {/* 验证码表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: " 82px 0px 357px 0px",
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
          Enter your verification code
        </Typography>

        {/* 修改邮箱地址 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
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
            We've sent the verification code to
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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
        </Box>

        {/* 验证码区域 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "328px",
            height: "78px",
            margin: "8px 0px",
          }}
        >
          {/* 输入验证码 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "328px",
              height: "48px",
              margin: "0px 0px 8px 0px",
            }}
          >
            {values.map((value, index) => (
              <Input
                disableUnderline
                key={index}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
                inputRef={(ref) => (inputsRef.current[index] = ref)}
                inputProps={{ maxLength: 1, sx: { textAlign: "center" } }}
                sx={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid #02000C",
                  borderRadius: "4px",
                }}
              />
            ))}
          </Box>

          {/* 重新发送验证码 */}
          <Box sx={{ display: "flex", gap: "6px" }}>
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
              Didn’t receive it?
            </Typography>
            <Typography
              onClick={handleResend}
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
              Resend the code
            </Typography>
          </Box>
          {success && (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                color: "#00A343",
              }}
            >
              {success}
            </Typography>
          )}
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

        {/* 验证按钮 */}
        <Button
          onClick={() => handleVerify(values.join(""))}
          sx={{
            width: "386px",
            height: "48px",
            border: "1px solid #02000C",
            borderRadius: "4px",
            backgroundColor: "#02000C",
            textTransform: "none",
            ":hover": { backgroundColor: "#02000C" },
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
            Verify and Create Account
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

export default Verification;
