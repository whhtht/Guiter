import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Mui Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  IconButton,
  Slider,
  Collapse,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

import { product } from "../../../lists/classicalGuitar.list/page";
import Header from "../../layout/header/page";
import { useLocation } from "../../../hooks/useLocation.hook/page";
import LocationDrawer from "../../../drawer/location.drawer/page";
import PickUpDrawer from "../../../drawer/pickUp.drawer/page";

type Product = {
  id: number;
  name: string;
  condition: string;
  price: string;
  newprice: string;
  review: string;
  image: ImageItems[];
};
type ImageItems = { image: string; title: string };

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const products: Product = product.product1[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < products.image.length - 1 ? prevIndex + 1 : 0
    );
  };

  const [rewiew, setRewiew] = useState(false);
  const handleToggleReview = () => {
    setRewiew(!rewiew);
  };

  const [specifiation, setSpecifiation] = useState(false);
  const handleToggleSpecifiation = () => {
    setSpecifiation(!specifiation);
  };

  const [shippingPolice, setShippingPolice] = useState(false);
  const handleToggleShippingPolice = () => {
    setShippingPolice(!shippingPolice);
  };

  const [returnPolice, setReturnPolice] = useState(false);
  const handleToggleReturn = () => {
    setReturnPolice(!returnPolice);
  };

  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const locationFunctions = useLocation(setOpenLocation);

  return (
    <Box>
      <Header />
      <Box sx={{ margin: "18px 72px 0px 72px" }}>
        <Grid container>
          {/* Part 1 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "column",
                flexDirection: "row",
                margin: "0px 0px 18px 0px",
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Box
                  component={Link}
                  to="/home"
                  sx={{ textDecoration: "none" }}
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
                    Home
                  </Typography>
                </Box>
                <Box
                  component={Link}
                  to={`/home/${category}`}
                  sx={{ textDecoration: "none" }}
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
                    {category}
                  </Typography>
                </Box>
                <Box
                  component={Link}
                  to={`/home/${category}/${productId}`}
                  sx={{ textDecoration: "none" }}
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
                    {productId}
                  </Typography>
                </Box>
              </Breadcrumbs>
            </Box>
          </Grid>

          {/* Part 2 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "58%",
                  height: "180vh",
                  flexShrink: 0,
                }}
              >
                {/* Part 2.1 */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: "100%",
                      margin: "0px 0px 0px 0px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <ImageList
                        cols={1}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100% ",
                          height: "100%",
                        }}
                      >
                        {products.image.map((item, index) => (
                          <ImageListItem
                            key={item.image}
                            sx={{
                              width: "100% ",
                              height: "100%",
                              cursor: "pointer",
                            }}
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
                                border:
                                  selectedImageIndex === index
                                    ? "1px solid #02000C"
                                    : "none",
                                borderRadius: "8px",
                              }}
                            >
                              <Box
                                component="img"
                                src={`${item.image}?w=100&h=100&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                sx={{
                                  height: "100%",
                                }}
                              />
                            </Box>
                          </ImageListItem>
                        ))}
                      </ImageList>
                      <Box />
                    </Box>
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
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                      <Box
                        component="img"
                        src={products.image[selectedImageIndex].image}
                        alt={products.image[selectedImageIndex].title}
                      />
                      <IconButton
                        onClick={handleNextImage}
                        sx={{
                          position: "absolute",
                          top: "48%",
                          right: "16px",
                          backgroundColor: "white",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>

                {/* Part 2.2 */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "120px",
                      margin: "32px 0px 0px 0px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        textAlign: "left",
                        color: "#000000D9",
                        margin: "0px 0px 16px 0px",
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
                        padding: "20px 24px 20px 24px",
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
                        <PlayArrowIcon
                          fontSize="large"
                          sx={{ color: "#000000D9" }}
                        />
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
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "22px",
                              textAlign: "left",
                              color: "#000000D9",
                            }}
                          >
                            Gibson LC Century of Progress 1933 / Song name{" "}
                          </Typography>
                          <Typography variant="body1">00:35</Typography>
                        </Box>
                        <Slider
                          track="normal"
                          sx={{
                            border: "1px solid #000000",
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
                </Grid>

                {/* Part 2.3 */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {/* Review */}
                  {product.product1.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        width: "100%",
                        margin: "16px 0px 0px 0px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          Review from us
                        </Typography>
                        <IconButton
                          onClick={handleToggleReview}
                          sx={{
                            transform: rewiew
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                      </Box>
                      <Collapse
                        in={!rewiew}
                        collapsedSize={0}
                        sx={{
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: "100%",
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
                            {item.review}
                          </Typography>
                          <Typography
                            component={Link}
                            to={`/home/${category}`}
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "22px",
                              textAlign: "left",
                              color: "#02000C",
                              textTransform: "none",
                              margin: "16px 0px 16px 0px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            View more
                          </Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}

                  {product.product1.map((item) => (
                    <Box key={item.id}>
                      {/* Specifiation */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          Specifications
                        </Typography>
                        <IconButton
                          onClick={handleToggleSpecifiation}
                          sx={{
                            transform: specifiation
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                      </Box>
                      <Collapse
                        in={specifiation}
                        collapsedSize={0}
                        sx={{
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: "100%",
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
                              backgroundColor: "#EFEFEF",
                              width: "100%",
                              height: "200px",
                            }}
                          ></Typography>
                          <Typography
                            component={Link}
                            to={`/home/${category}`}
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "22px",
                              textAlign: "left",
                              color: "#02000C",
                              textTransform: "none",
                              margin: "16px 0px 16px 0px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            View more
                          </Typography>
                        </Box>
                      </Collapse>

                      {/* Shipping police */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          Shipping Police
                        </Typography>
                        <IconButton
                          onClick={handleToggleShippingPolice}
                          sx={{
                            transform: shippingPolice
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                      </Box>
                      <Collapse
                        in={shippingPolice}
                        collapsedSize={0}
                        sx={{
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: "100%",
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
                              backgroundColor: "#EFEFEF",
                              width: "100%",
                              height: "200px",
                            }}
                          ></Typography>
                          <Typography
                            component={Link}
                            to={`/home/${category}`}
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "22px",
                              textAlign: "left",
                              color: "#02000C",
                              textTransform: "none",
                              margin: "16px 0px 16px 0px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            View more
                          </Typography>
                        </Box>
                      </Collapse>

                      {/* Return police */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          Return Police
                        </Typography>
                        <IconButton
                          onClick={handleToggleReturn}
                          sx={{
                            transform: returnPolice
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                      </Box>
                      <Collapse
                        in={returnPolice}
                        collapsedSize={0}
                        sx={{
                          borderBottom: "1px solid #DDDCDE",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: "100%",
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
                              backgroundColor: "#EFEFEF",
                              width: "100%",
                              height: "200px",
                            }}
                          ></Typography>
                          <Typography
                            component={Link}
                            to={`/home/${category}`}
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "22px",
                              textAlign: "left",
                              color: "#02000C",
                              textTransform: "none",
                              margin: "16px 0px 16px 0px",
                              padding: "0px 0px 0px 0px",
                            }}
                          >
                            View more
                          </Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "510px",
                  height: "100vh",
                }}
              >
                {/* Part 2.4 */}
                {product.product1.map((item) => (
                  <Box key={item.id}>
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
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                          textAlign: "left",
                          color: "76757C",
                        }}
                      >
                        Condition: {item.condition}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                        gap: "20px",
                        margin: "16px 0px 16px 0px",
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
                        {item.price}
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
                        New guitar: {item.newprice}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {/* Part 2.5 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "25px",
                    margin: "16px 0px 16px 0px",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
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
                    sx={{
                      width: "100%",
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

                {/* Part 2.6 */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    margin: "16px 0px 16px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "20px",
                      fontWeight: 500,
                      lineHeight: "28px",
                      textAlign: "left",
                      color: "#000000D9",
                    }}
                  >
                    How to get it
                  </Typography>

                  <Box>
                    <Button
                      disableFocusRipple
                      sx={{
                        width: "100%",
                        height: "102px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        borderRadius: "8px",
                        border: "1px solid #DDDCDE",
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
                        <ShoppingCartIcon />
                        <Typography sx={{}}>
                          Deliver to Deliver to{" "}
                          {locationFunctions.storedZipCode
                            ? locationFunctions.storedZipCode
                            : " M5G 2G4 "}
                        </Typography>
                        <Typography>
                          Free Shippinig, Get it by Sat, Jul 27
                        </Typography>
                      </Box>
                    </Button>
                    <LocationDrawer
                      open={openLocation}
                      setOpen={setOpenLocation}
                    />
                    <Button
                      sx={{
                        width: "100%",
                        height: "56px",
                        border: "1px solid #DDDCDE",
                      }}
                      variant="text"
                      startIcon={<StoreIcon />}
                      disableFocusRipple
                      onClick={() => {
                        setOpenPickUp(true);
                      }}
                    ></Button>
                    <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail;
