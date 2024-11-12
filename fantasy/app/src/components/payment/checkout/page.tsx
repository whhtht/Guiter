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
  Collapse,
  FormControl,
  Checkbox,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useCart } from "../../../hooks/useCart.hook/page";
import { usePayment } from "../../../hooks/usePayment.hook/page";

const CheckOut: React.FC = () => {
  const cartHook = useCart();
  const paymentHook = usePayment();

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
  useEffect(() => {
    const storedDeliveryMethod = localStorage.getItem("delivery");
    if (!storedDeliveryMethod) {
      // 如果 localStorage 中没有值，设置默认值为 'delivery'
      localStorage.setItem("delivery", "delivery");
      setSelectedOption("delivery"); // 同时更新 React 状态
    } else {
      // 如果已有值，加载该值
      setSelectedOption(storedDeliveryMethod);
    }
  }, []);

  // 选项改变时的处理函数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    localStorage.setItem("delivery", value);
  };

  // 当组件加载时，确保从 localStorage 恢复选项
  const deliveryMethod = localStorage.getItem("delivery");
  useEffect(() => {
    const storedOption = localStorage.getItem("delivery");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  // 联系信息
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const handleProvinceChange = (event: SelectChangeEvent) => {
    setProvince(event.target.value);
  };
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // 移除非字母数字字符，并将字母转为大写
    if (value.length > 3) {
      value = value.slice(0, 3) + " " + value.slice(3); // 在第三个字符后插入空格
    }
    setZipCode(value);
  };

  // 优惠券
  const [showCouponInput, setShowCouponInput] = useState(false);
  // const [couponCode, setCouponCode] = useState("");
  const handleApplyCouponClick = () => {
    setShowCouponInput((prev) => !prev);
  };

  // 计算总价
  const hst = 0.15;
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

  // 填写信息区域展开与收起
  const [collapseOpen, setCollapseOpen] = useState(true);
  // 付款信息输入区域展开与收起
  const [paymentOpen, setPaymentOpen] = useState(false);
  const handleCollapse = () => {
    setCollapseOpen((prev) => !prev);
    setPaymentOpen(true);
    console.log(fullName, email, phoneNumber);
  };

  // 选择邮寄地址和信用卡地址是否一致
  const [checked, setChecked] = React.useState(false);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ backgroundColor: "#FAFAFA" }}>
      <Grid container>
        {/* 支付导航栏显示 */}
        <Grid item xs={12}>
          <Box
            sx={{
              borderBottom: "1px solid #DDDCDE",
              padding: "0px 72px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
        <Grid item xs={12} sx={{ padding: "0px 72px 0px 72px" }}>
          <Box sx={{ margin: "48px 0px 32px 0px" }}>
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
              CheckOut
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* 左边付款流程 */}
            <Box
              sx={{
                width: "792px",
              }}
            >
              {/* 未登录时显示 */}
              {!isAccessToken && deliveryMethod === "delivery" ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "80px",
                    border: "1px solid #DDDCDE",
                    borderRadius: "4px",
                    padding: "0px 24px",
                    backgroundColor: "#FFFFFF",
                    marginBottom: "32px",
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
              ) : (
                ""
              )}

              {/* 付款流程填写区域 */}
              {collapseOpen ? (
                <Collapse
                  in={collapseOpen}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    padding: "32px",
                    border: "1px solid #DDDCDE",
                    borderRadius: "4px",
                  }}
                >
                  {/* 付款区域简介 */}
                  <Box
                    sx={{
                      gap: "4px",
                      marginBottom: "32px",
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
                      Don't have an account? Continue as a guest and provide
                      your delivery details.
                    </Typography>
                  </Box>

                  {/* 选择配送或者自提方式 */}
                  <Box>
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
                      Delivery method
                    </Typography>
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
                          width: "356px",
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
                            <LocalShippingOutlinedIcon
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
                              Deliver to your address
                            </Typography>
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
                          width: "356px",
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
                              Pick up in store
                            </Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </Box>

                  {/* 付款信息输入区域 */}
                  {deliveryMethod === "delivery" ? (
                    // 选择配送,配送信息
                    <Box>
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
                        Contact info
                      </Typography>
                      {/* 输入邮箱 */}
                      <Box sx={{ margin: "16px 0px 32px 0px" }}>
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
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            width: "100%",
                            height: "48px",
                            border: "1px solid #02000C",
                            borderRadius: "4px",
                            margin: "4px 0px 0px 0px",
                            padding: "0px 12px",
                          }}
                        />
                      </Box>

                      {/* 邮寄信息输入 */}
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
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          width: "100%",
                          height: "420px",
                          margin: "16px 0px 0px 0px",
                        }}
                      >
                        {/* 输入名字 */}
                        <Box>
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
                            disableUnderline
                            onChange={(e) => setFullName(e.target.value)}
                            sx={{
                              width: "100%",
                              height: "48px",
                              border: "1px solid #02000C",
                              borderRadius: "4px",
                              margin: "4px 0px 0px 0px",
                              padding: "0px 12px",
                            }}
                          />
                        </Box>

                        {/* 输入电话 */}
                        <Box>
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
                            disableUnderline
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            sx={{
                              width: "100%",
                              height: "48px",
                              border: "1px solid #02000C",
                              borderRadius: "4px",
                              margin: "4px 0px 0px 0px",
                              padding: "0px 12px",
                            }}
                          />
                        </Box>

                        {/* 输入地址 */}
                        <Box>
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
                            disableUnderline
                            onChange={(e) => setAddress(e.target.value)}
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
                              margin: "4px 0px 0px 0px",
                              padding: "0px 12px",
                            }}
                          />
                        </Box>

                        {/* 输入国家、省份、城市、邮编 */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "12px",
                          }}
                        >
                          <Box>
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
                              Country
                            </Typography>
                            <Input
                              disabled
                              disableUnderline
                              placeholder="Canada"
                              sx={{
                                width: "356px",
                                height: "48px",
                                border: "1px solid #02000C",
                                borderRadius: "4px",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                textAlign: "left",
                                color: "#76757C",
                                margin: "4px 0px 0px 0px",
                                padding: "0px 12px",
                                "& .MuiInputBase-input.Mui-disabled": {
                                  color: "#76757C",
                                  "-webkit-text-fill-color": "#76757C",
                                },
                              }}
                            />
                          </Box>

                          <Box>
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
                              Provide
                            </Typography>

                            <Select
                              displayEmpty
                              onChange={handleProvinceChange}
                              value={province}
                              inputProps={{
                                "aria-label": "Without label",
                              }}
                              sx={{
                                width: "356px",
                                height: "48px",
                                border: "1px solid #02000C",
                                borderRadius: "4px",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                textAlign: "left",
                                color: "#76757C",
                                margin: "4px 0px 0px 0px",
                                padding: "0px 12px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "none",
                                  },
                              }}
                            >
                              <MenuItem value="NS">NS</MenuItem>
                              <MenuItem value="NB">NB</MenuItem>
                              <MenuItem value="NL">NL</MenuItem>
                              <MenuItem value="PE">PE</MenuItem>
                            </Select>
                          </Box>

                          <Box>
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
                              City
                            </Typography>
                            <Input
                              disableUnderline
                              onChange={(e) => setCity(e.target.value)}
                              sx={{
                                width: "356px",
                                height: "48px",
                                border: "1px solid #02000C",
                                borderRadius: "4px",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                textAlign: "left",
                                color: "#76757C",
                                margin: "4px 0px 0px 0px",
                                padding: "0px 12px",
                              }}
                            />
                          </Box>

                          <Box>
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
                              Zip Code
                            </Typography>
                            <Input
                              disableUnderline
                              onChange={handleZipCodeChange}
                              inputProps={{ maxLength: 7 }}
                              sx={{
                                width: "356px",
                                height: "48px",
                                border: "1px solid #02000C",
                                borderRadius: "4px",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                textAlign: "left",
                                color: "#76757C",
                                margin: "4px 0px 0px 0px",
                                padding: "0px 12px",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    // 选择自提,自提信息
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        margin: "16px 0px 0px 0px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "266px",
                          height: "132px",
                          gap: "16px",
                          marginBottom: "32px",
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
                          Store address & hours
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
                          382 Yonge Street, Toronto
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
                          Mon - Fri, 10:00 am - 10:00 pm (EST) <br /> Sat - Sun,
                          10:00 am - 6:00pm (EST)
                        </Typography>
                      </Box>
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
                      {/* 输入名字 */}
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
                          onChange={(e) => setFullName(e.target.value)}
                          sx={{
                            width: "100%",
                            height: "48px",
                            border: "1px solid #02000C",
                            borderRadius: "4px",
                            margin: "4px 0px 0px 0px",
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
                      </Box>

                      {/* 输入邮箱 */}
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
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            width: "100%",
                            height: "48px",
                            border: "1px solid #02000C",
                            borderRadius: "4px",
                            margin: "4px 0px 0px 0px",
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

                      {/* 输入电话 */}
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
                          Phone number
                        </Typography>
                        <Input
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          sx={{
                            width: "100%",
                            height: "48px",
                            border: "1px solid #02000C",
                            borderRadius: "4px",
                            margin: "4px 0px 0px 0px",
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
                  )}
                  {/* 保存地址和联系信息 */}
                  <Button
                    onClick={handleCollapse}
                    sx={{
                      width: "206px",
                      height: "48px",
                      backgroundColor: "#02000C",
                      border: "1px solid #02000C",
                      borderRadius: "4px",
                      textTransform: "none",
                      margin: "32px 0px 0px 0px",
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
                </Collapse>
              ) : null}

              {/* 保存填写信息之后的展示 */}
              {!collapseOpen ? (
                <Collapse
                  in={!collapseOpen}
                  onClick={handleCollapse}
                  sx={{
                    width: "100%",
                    height: deliveryMethod === "delivery" ? "440px" : "416px",
                    backgroundColor: "#FFFFFF",
                    padding: "32px",
                  }}
                >
                  {deliveryMethod === "delivery" ? (
                    // 配送
                    <Box
                      sx={{
                        height: "376px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "24px",
                          color: "#02000C",
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ width: "22px", height: "22px" }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "26px",
                            fontWeight: 700,
                            lineHeight: "40px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Deliver to your address
                        </Typography>
                      </Box>

                      {/* 地址信息 */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "104px",
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
                          Address
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
                          {fullName} <br />
                          {address}, {province}, {city}, {zipCode}, Canada
                          <br />
                          {phoneNumber}
                        </Typography>
                      </Box>

                      {/* 联系信息 */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "56px",
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
                          Contact information
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
                          {email}
                        </Typography>
                      </Box>

                      {/* 抵达时间 */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "80px",
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
                          Estimated delivery
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
                          Get it by Sat, Jul 27
                          <br />
                          Shipping fee $30
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    // 自提
                    <Box
                      sx={{
                        height: "352px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "24px",
                          color: "#02000C",
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ width: "22px", height: "22px" }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "26px",
                            fontWeight: 700,
                            lineHeight: "40px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Pick up in store
                        </Typography>
                      </Box>

                      {/* 商店地址信息和营业时间 */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          height: "132px",
                          gap: "16px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 800,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Store address & hours
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
                          382 Yonge Street, Toronto
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
                          Mon - Fri, 10:00 am - 10:00 pm (EST) <br /> Sat - Sun,
                          10:00 am - 6:00pm (EST)
                        </Typography>
                      </Box>

                      {/* 联系信息 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          width: "100%",
                          height: "116px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 800,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#02000C",
                          }}
                        >
                          Contact information
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
                          {fullName} <br />
                          {email} <br />
                          {phoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Collapse>
              ) : null}

              {/* 付款卡号填写 */}
              <Collapse
                in={paymentOpen}
                sx={{
                  padding: "32px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DDDCDE",
                  margin: "32px 0px 32px 0px",
                }}
              >
                <Box sx={{ marginBottom: "32px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "26px",
                      fontWeight: 700,
                      lineHeight: "40px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  >
                    Payment
                  </Typography>
                </Box>
                {/* 选择支付方式 */}
                <FormControl>
                  <RadioGroup
                    value={paymentHook.paymentMethod}
                    onChange={(e) =>
                      paymentHook.handlePaymentMethodChange(e.target.value)
                    }
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Paypal */}
                    {/* <FormControlLabel
                      value="Paypal"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Typography>Paypal</Typography>
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                        </Box>
                      }
                    /> */}

                    {/* Apple Pay */}
                    <FormControlLabel
                      value="Apple Pay"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Typography>Apple Pay</Typography>
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                        </Box>
                      }
                    />

                    {/* Credit or Debit card */}
                    <FormControlLabel
                      value="Credit or Debit card"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Typography>Credit or Debit card</Typography>
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "42px",
                              height: "24px",
                              border: "1px solid #DDDCDE",
                              borderRadius: "4px",
                            }}
                          />
                          <Box
                            sx={{
                              width: "120px",
                              height: "20px",
                              border: "1px solid #DDDCDE",
                            }}
                          />
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {/* 信用卡付款信息填写 */}
                {paymentHook.paymentMethod === "Credit or Debit card" ? (
                  <Box sx={{ margin: "32px 0px 0px 0px" }}>
                    <Box
                      component="form"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        width: "100%",
                        height: "382px",
                      }}
                    >
                      {/* Name on Card */}
                      <Box>
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
                          Name on Card
                        </Typography>
                        <Input
                          sx={{
                            width: "100%",
                            height: "48px",
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
                      </Box>

                      {/* Card Number */}
                      <Box>
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
                          Card Number
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            height: "48px",
                            border: "1px solid #02000C",
                            borderRadius: "4px",
                          }}
                        >
                          <CardNumberElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  color: "#02000C",
                                  lineHeight: "48px",
                                  "::placeholder": {
                                    color: "transparent",
                                  },
                                },
                              },
                            }}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        {/* Expiration Date */}
                        <Box sx={{ width: "49%" }}>
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
                            Expiration Date
                          </Typography>
                          <Box
                            sx={{
                              width: "100%",
                              height: "48px",
                              border: "1px solid #02000C",
                              borderRadius: "4px",
                              padding: "0px 12px",
                            }}
                          >
                            <CardExpiryElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#02000C",
                                    lineHeight: "48px",
                                  },
                                },
                              }}
                            />
                          </Box>
                        </Box>

                        {/* CVV */}
                        <Box sx={{ width: "49%" }}>
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
                            CVV
                          </Typography>
                          <Box
                            sx={{
                              width: "100%",
                              height: "48px",
                              border: "1px solid #02000C",
                              borderRadius: "4px",
                              padding: "0px 12px",
                            }}
                          >
                            <CardCvcElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#02000C",
                                    lineHeight: "48px",
                                  },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Billing Address */}
                      <Box>
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
                          Billing Address
                        </Typography>
                        <Input
                          sx={{
                            width: "100%",
                            height: "48px",
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
                      </Box>

                      {/* 使用邮寄地址作为账单地址 */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <Checkbox
                          checked={checked}
                          onChange={handleCheck}
                          sx={{
                            width: "16px",
                            height: "16px",
                            padding: "0px",
                            color: "#02000C",
                            "&.Mui-checked": {
                              color: "#02000C",
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
                            color: "02000C",
                          }}
                        >
                          Use shipping address as billing address
                        </Typography>
                      </Box>
                    </Box>

                    {/* 保存付款信息 */}
                    <Button
                      onClick={() => {
                        console.log("Button clicked");
                        isAccessToken
                          ? paymentHook.handlePayment()
                          : paymentHook.handleGuestPayment();
                      }}
                      sx={{
                        width: "206px",
                        height: "48px",
                        backgroundColor: "#02000C",
                        border: "1px solid #02000C",
                        borderRadius: "4px",
                        textTransform: "none",
                        margin: "32px 0px 0px 0px",
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
                        Continue
                      </Typography>
                    </Button>
                  </Box>
                ) : null}

                {/* Apple Pay 按钮 */}
                {paymentHook.paymentMethod === "Apple Pay" ? (
                  <Box
                    sx={{
                      borderBottom: "1px solid #DDDCDE",
                    }}
                  >
                    {paymentHook.paymentRequest &&
                      paymentHook.paymentMethod === "Apple Pay" && (
                        <PaymentRequestButtonElement
                          options={{
                            paymentRequest: paymentHook.paymentRequest,
                          }}
                        />
                      )}
                  </Box>
                ) : null}
              </Collapse>
            </Box>

            {/* 右边订单信息 */}
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
