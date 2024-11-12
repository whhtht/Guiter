import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Header from "../layout/header/page";

const Account: React.FC = () => {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (location.pathname.startsWith("/order")) {
      setValue("order");
    } else {
      setValue("account");
    }
  }, [location.pathname]);

  return (
    <Box>
      <Header />

      {/* 账户表单 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: "0px 72px",
          margin: "48px 0px 0px 0px",
        }}
      >
        {/* 选择账户还是订单 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* 账户 */}
          <Box
            component={Link}
            to="/account"
            onClick={() => setValue("account")}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "200px",
              height: "56px",
              color: "#02000C",
              border:
                value === "account" ? "1px solid #02000C" : "1px solid #DDDCDE",
              borderRadius: "4px",
              textDecoration: "none",
              gap: "12px",
              padding: "16px",
            }}
          >
            <PersonOutlineIcon sx={{ width: "22px", height: "22px" }} />
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
              My Account
            </Typography>
          </Box>

          {/* 订单 */}
          <Box
            component={Link}
            to="/order"
            onClick={() => setValue("order")}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "200px",
              height: "56px",
              color: "#02000C",
              border:
                value === "order" ? "1px solid #02000C" : "1px solid #DDDCDE",
              borderRadius: "4px",
              textDecoration: "none",
              gap: "12px",
              padding: "16px",
            }}
          >
            <ViewInArOutlinedIcon sx={{ width: "22px", height: "22px" }} />
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
              My Orders
            </Typography>
          </Box>
        </Box>

        {/* 内容显示 */}
        <Box sx={{ width: "1024px" }}>
          {location.pathname === "/account" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                Welcome, {name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {/* 个人信息 */}
                <Button
                  component={Link}
                  to="/account/profile"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "500px",
                    height: "106px",
                    color: "#02000C",
                    border: "1px solid #DDDCDE",
                    padding: "24px",
                    textTransform: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
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
                      Profile
                    </Typography>
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
                      Edit your name, email, and password.
                    </Typography>
                  </Box>
                  <ChevronRightIcon fontSize="large" />
                </Button>

                {/* 收货地址 */}
                <Button
                  component={Link}
                  to="/account/address"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "500px",
                    height: "106px",
                    color: "#02000C",
                    border: "1px solid #DDDCDE",
                    padding: "24px",
                    textTransform: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
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
                      Shipping address
                    </Typography>
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
                      Edit your shipping address
                    </Typography>
                  </Box>
                  <ChevronRightIcon fontSize="large" />
                </Button>
              </Box>
            </Box>
          )}

          {location.pathname === "/order" && (
            <Typography>My Orders Content</Typography>
          )}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
