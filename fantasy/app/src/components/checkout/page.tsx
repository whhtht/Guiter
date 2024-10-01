import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
  InputAdornment,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import { useLocation } from "../../hooks/useLocation.hook/page";
import { useCart } from "../../hooks/useCart.hook/page";

import LocationDrawer from "../drawer/location.drawer/page";
import PickUpDrawer from "../drawer/pickUp.drawer/page";

const CheckOut: React.FC = () => {
  const cartHook = useCart();
  // 检查是否登录
  const [isAccessToken, setIsAccessToken] = useState(false);
  const checkAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    setIsAccessToken(!!token);
  };
  useEffect(() => {
    // 初始化检查是否有 accessToken
    checkAccessToken();
    // 监听 localStorage 变化
    const handleStorageChange = () => {
      checkAccessToken();
    };
    window.addEventListener("storage", handleStorageChange);
    // 清理事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 选择配送或者自提
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("delivery") || "delivery";
  });
  // 选项改变时的处理函数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    localStorage.setItem("delivery", value);
  };
  // 用于控制 Drawer 的状态
  const [openLocation, setOpenLocation] = React.useState(false);
  const handleOpenLocation = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenLocation(true);
  };
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const handleOpenPickUp = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPickUp(true);
  };
  const locationFunctions = useLocation(setOpenLocation);
  // 当组件加载时，确保从 localStorage 恢复选项
  useEffect(() => {
    const storedOption = localStorage.getItem("delivery");
    if (!openLocation && !openPickUp && storedOption) {
      setSelectedOption(storedOption);
    }
  }, [openLocation, openPickUp]);
  const deliveryMethod = localStorage.getItem("delivery");

  // 优惠券
  const [showCouponInput, setShowCouponInput] = useState(false);
  // const [couponCode, setCouponCode] = useState("");
  const handleApplyCouponClick = () => {
    setShowCouponInput((prev) => !prev);
  };

  // 计算总价
  const hst = 0.13;
  const hstTotal = (
    Number(isAccessToken ? cartHook.cartTotal : cartHook.localTotal) * hst
  ).toFixed(2);
  const shippingFee =
    Number(isAccessToken ? cartHook.cartTotal : cartHook.localTotal) > 0
      ? 30
      : 0;
  const itemSubtotal = isAccessToken ? cartHook.cartTotal : cartHook.localTotal;
  const total = (Number(itemSubtotal) + Number(hstTotal) + shippingFee).toFixed(
    2
  );

  return (
    <Box>
      <Grid container>
        {/* 支付导航栏显示 */}
        <Grid item xs={12}>
          <Box
            sx={{
              borderBottom: "1px solid #DDDCDE",
              marginBottom: "48px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "72px",
                padding: "0px 72px",
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "157px",
                }}
              >
                <LockOutlinedIcon sx={{ width: "24px", height: "24px" }} />
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
                  Secure Checkout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 付款方式和订单信息 */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 72px 0px 72px",
            }}
          >
            {/* 付款流程 */}
            <Box
              sx={{
                width: "57.7%",
              }}
            >
              {/* 未登录时显示 */}
              {isAccessToken ? (
                ""
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "80px",
                    border: "1px solid #DDDCDE",
                    borderRadius: "4px",
                    padding: "0px 24px",
                    marginBottom: " 40px ",
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
                    Have an account? Sign in to speed up checkout and track
                    orders.
                  </Typography>
                  <Button
                    component={Link}
                    to="/signin"
                    state={{ from: window.location.pathname }}
                    sx={{
                      textTransform: "none",
                      width: "134px",
                      height: "48px",
                      border: "1px solid #76757C",
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
                      Sign In
                    </Typography>
                  </Button>
                </Box>
              )}
              {/* 付款流程填写区域 */}
              <Box
                sx={{
                  gap: "4px",
                  marginBottom: "36px",
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
                  Deliver
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
                  Don't have an account? Continue as a guest and provide your
                  delivery details.
                </Typography>
              </Box>

              {/* 选择配送或者自提方式 */}
              <Box>
                <Typography>Delivery method</Typography>
                <RadioGroup
                  value={selectedOption}
                  onChange={handleChange}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    margin: " 16px 0px 32px 0px",
                  }}
                >
                  {/* 配送 */}
                  <FormControlLabel
                    value="delivery"
                    control={
                      <Radio
                        checked={selectedOption === "delivery"}
                        onChange={handleChange}
                        value={"delivery"}
                        sx={{
                          width: "22px",
                          height: "22px",
                          color: "#02000C",
                          "&.Mui-checked": {
                            color: "#02000C",
                          },
                          margin: "0px 8px 0px 24px",
                        }}
                      />
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "365px",
                      height: "72px",
                      border:
                        selectedOption === "delivery"
                          ? "1px solid #02000C"
                          : "1px solid #DDDCDE",
                      borderRadius: "4px",
                      cursor: "default",
                      margin: "0px auto 0px 0px",
                    }}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <LocalShippingIcon
                          sx={{
                            width: "22px",
                            height: "22px",
                            margin: "0px 8px 0px 8px",
                          }}
                        />
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
                          Deliver to
                        </Typography>
                        <Box
                          onClick={handleOpenLocation}
                          sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
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
                            {locationFunctions.storedZipCode
                              ? locationFunctions.storedZipCode
                              : "M5G 2G4"}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />

                  {/* 自提 */}
                  <FormControlLabel
                    value="pickup"
                    control={
                      <Radio
                        checked={selectedOption === "pickup"}
                        onChange={handleChange}
                        value={"pickup"}
                        sx={{
                          width: "22px",
                          height: "22px",
                          color: "#02000C",
                          "&.Mui-checked": {
                            color: "#02000C",
                          },
                          margin: "0px 8px 0px 24px",
                        }}
                      />
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "365px",
                      height: "72px",
                      border:
                        selectedOption === "pickup"
                          ? "1px solid #02000C"
                          : "1px solid #DDDCDE",
                      borderRadius: "4px",
                      cursor: "default",
                      margin: "0px 0px 0px auto",
                    }}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <StoreIcon
                          sx={{
                            width: "22px",
                            height: "22px",
                            margin: "0px 8px 0px 8px",
                          }}
                        />
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
                          Pick up at
                        </Typography>
                        <Box
                          onClick={handleOpenPickUp}
                          sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
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
                            Toronto Downtown
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <LocationDrawer
                    open={openLocation}
                    setOpen={setOpenLocation}
                  />
                  <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
                </RadioGroup>
              </Box>

              {/* 付款信息输入区域 */}
              <Box sx={{ borderBottom: "1px solid #DDDCDE" }}>
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
                  Contact information
                </Typography>
                {deliveryMethod === "delivery" ? (
                  // 选择配送,配送信息
                  <Box sx={{ margin: "16px 0px 0px 0px" }}>
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
                      sx={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        margin: "4px 0px 32px 0px",
                        // 去掉默认状态下的下划线
                        "&:before": {
                          borderBottom: "none",
                        },
                        // 去掉 hover 状态下的下划线
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none",
                        },
                        // 去掉输入时的下划线
                        "&:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
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
                    <Box
                      sx={{
                        margin: "16px 0px 0px 0px",
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
                        Full name
                      </Typography>
                      <Input
                        sx={{
                          width: "100%",
                          height: "48px",
                          border: "1px solid #02000C",
                          borderRadius: "4px",
                          margin: "4px 0px 16px 0px",
                          "&:before": {
                            borderBottom: "none",
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "none",
                          },
                          "&:after": {
                            borderBottom: "none",
                          },
                        }}
                      />
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
                        Phone number
                      </Typography>
                      <Input
                        sx={{
                          width: "100%",
                          height: "48px",
                          border: "1px solid #02000C",
                          borderRadius: "4px",
                          margin: "4px 0px 16px 0px",
                          "&:before": {
                            borderBottom: "none",
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "none",
                          },
                          "&:after": {
                            borderBottom: "none",
                          },
                        }}
                      />
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
                        Address
                      </Typography>
                      <Input
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{
                              color: "#02000C",
                              margin: "0px 12px 0px 12px",
                            }}
                          >
                            <SearchIcon
                              sx={{ width: "18px", height: "18px" }}
                            />
                          </InputAdornment>
                        }
                        placeholder="Search for your address..."
                        sx={{
                          width: "100%",
                          height: "48px",
                          border: "1px solid #02000C",
                          borderRadius: "4px",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#76757C",
                          margin: "4px 0px 16px 0px",
                          "& .MuiInputBase-input": {
                            fontFamily: "Roboto",
                          },
                          "&:before": {
                            borderBottom: "none",
                          },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "none",
                          },
                          "&:after": {
                            borderBottom: "none",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  // 选择自提,自提信息
                  <Box sx={{ margin: "16px 0px 0px 0px" }}>
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
                      Full name
                    </Typography>
                    <Input
                      sx={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        margin: "4px 0px 16px 0px",
                        // 去掉默认状态下的下划线
                        "&:before": {
                          borderBottom: "none",
                        },
                        // 去掉 hover 状态下的下划线
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none",
                        },
                        // 去掉输入时的下划线
                        "&:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
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
                      sx={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        margin: "4px 0px 16px 0px",
                        "&:before": {
                          borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none",
                        },
                        "&:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
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
                      Phone number
                    </Typography>
                    <Input
                      sx={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        margin: "4px 0px 16px 0px",
                        "&:before": {
                          borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none",
                        },
                        "&:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
                  </Box>
                )}
                {/* 保存地址和联系信息 */}
                <Button
                  sx={{
                    width: "206px",
                    height: "48px",
                    backgroundColor: "#02000C",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                    textTransform: "none",
                    margin: "24px 0px 40px 0px",
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
                    Save & Continue
                  </Typography>
                </Button>
              </Box>
              {/* 付款卡号填写 */}
              <Box
                sx={{
                  padding: "40px 0px 40px 0px",
                  borderBottom: "1px solid #DDDCDE",
                }}
              >
                <Typography>Payment</Typography>
              </Box>
              <Box sx={{ padding: "300px 0px 0px 0px" }}></Box>
            </Box>
            {/* 订单信息 */}
            <Box
              sx={{
                width: "420px",
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
                Order Summary
              </Typography>
              <Box sx={{ margin: "16px 0px 0px 0px" }}>
                {/* 购物车商品列表 */}
                {isAccessToken
                  ? cartHook.cartItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          height: "90px",
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        {/* 图片 */}
                        <Box
                          sx={{
                            width: "66px",
                            height: "66px",
                            borderRadius: "8px",
                            backgroundColor: "#F2F2F2",
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        {/* 商品信息 */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "263px",
                              height: "74px",
                              margin: "0px 15px 0px 0px",
                              gap: "3px",
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
                              {item.product.name}
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
                              Condition:{" "}
                              {item.product.specificationDetail.Condition}
                            </Typography>
                          </Box>
                          {/* 商品价格 */}
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "24px",
                              textAlign: "right",
                              color: "#02000C",
                            }}
                          >
                            $ {Number(item.product.price).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  : Array.isArray(cartHook.localCartItems) &&
                    cartHook.localCartItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          height: "90px",
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        {/* 图片 */}
                        <Box
                          sx={{
                            width: "66px",
                            height: "66px",
                            borderRadius: "8px",
                            backgroundColor: "#F2F2F2",
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        {/* 商品信息 */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              width: "263px",
                              height: "74px",
                              margin: "0px 15px 0px 0px",
                              gap: "3px",
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
                              {item.product.name}
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
                              Condition:{" "}
                              {item.product.specificationDetail.Condition}
                            </Typography>
                          </Box>
                          {/* 商品价格 */}
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight: 500,
                              lineHeight: "24px",
                              textAlign: "right",
                              color: "#02000C",
                            }}
                          >
                            $ {Number(item.product.price).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                {/* 优惠券 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "65px",
                    gap: "16px",
                    textDecoration: "underline",
                    borderBottom: showCouponInput
                      ? "none"
                      : "1px solid #DDDCDE",
                  }}
                >
                  <LocalOfferOutlinedIcon
                    onClick={handleApplyCouponClick}
                    cursor="pointer"
                    sx={{
                      width: "21px",
                      height: "21px",
                      transform: "rotate(90deg)",
                    }}
                  />
                  <Typography
                    onClick={handleApplyCouponClick}
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "left",
                      color: "#02000C",
                      cursor: "pointer",
                    }}
                  >
                    Apple a coupon code
                  </Typography>
                </Box>
                {showCouponInput ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 0px 16px 0px",
                      borderBottom: showCouponInput
                        ? "1px solid #DDDCDE"
                        : "none",
                    }}
                  >
                    <Input
                      sx={{
                        width: "70%",
                        height: "40px",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        "&:before": {
                          borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none",
                        },
                        "&:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
                    <Button
                      sx={{
                        width: "103px",
                        height: "40px",
                        backgroundColor: "#02000C",
                        "&:hover": {
                          backgroundColor: "#02000C",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "center",
                          color: "#FFFFFF",
                        }}
                      >
                        Apply
                      </Typography>
                    </Button>
                  </Box>
                ) : (
                  ""
                )}
                {/* 计算价格 */}
                <Box
                  sx={{
                    margin: "16px 0px 16px 0px",
                    borderBottom: "1px solid #DDDCED",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography>
                      Item subtotal(
                      {isAccessToken
                        ? cartHook.cartItemCount
                        : cartHook.localCartCount}
                      )
                    </Typography>
                    <Typography>$ {itemSubtotal}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography>Shipping fee</Typography>
                    <Typography>$ {shippingFee.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography>HST</Typography>
                    <Typography>$ {hstTotal}</Typography>
                  </Box>
                </Box>
                {/* 总价 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography>$ {total}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOut;
