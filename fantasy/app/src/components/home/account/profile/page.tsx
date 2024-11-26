import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Breadcrumbs,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { changeName, resetPassword } from "../../../../api/auth/page";

const Profile: React.FC = () => {
  const method = localStorage.getItem("method");
  const email = localStorage.getItem("email") || "";
  const name = localStorage.getItem("name") || "";
  const [changename, setChangename] = useState<boolean>(false);
  const [newname, setNewname] = useState<string>("");
  const [newnameError, setNewnameError] = useState<string>("");
  const [changepassword, setChangepassword] = useState<boolean>(false);
  const [newpassword, setNewpassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [newpasswordError, setNewpasswordError] = useState<string>("");

  // 修改用户名
  const handleChangeName = () => {
    setChangename(!changename);
    setNewnameError("");
    setNewname(name);
  };
  const handleNewnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewname(event.target.value);
  };
  const handleSaveName = async () => {
    try {
      await changeName(email, newname);
      localStorage.setItem("name", newname);
      setChangename(!changename);
      setNewnameError("");
    } catch (error) {
      const errorResponse = error as { message: string };
      const errorMessage = errorResponse.message;
      setNewnameError(errorMessage);
    }
  };

  // 修改密码
  const handleChangePassword = () => {
    setChangepassword(!changepassword);
    setNewpasswordError("");
  };
  const handleNewpasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewpassword(event.target.value);
    if (newpasswordError) {
      setNewpasswordError("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
  const handleSavePassword = async () => {
    try {
      await resetPassword(email, newpassword);
      setChangepassword(!changepassword);
      setNewpasswordError("");
    } catch (error) {
      const errorResponse = error as { message: string };
      const errorMessage = errorResponse.message;
      setNewpasswordError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        height: "1080px",
      }}
    >
      {/* 导航栏 */}
      <Breadcrumbs>
        <Typography
          component={Link}
          to="/account"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#76757C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          My Account
        </Typography>
        <Typography
          component={Link}
          to="/account/profile"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#02000C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          Profile
        </Typography>
      </Breadcrumbs>

      {/* 标题 */}
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
        Profile
      </Typography>

      {/* 账号密码登录的内容 */}
      {method === "account" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* 修改用户名 */}
          {changename === true ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "500px",
                height: "202px",
                border: "1px solid #DDDCDE",
                borderRadius: "4px",
                padding: "24px",
              }}
            >
              <Box sx={{ width: "452px", height: "74px" }}>
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
                  value={newname}
                  type="text"
                  onChange={handleNewnameChange}
                  autoComplete="off"
                  sx={{
                    width: "452px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    padding: "0px 16px",
                  }}
                />
              </Box>
              {newnameError && (
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#FF0000",
                  }}
                >
                  {newnameError}
                </Typography>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <Button
                  onClick={handleSaveName}
                  sx={{
                    width: "137px",
                    height: "48px",
                    backgroundColor: "#02000C",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#02000C",
                    },
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
                    Save
                  </Typography>
                </Button>
                <Typography
                  onClick={handleChangeName}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#02000C",
                    textDecoration: "underline",
                  }}
                >
                  Cancel
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "500px",
                height: "98px",
                border: "1px solid #DDDCDE",
                borderRadius: "4px",
                padding: "24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
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
                  Your full name
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    color: "#02000C",
                  }}
                >
                  {name}
                </Typography>
              </Box>
              <Typography
                onClick={handleChangeName}
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "right",
                  color: "#02000C",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationSkipInk: "none",
                }}
              >
                change
              </Typography>
            </Box>
          )}

          {/* 显示邮箱 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "500px",
              height: "98px",
              border: "1px solid #DDDCDE",
              borderRadius: "4px",
              padding: "24px",
              gap: "4px",
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
              Your email
            </Typography>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              {email}{" "}
              <CheckCircleIcon
                sx={{
                  width: "14px",
                  height: "14px",
                  color: "#008A02",
                }}
              />
            </Typography>
          </Box>

          {/* 修改密码 */}
          {changepassword === true ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "500px",
                height: "278px",
                border: "1px solid #DDDCDE",
                borderRadius: "4px",
                padding: "24px",
              }}
            >
              <Box sx={{ width: "452px" }}>
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
                  value={newpassword}
                  type={showPassword ? "text" : "password"}
                  onChange={handleNewpasswordChange}
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
                    width: "452px",
                    height: "48px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    padding: "0px 16px",
                  }}
                />
                {newpasswordError && (
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#FF0000",
                    }}
                  >
                    {newpasswordError}
                  </Typography>
                )}
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
                    {rule.validate(newpassword) ? (
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
              <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <Button
                  onClick={handleSavePassword}
                  sx={{
                    width: "137px",
                    height: "48px",
                    backgroundColor: "#02000C",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#02000C",
                    },
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
                    Save
                  </Typography>
                </Button>
                <Typography
                  onClick={handleChangePassword}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#02000C",
                    textDecoration: "underline",
                  }}
                >
                  Cancel
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "500px",
                height: "98px",
                border: "1px solid #DDDCDE",
                borderRadius: "4px",
                padding: "24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
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
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    color: "#02000C",
                  }}
                >
                  •••••••••••
                </Typography>
              </Box>
              <Typography
                onClick={handleChangePassword}
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "right",
                  color: "#02000C",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationSkipInk: "none",
                }}
              >
                change
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
