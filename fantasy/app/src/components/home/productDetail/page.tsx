import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../../api/product/page";

import { useCart } from "../../../hooks/useCart.hook/hook/page";
import { newArrivals } from "../../../lists/newArrivals.list/page";
import LocationDrawer from "../drawer/location.drawer/page";
import PickUpDrawer from "../drawer/pickUp.drawer/page";
import Header from "../layout/header/page";
import Footer from "../layout/footer/page";

import { useLocation } from "../../../hooks/useLocation.hook/page";
import { useProduct } from "../../../hooks/useProduct.hook/hook/page";
import { Product } from "../../../hooks/useProduct.hook/context/page";

// Mui Components
import {
  Box,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
  Slider,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const ProductDetail: React.FC = () => {
  const { productname } = useParams();
  const cartHook = useCart();
  const { images } = useProduct();

  // 选择的图片索引
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [detail, setDetail] = useState<Product | null>(null);

  // 获取产品信息
  useEffect(() => {
    if (productname) {
      const handleGetProduct = async () => {
        try {
          const product = await getProduct(productname);
          setDetail(product);
        } catch (error) {
          console.error("获取产品信息时出错:", error);
        }
      };
      handleGetProduct();
    }
  }, [productname]);

  // 是否查看全部图片
  const [viewAll, setViewAll] = useState(false);
  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  // 下一张图片
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
  };

  // 是否查看评论
  const [review, setRewiew] = useState(false);
  const handleToggleReview = () => {
    setRewiew(!review);
  };

  // 是否查看规格
  const [specifiationOpen, setSpecifiationOpen] = useState(false);
  const handleToggleSpecifiation = () => {
    setSpecifiationOpen(!specifiationOpen);
  };

  // 是否查看配送政策
  const [shippingPolice, setShippingPolice] = useState(false);
  const handleToggleShippingPolice = () => {
    setShippingPolice(!shippingPolice);
  };

  // 是否查看退货政策
  const [returnPolice, setReturnPolice] = useState(false);
  const handleToggleReturn = () => {
    setReturnPolice(!returnPolice);
  };

  // 是否查看位置,取货
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const locationFunctions = useLocation(setOpenLocation);

  // 猜你喜欢
  const useItems = (items: string[], itemsToShow = 5) => {
    const [index, setIndex] = useState(0);
    const handlePrev = () => {
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const handleNext = () => {
      setIndex((prevIndex) =>
        prevIndex < items.length - itemsToShow ? prevIndex + 1 : prevIndex
      );
    };
    return {
      index,
      itemsToShow,
      handlePrev,
      handleNext,
    };
  };
  // 猜你喜欢
  const mayLike = useItems([]);

  return (
    <Box>
      <Header />

      <Box sx={{ margin: "18px 72px 0px 72px" }}>
        {/* 物品信息*/}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* 物品图片展示 */}
          <Box
            sx={{
              width: "58%",
              flexShrink: 0,
              margin: "20px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Box sx={{ position: "relative", overflowY: "auto" }}>
                <ImageList
                  cols={1}
                  sx={{
                    display: "flex",
                    justifyContent:
                      images.length >= 5 ? "space-between" : "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100% ",
                    height: "630px",
                    zIndex: 0,
                  }}
                >
                  {/* 展示前五张图片 */}
                  {images.slice(0, 5).map((_, index) => (
                    <ImageListItem
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "115px",
                          height: "115px",
                          overflow: "hidden",
                          backgroundColor: "#EFEFEF",
                          borderRadius: "8px",
                          margin:
                            images.length >= 5
                              ? "0px 0px 0px 0px"
                              : "0px 0px 9.7px 0px",
                          border:
                            selectedImageIndex === index
                              ? "1px solid #02000C"
                              : "none",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            width: "115px",
                            height: "115px",
                          }}
                        />
                      </Box>
                    </ImageListItem>
                  ))}

                  {/* 打开展示全部图片 */}
                  {images.length >= 5 && (
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "115px",
                        height: "115px",
                        bottom: "16px",
                        backgroundColor: "#EFEFEF",
                        borderRadius: "8px",
                        opacity: 0.7,
                        cursor: "pointer",
                        textDecoration: "underline",
                        zIndex: 1,
                      }}
                      onClick={() => {
                        handleViewAll();
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
                        View All
                      </Typography>
                    </Box>
                  )}
                </ImageList>
              </Box>

              {/* 全部图片展示 */}
              <Dialog
                open={viewAll}
                onClose={handleViewAll}
                maxWidth={false}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "1290px",
                  height: "764px",
                  margin: "auto",
                  borderRadius: "8px",
                }}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "16px 25px 0px 35px",
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
                    All Photos
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleViewAll}
                    sx={{
                      color: "#02000C",
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  {images && (
                    <ImageList cols={3}>
                      {images.map((index) => (
                        <ImageListItem
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            margin: "12px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "395px",
                              height: "395px",
                              overflow: "hidden",
                              backgroundColor: "#EFEFEF",
                              borderRadius: "8px",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{ width: "395px", height: "395px" }}
                            />
                          </Box>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                </DialogContent>
              </Dialog>

              {/* 大图片展示 */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  width: "630px",
                  height: "630px",
                  backgroundColor: "#EFEFEF",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    color: "#02000C",
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <Box
                  component="img"
                  src={images.slice(0, 5)[selectedImageIndex]}
                />
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    top: "48%",
                    right: "16px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    color: "#02000C",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>

            {/* 播放器 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "120px",
                margin: "15px 0px 0px 0px",
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
                  margin: "0px 0px 10px 0px",
                }}
              >
                Listen to the sound
              </Typography>

              {/* 音乐播放器 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "77px",
                  borderRadius: "8px",
                  backgroundColor: "#FFEACE",
                  padding: "15px 24px 15px 24px",
                }}
              >
                <IconButton
                  sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginRight: "16px",
                  }}
                >
                  <PlayArrowIcon fontSize="large" sx={{ color: "#02000C" }} />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    >
                      Gibson LC Century of Progress 1933 / Song name{" "}
                    </Typography>
                    <Typography variant="body1">00:35</Typography>
                  </Box>
                  <Slider
                    track="normal"
                    sx={{
                      padding: "0px 0px 0px 0px",
                      //滑块
                      "& .MuiSlider-thumb": {
                        width: "10px",
                        height: "5px",
                        backgroundColor: "#000000",
                        borderRadius: "20px",
                        boxShadow: "none",
                        padding: "0px",
                        margin: "0px 0px 0px 4px",
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: "none",
                        },
                      },
                      //滑轨
                      "& .MuiSlider-rail": {
                        color: "#FFFFFF",
                        height: "4px",
                        opacity: 1,
                        boxShadow: "none",
                      },
                      "& .MuiSlider-track": {
                        color: "#ff0000", // 滑过后的进度条颜色变为红色
                        height: 4, // 确保 track 的高度与 rail 一致
                      },
                      "& .MuiSlider-root": {
                        border: "none", // 移除滑块的边框
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* 物品详细信息,  */}
            {/* Review */}
            <Box
              sx={{
                padding: "0px 0px 24px 0px",
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0px",
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
                  Review from us
                </Typography>
                <IconButton
                  onClick={handleToggleReview}
                  sx={{
                    transform: review ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <ExpandMoreIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitLineClamp: review ? "none" : 3,
                }}
              >
                <Box
                  component={"ul"}
                  sx={{
                    listStyleType: "disc",
                    padding: "0px 0px 0px 20px",
                    margin: "0px",
                  }}
                >
                  {images.map((list, index) => (
                    <Box
                      component={"li"}
                      key={index}
                      sx={{
                        display: "list-item",
                        alignItems: "center",
                        margin: "0px 0px 5px 0px",
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
                        {list}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "inline-block",
                  textTransform: "none",
                  textDecoration: "underline",
                  margin: "19px 0px 0px 0px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  onClick={handleToggleReview}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#02000C",
                  }}
                >
                  {review ? "View less" : "View more"}
                </Typography>
              </Box>
            </Box>

            {/* Specifiation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0px",
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
                Specifications
              </Typography>
              <IconButton
                onClick={handleToggleSpecifiation}
                sx={{
                  transform: specifiationOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ExpandMoreIcon fontSize="large" />
              </IconButton>
            </Box>
            <Collapse
              in={specifiationOpen}
              collapsedSize={0}
              sx={{ borderBottom: "1px solid #DDDCDE" }}
            >
              <Box sx={{ padding: "0px 0px 15px 0px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "0px 0px 15px 0px",
                  }}
                >
                  <Box sx={{ width: "200px" }}>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        textAlign: "left",
                        color: "#000000",
                      }}
                    >
                      hello
                    </Typography>
                  </Box>
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
                    hi
                  </Typography>
                </Box>
              </Box>
            </Collapse>

            {/* Shipping police */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0px",
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
                Shipping Police
              </Typography>
              <IconButton
                onClick={handleToggleShippingPolice}
                sx={{
                  transform: shippingPolice ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ExpandMoreIcon fontSize="large" />
              </IconButton>
            </Box>
            <Collapse
              in={shippingPolice}
              collapsedSize={0}
              sx={{ borderBottom: "1px solid #DDDCDE" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography>Shipping Police is here</Typography>
              </Box>
            </Collapse>

            {/* Return police */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0px",
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
                Return Police
              </Typography>
              <IconButton
                onClick={handleToggleReturn}
                sx={{
                  transform: returnPolice ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ExpandMoreIcon fontSize="large" />
              </IconButton>
            </Box>
            <Collapse
              in={returnPolice}
              collapsedSize={0}
              sx={{ borderBottom: "1px solid #DDDCDE" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  backgroundColor: "#EFEFEF",
                  width: "100%",
                  height: "200px",
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
                  Return Police is here
                </Typography>
              </Box>
            </Collapse>
          </Box>

          {/* 物品信息显示卡 */}
          <Box
            sx={{
              position: "sticky",
              top: "0px",
              display: "flex",
              flexDirection: "column",
              width: "510px",
              height: "100%",
              padding: "20px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
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
                {detail?.name}
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
                Condition: {detail?.condition}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: "20px",
                margin: "16px 0px",
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
                ${detail?.price}
              </Typography>
            </Box>

            {/* 直接购买或者添加到购物车 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "25px",
                margin: "16px 0px 0px 0px",
              }}
            >
              <Button
                component={Link}
                to={`/cart`}
                onClick={() =>
                  cartHook.addToCart({
                    quantity: 1,
                    cart: { type: "cart" },
                    product: {
                      name: detail?.name || "",
                      price: detail?.price ? String(detail.price) : "",
                      condition: detail?.condition || "",
                    },
                  })
                }
                sx={{
                  width: "502px",
                  height: "48px",
                  border: "1px solid #02000C",
                  borderRadius: "4px",
                  backgroundColor: "#02000C",
                  boxShadow: "0px 2px 0px 0px #0000000B",
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
                  Buy It Now
                </Typography>
              </Button>

              <Button
                onClick={() =>
                  cartHook.addToCart({
                    quantity: 1,
                    cart: { type: "cart" },
                    product: {
                      name: detail?.name || "",
                      price: detail?.price ? String(detail.price) : "",
                      condition: detail?.condition || "",
                    },
                  })
                }
                sx={{
                  width: "502px",
                  height: "48px",
                  border: "1px solid #76757C",
                  borderRadius: "4px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 2px 0px 0px #0000000B",
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
                  Add to Cart
                </Typography>
              </Button>
            </Box>

            {/* 送货或者自提 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                margin: "30px 0px 0px 0px",
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
                How to get it
              </Typography>
              <Box>
                <Button
                  disableFocusRipple
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "502px",
                    height: "102px",
                    color: "#000000D9",
                    textTransform: "none",
                    border: "1px solid #DDDCDE",
                    borderRadius: "0px",
                    padding: "16px 24px",
                  }}
                  onClick={() => {
                    setOpenLocation(true);
                  }}
                >
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
                        gap: "10px",
                        margin: "0px 0px 10px 0px",
                        color: "#02000C",
                      }}
                    >
                      <ShoppingCartIcon fontSize="small" />
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                        }}
                      >
                        Deliver to Deliver to{" "}
                        {locationFunctions.storedZipCode
                          ? locationFunctions.storedZipCode
                          : " M5G 2G4 "}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        color: "#76757C",
                        margin: "0px 0px 0px 30px",
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
                        Free Shippinig, Get it by Sat, Jul 27
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIosIcon fontSize="medium" />
                </Button>
                <LocationDrawer open={openLocation} setOpen={setOpenLocation} />
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "502px",
                    height: "56px",
                    color: "#000000D9",
                    textTransform: "none",
                    border: "1px solid #DDDCDE",
                    borderRadius: "0px",
                    padding: "16px 24px",
                  }}
                  variant="text"
                  disableFocusRipple
                  onClick={() => {
                    setOpenPickUp(true);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                      color: "#02000C",
                    }}
                  >
                    <StoreIcon fontSize="small" />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                      }}
                    >
                      Pick up at Toronto Downtown
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon fontSize="medium" />
                </Button>
                <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 猜你喜欢 */}
        <Box sx={{ margin: "48px 0px 0px 0px" }}>
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
            You might also like
          </Typography>
          <Box
            sx={{
              position: "relative",
              margin: "20px 0px 0px 0px",
            }}
          >
            <IconButton
              onClick={mayLike.handlePrev}
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                left: "-19px",
                top: "38%",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-50%)",
                zIndex: 2,
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <ArrowBackIos
                sx={{
                  color: "#02000C",
                  fontSize: "20px",
                  transform: "translateX(20%)",
                }}
              />
            </IconButton>
            <IconButton
              onClick={mayLike.handleNext}
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                right: "-17px",
                top: "38%",
                PointerEvents: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-50%)",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <ArrowForwardIos
                sx={{
                  color: "#02000C",
                  fontSize: "20px",
                  transform: "translateX(10%)",
                }}
              />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexdirection: "row",
                overflow: "hidden",
              }}
            >
              {newArrivals
                .slice(mayLike.index, mayLike.index + mayLike.itemsToShow)
                .map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "calc(100% / 5)",
                    }}
                  >
                    <Box component={Link} to={item.Link}>
                      <Box
                        component="img"
                        src={item.image}
                        sx={{
                          width: "250px",
                          height: "250px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "250px",
                      }}
                    >
                      <Typography
                        component={Link}
                        to={item.Link}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                          width: "250px",
                          height: "48px",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          textDecoration: "none",
                          color: "#02000C",
                          overflow: "hidden",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        component={Link}
                        to={item.Link}
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                          textAlign: "left",
                          color: "#76757C",
                          textDecoration: "none",
                        }}
                      >
                        Condition: {item.condition}
                      </Typography>
                      <Typography
                        component={Link}
                        to={item.Link}
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "20px",
                          fontWeight: 500,
                          lineHeight: "28px",
                          textAlign: "left",
                          color: "#000000D9",
                          textDecoration: "none",
                        }}
                      >
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
