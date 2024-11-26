import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder.hook/hook/page";

import { Box, Typography, Button } from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Header from "../layout/header/page";

const Account: React.FC = () => {
  const location = useLocation();
  const { fetchOrder, order } = useOrder();

  const name = localStorage.getItem("name");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (location.pathname.startsWith("/order")) {
      setValue("order");
      fetchOrder();
    } else {
      setValue("account");
    }
  }, [location.pathname, fetchOrder]);

  return (
    <Box>
      <Header />

      {/* 账户表单 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          height: "2345px",
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
          {/* 账户信息 */}
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

          {/* 订单信息 */}
          {location.pathname === "/order" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "1024px",
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
                My Orders
              </Typography>
              {order.map((item) => (
                <Box
                  key={item.orderId}
                  sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      wdith: "1024px",
                      border: "1px solid #DDDCDE",
                      borderRadius: "4px",
                      padding: "24px",
                    }}
                  >
                    {/* 订单状态 */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      {/* 准备发货 */}
                      {item.status === "prepar" ? (
                        <Box sx={{ display: "flex", gap: "4px" }}>
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "24px",
                              textAlign: "left",
                              color: "#008A02",
                            }}
                          >
                            Preparing for shipping!
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "24px",
                              textAlign: "left",
                              color: "#02000C",
                            }}
                          >
                            Estimated delivery: Sat, Jul 27
                          </Typography>
                        </Box>
                      ) : null}
                      {/* 已经发货 */}
                      {item.status === "ship" ? (
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Item shipped! Estimated delivery: Sat, Jul 27
                        </Typography>
                      ) : null}
                      {/* 可以自提 */}
                      {item.status === "pickup" ? (
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            textAlign: "left",
                            color: "#008A02",
                          }}
                        >
                          Ready for pickup!
                        </Typography>
                      ) : null}
                      {/* 已自提 */}
                      {item.status === "done" ? (
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Item picked up: Sat, Jul 27
                        </Typography>
                      ) : null}
                      {/* 订单信息 */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* 订单号 */}
                        <Box sx={{ display: "flex", gap: "8px" }}>
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
                            Order number:
                          </Typography>
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
                            {item.orderId}
                          </Typography>
                        </Box>
                        {/* 订单时间 */}
                        <Box sx={{ display: "flex", gap: "8px" }}>
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
                            Order placed:
                          </Typography>
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
                            {new Date(item.data).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            })}
                          </Typography>
                        </Box>
                        {/* 运送信息 */}
                        {item.type === "delivery" ? (
                          <Box>
                            <Box sx={{ display: "flex", gap: "8px" }}>
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
                                Shipped by:
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
                                Available soon
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: "8px" }}>
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
                                Tracking number:
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
                                Available soon
                              </Typography>
                            </Box>
                          </Box>
                        ) : null}
                        {/* 自提信息 */}
                        {item.type === "pickup" ? (
                          <Box>
                            <Box sx={{ display: "flex", gap: "8px" }}>
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
                                Pickup store address:
                              </Typography>
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
                                382 Yonge Street, Toronto
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: "8px" }}>
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
                                Pickup store hours:
                              </Typography>
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
                                Mon - Fri 10:00 am - 10:00 pm (EST), Sat - Sun
                                10:00 am - 6:00pm (EST)
                              </Typography>
                            </Box>
                          </Box>
                        ) : null}
                      </Box>
                      {/* 订单商品 */}
                      {item.products.map((prod, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            gap: "16px",
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "92px",
                              height: "92px",
                              border: "1px solid #02000C",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "400px",
                              gap: "5px",
                            }}
                          >
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
                              {prod.name}
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
                              {prod.condition}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {/* 订单详情 */}
                    <Button
                      component={Link}
                      to="/order/detail"
                      onClick={() =>
                        sessionStorage.setItem("ordernumber", item.orderId)
                      }
                      sx={{
                        width: "193px",
                        height: "48px",
                        border: "1px solid #76757C",
                        borderRadius: "4px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#FFFFFF",
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
                          color: "#02000C",
                        }}
                      >
                        View Order Details
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
