import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetCode, verifyResetCode } from "../../../api/auth/page";

import { Box, Typography, Input, Button } from "@mui/material";

const ResetCode: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
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
      try {
        const response = await verifyResetCode(email, code);
        if (response.status === 200) {
          navigate("/signin/resetpassword");
        }
      } catch (error) {
        setError("Your code isn’t correct. Please try again.");
        console.error("Reset code error:", error);
        setValues(Array(6).fill(""));
        if (inputsRef.current[0]) {
          inputsRef.current[0].focus();
        }
      }
    }
  };

  //重新发送验证码
  const handleResendCode = async () => {
    try {
      const response = await resetCode(email);
      if (response.status === 200) {
        setSuccess("Verification code sent successfully.");
      }
    } catch (error) {
      console.error("Resend code error:", error);
    }
  };

  // 当 success 变化时，清除 error
  useEffect(() => {
    if (success) {
      setError(null); // 如果有成功信息，清除错误
    }
  }, [success]);

  // 当 error 变化时，清除 success
  useEffect(() => {
    if (error) {
      setSuccess(null); // 如果有错误信息，清除成功
    }
  }, [error]);

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
          margin:
            error || success ? "82px 0px 293px 0px" : " 82px 0px 323px 0px",
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
              onClick={handleResendCode}
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
                color: "#008A02",
              }}
            >
              {success}
            </Typography>
          )}
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

export default ResetCode;
