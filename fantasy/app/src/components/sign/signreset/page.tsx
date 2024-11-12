import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetCode, verifyResetCode } from "../../../api/auth/page";
import { Header } from "../signlayout/header/page";
import { Footer } from "../signlayout/footer/page";

import { Box, Typography, Input, Button } from "@mui/material";

const ResetCode: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const [error, setError] = useState<string | null>("");
  const [values, setValues] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      handleSubmit(newValues.join(""));
    }

    setError("");
  };

  // 处理键盘事件
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleSubmit(values.join(""));
    }
  };

  // 提交表单
  const handleSubmit = async (code: string) => {
    try {
      const response = await verifyResetCode(email, code);
      if (response.status === 200) {
        navigate("/signin/resetpassword");
      }
    } catch (error) {
      const errorResponse = error as { message: string };
      const errorMessage = errorResponse.message;
      setError(errorMessage);

      setValues(Array(6).fill(""));
      if (inputsRef.current[0]) {
        inputsRef.current[0].focus();
      }
    }
  };

  // 重新发送验证码倒计时
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  //重新发送验证码
  const handleResendCode = async () => {
    setTimer(60); // 设置60秒倒计时
    setIsResendDisabled(true);
    setError("");

    try {
      await resetCode(email);
    } catch (error) {
      setError("Resend code error. Please try again.");
    }
  };

  return (
    <Box>
      <Header />

      {/* 验证码表单 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: error ? "82px 0px 277px 0px" : " 82px 0px 315px 0px",
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
          We need to verify it's really you. <br />
          Please enter your verification code.
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

        {/* 验证码区域 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "328px",
            margin: "8px 0px",
            gap: "8px",
          }}
        >
          {/* 输入验证码 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "328px",
              height: "48px",
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

          {/* 重新发送验证码 */}
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              margin: error ? "8px 0px 0px 0px" : "0px",
            }}
          >
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
              onClick={!isResendDisabled ? handleResendCode : undefined}
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
              {isResendDisabled
                ? `Resend code after ${timer}s`
                : "Resend the code"}
            </Typography>
          </Box>
        </Box>

        {/* 提交按钮 */}
        <Button
          onClick={() => handleSubmit(values.join(""))}
          sx={{
            width: "386px",
            height: "48px",
            border: "1px solid #02000C",
            borderRadius: "4px",
            backgroundColor: "#02000C",
            textTransform: "none",
            marginTop: "8px",
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
            Verify
          </Typography>
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default ResetCode;
