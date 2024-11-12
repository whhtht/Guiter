import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../layout/header/page";
import Footer from "../layout/footer/page";
import { useCart } from "../../../hooks/useCart.hook/page";
import { useLocation } from "../../../hooks/useLocation.hook/page";
import LocationDrawer from "../drawer/location.drawer/page";
import PickUpDrawer from "../drawer/pickUp.drawer/page";

import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

const Cart: React.FC = () => {
  const cartHook = useCart();

  // 初始化时从 localStorage 获取之前保存的选项
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

  // 计算总价
  const hst = 0.15;
  const hstTotal = (
    Number(cartHook.accessToken ? cartHook.cartTotal : cartHook.localTotal) *
    hst
  ).toFixed(2);
  const shippingFee =
    Number(cartHook.accessToken ? cartHook.cartTotal : cartHook.localTotal) > 0
      ? 30
      : 0;
  const itemSubtotal = cartHook.accessToken
    ? cartHook.cartTotal
    : cartHook.localTotal;
  const total = (Number(itemSubtotal) + Number(hstTotal) + shippingFee).toFixed(
    2
  );

  // 保存商品展开折叠
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  // 弹窗显示保存商品
  const [snackbars, setSnackbars] = useState<{ name: string; id: string }[]>(
    []
  );
  // 处理保存操作并显示对应的 Snackbar
  const handleSaveForLater = (name: string, id: string) => {
    setSnackbars((prevSnackbars) => [...prevSnackbars, { name: name, id: id }]);
  };
  // 关闭指定的 Snackbar
  const handleCloseSnackbar = () => {
    setSnackbars((prevSnackbars) => prevSnackbars.slice(1));
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          margin: "50px 72px",
        }}
      >
        {/* 购物车标题 */}
        <Box
          sx={{
            margin: "0px 0px 32px 0px",
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
            My Cart (
            {cartHook.accessToken
              ? cartHook.cartItemCount
              : cartHook.localCartCount}
            )
          </Typography>
        </Box>

        {/* 购物车主体部分 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* 购物车商品信息 */}
          <Box
            sx={{
              position: "relative",
              width: "58%",
            }}
          >
            {/* 选择配送方式 */}
            <RadioGroup
              value={selectedOption}
              onChange={handleChange}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              {/* Deliverty */}
              <FormControlLabel
                value="delivery"
                control={
                  <Radio
                    sx={{
                      width: "22px",
                      height: "22px",
                      color: "#02000C",
                      "&.Mui-checked": {
                        color: "#02000C",
                      },
                      margin: "8px 8px 0px 8px",
                    }}
                  />
                }
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "365px",
                  height: "102px",
                  border:
                    selectedOption === "delivery"
                      ? "1px solid #02000C"
                      : "1px solid #DDDCDE",
                  borderRadius: "4px",
                  cursor: "default",
                  padding: "10px 0px 0px 0px",
                  margin: "0px auto 0px 0px",
                }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        margin: "8px 0px 0px 5px",
                      }}
                    >
                      <LocalShippingIcon
                        sx={{
                          width: "22px",
                          height: "22px",
                          margin: "0px 15px 0px 0px",
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
                          marginLeft: "8px",
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
                    <Box sx={{ margin: "5px 0px 0px 43px" }}>
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
                        $30 Shipping, Get it by Sat, Jul 27
                      </Typography>
                    </Box>
                  </Box>
                }
              />

              {/* Pickup */}
              <FormControlLabel
                value="pickup"
                control={
                  <Radio
                    sx={{
                      width: "22px",
                      height: "22px",
                      color: "#02000C",
                      "&.Mui-checked": {
                        color: "#02000C",
                      },
                      margin: "8px 8px 0px 8px",
                    }}
                  />
                }
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "365px",
                  height: "102px",
                  border:
                    selectedOption === "pickup"
                      ? "1px solid #02000C"
                      : "1px solid #DDDCDE",
                  borderRadius: "4px",
                  cursor: "default",
                  padding: "10px 0px 0px 0px",
                  margin: "0px 0px 0px auto",
                }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        margin: "8px 0px 0px 5px",
                      }}
                    >
                      <StoreIcon
                        sx={{
                          width: "22px",
                          height: "22px",
                          margin: "0px 15px 0px 0px",
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
                          marginLeft: "8px",
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
                  </Box>
                }
              />
              <LocationDrawer open={openLocation} setOpen={setOpenLocation} />
              <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
            </RadioGroup>

            {/* // 购物车商品列表 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 在购物车的物品 */}
              {cartHook.accessToken
                ? cartHook.cartItems.map((item, index) => (
                    // 登录之后的购物车
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "280px",
                        padding: "40px 0px 40px 0px",
                        borderBottom: "1px solid #DDDCDE",
                      }}
                    >
                      {/* 图片 */}
                      <Box
                        sx={{
                          width: "250px",
                          height: "200px",
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
                      {/* 购物车商品展示 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                        }}
                      >
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
                              width: "400px",
                              height: "145px",
                              margin: "0px 0px 0px 20px",
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
                            $ {Number(item.product.price).toFixed(2)}
                          </Typography>
                        </Box>
                        {/* 移除商品和保存商品 */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row",
                            textDecoration: "underline",
                            gap: "30px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleSaveForLater(
                                item.product.name,
                                String(item.id)
                              );
                              cartHook.cartStatus(
                                item.product.name,
                                item.cart.type
                              );
                            }}
                            sx={{
                              color: "#02000C",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "22px",
                                textAlign: "left",
                              }}
                            >
                              Save for later
                            </Typography>
                          </Button>
                          <Button
                            onClick={() => cartHook.removeFromCart(item)}
                            sx={{
                              color: "#02000C",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <DeleteOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "22px",
                                textAlign: "left",
                              }}
                            >
                              Remove
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))
                : cartHook.localCartItems.map((item, index) => (
                    // 未登录的购物车
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "280px",
                        padding: "40px 0px 40px 0px",
                        borderBottom: "1px solid #DDDCDE",
                      }}
                    >
                      {/* 图片 */}
                      <Box
                        sx={{
                          width: "250px",
                          height: "200px",
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
                      {/* 购物车商品展示 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                        }}
                      >
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
                              width: "400px",
                              height: "145px",
                              margin: "0px 0px 0px 20px",
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
                            $ {Number(item.product.price).toFixed(2)}
                          </Typography>
                        </Box>
                        {/* 移除商品和保存商品 */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row",
                            textDecoration: "underline",
                            gap: "30px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleSaveForLater(
                                item.product.name,
                                String(item.id)
                              );
                              cartHook.cartStatus(
                                item.product.name,
                                item.cart.type
                              );
                            }}
                            sx={{
                              color: "#02000C",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "22px",
                                textAlign: "left",
                              }}
                            >
                              Save for later
                            </Typography>
                          </Button>
                          <Button
                            onClick={() => cartHook.removeFromCart(item)}
                            sx={{
                              color: "#02000C",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <DeleteOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "22px",
                                textAlign: "left",
                              }}
                            >
                              Remove
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}

              {/* 保存商品的 Snackbar */}
              {snackbars.map((item, index) => (
                <Snackbar
                  key={index}
                  open={true}
                  onClose={(_, reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    handleCloseSnackbar();
                  }}
                  autoHideDuration={2000}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "473px",
                    height: "96px",
                    backgroundColor: "#02000C",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      color: "#FFFFFF",
                    }}
                  >
                    <Box sx={{ width: "385px", height: "48px" }}>
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#FFFFFF",
                        }}
                      >
                        {item.name} saved for later
                      </Typography>
                    </Box>
                    <ClearIcon
                      onClick={() => handleCloseSnackbar()}
                      fontSize="large"
                    />
                  </Box>
                </Snackbar>
              ))}

              {/* 保存商品 */}
              {(cartHook.saveItems.length > 0 ||
                cartHook.localSaveItems.length > 0) && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      padding: "40px 0px 40px 0px",
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
                      Saved for Later (
                      {cartHook.accessToken
                        ? cartHook.saveItemCount
                        : cartHook.localSaveCount}
                      )
                    </Typography>
                    <ExpandMoreIcon
                      fontSize="large"
                      onClick={handleCollapse}
                      sx={{
                        color: "#02000C",
                        transition: "transform 0.3s",
                        transform: collapse ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </Box>
                  <Collapse
                    in={collapse}
                    collapsedSize={0}
                    sx={{
                      borderBottom: "1px solid #DDDCDE",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "36px",
                        margin: "0px 0px 40px 0px",
                      }}
                    >
                      {/* 保存商品信息 */}
                      {cartHook.accessToken
                        ? cartHook.saveItems.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "232px",
                                height: "408px",
                                border: "1px solid #DDDCDE",
                                borderRadius: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexShrink: 0,
                                  width: "200px",
                                  height: "200px",
                                  backgroundColor: "#EFEFEF",
                                  borderRadius: "8px",
                                  margin: "16px 0px 12px 0px",
                                }}
                              ></Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "200px",
                                  gap: "4px",
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
                                  $ {item.product.price}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-end",
                                  width: "200px",
                                  height: "100%",
                                  textDecoration: "underline",
                                  margin: "0px 0px 16px 0px",
                                  gap: "24px",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    cartHook.cartStatus(
                                      item.product.name,
                                      item.cart.type
                                    );
                                  }}
                                  sx={{
                                    color: "#02000C",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                    padding: "0px 0px 0px 0px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily: "Roboto",
                                      fontSize: "14px",
                                      fontWeight: 400,
                                      lineHeight: "22px",
                                      textAlign: "right",
                                      color: "#02000C",
                                    }}
                                  >
                                    Add to cart
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => cartHook.removeFromSave(item)}
                                  sx={{
                                    color: "#02000C",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                    padding: "0px 0px 0px 0px",
                                  }}
                                >
                                  <DeleteOutlineIcon
                                    sx={{
                                      width: "22px",
                                      height: "22px",
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
                                    Remove
                                  </Typography>
                                </Button>
                              </Box>
                            </Box>
                          ))
                        : cartHook.localSaveItems.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "232px",
                                height: "408px",
                                border: "1px solid #DDDCDE",
                                borderRadius: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexShrink: 0,
                                  width: "200px",
                                  height: "200px",
                                  backgroundColor: "#EFEFEF",
                                  borderRadius: "8px",
                                  margin: "16px 0px 12px 0px",
                                }}
                              ></Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "200px",
                                  gap: "4px",
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
                                  $ {item.product.price}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-end",
                                  width: "200px",
                                  height: "100%",
                                  textDecoration: "underline",
                                  margin: "0px 0px 16px 0px",
                                  gap: "24px",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    cartHook.cartStatus(
                                      item.product.name,
                                      item.cart.type
                                    );
                                  }}
                                  sx={{
                                    color: "#02000C",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                    padding: "0px 0px 0px 0px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily: "Roboto",
                                      fontSize: "14px",
                                      fontWeight: 400,
                                      lineHeight: "22px",
                                      textAlign: "right",
                                      color: "#02000C",
                                    }}
                                  >
                                    Add to cart
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => cartHook.removeFromSave(item)}
                                  sx={{
                                    color: "#02000C",
                                    textTransform: "none",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                    padding: "0px 0px 0px 0px",
                                  }}
                                >
                                  <DeleteOutlineIcon
                                    sx={{
                                      width: "22px",
                                      height: "22px",
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
                                    Remove
                                  </Typography>
                                </Button>
                              </Box>
                            </Box>
                          ))}
                    </Box>
                  </Collapse>
                </Box>
              )}
            </Box>
          </Box>
          {/* 第一部分 右边 */}
          <Box
            sx={{
              width: "32%",
            }}
          >
            <Box
              sx={{
                margin: "0px 0px 16px 0px",
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
            </Box>
            <Box
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "0px 0px 8px 0px",
                }}
              >
                <Typography>
                  Item subtotal(
                  {cartHook.accessToken
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
                  alignItems: "center",
                  margin: "0px 0px 8px 0px",
                }}
              >
                <Typography>Shipping Fee</Typography>
                <Typography>$ {shippingFee.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "0px 0px 16px 0px",
                }}
              >
                <Typography>HST</Typography>
                <Typography>$ {hstTotal}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                margin: "16px 0px 16px 0px",
              }}
            >
              <Typography>Total</Typography>
              <Typography>$ {total} </Typography>
            </Box>
            <Button
              component={Link}
              to="/checkout"
              sx={{
                width: "100%",
                height: "48px",
                backgroundColor: "#02000C",
                textTransform: "none",
                borderRadius: "4px",
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
                Proceed to Checkout
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                margin: "16px 55px 0px 55px",
              }}
            >
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Cart;
