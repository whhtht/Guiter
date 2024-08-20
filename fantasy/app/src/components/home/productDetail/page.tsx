import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHome } from "../../../hooks/useHome.hook/page";

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

import { product } from "../../../lists/classicalGuitar.list/page";
import Header from "../../layout/header/page";
import { useLocation } from "../../../hooks/useLocation.hook/page";
import LocationDrawer from "../../../drawer/location.drawer/page";
import PickUpDrawer from "../../../drawer/pickUp.drawer/page";
import { newArrivals } from "../../../lists/newArrivals.list/page";
import Footer from "../../layout/footer/page";

import * as styles from "../../../styles/productDetail.style/page";

type Product = {
  id: number;
  name: string;
  condition: string;
  price: string;
  newprice: string;
  review: { main: string; list: string[] };
  image: ImageItems[];
};
type ImageItems = { image: string; title: string };

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const products: Product = product.classicalGuitar[0];
  const specifications = product.specification[0].list;
  const labels = product.specification[0].label;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const startIndex = Math.max(0, selectedImageIndex - 4);
  // const endIndex = Math.min(products.image.length, startIndex + 5);

  const [viewAll, setViewAll] = useState(false);
  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
  };

  const [review, setRewiew] = useState(false);
  const handleToggleReview = () => {
    setRewiew(!review);
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

  const functions = useHome();

  return (
    <Box>
      <Header />
      <Box sx={styles.detailstyles.detailFrame}>
        <Grid container>
          {/* Part 1 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={styles.detailstyles.breadcrumbFrame}>
              <Breadcrumbs aria-label="breadcrumb">
                <Box
                  component={Link}
                  to="/home"
                  sx={styles.detailstyles.textdecoration}
                >
                  <Typography
                    variant="body1"
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
                  sx={styles.detailstyles.textdecoration}
                >
                  <Typography
                    variant="body1"
                    sx={styles.detailstyles.roboto_14px_76757C}
                  >
                    {category}
                  </Typography>
                </Box>
                <Box
                  component={Link}
                  to={`/home/${category}/${productId}`}
                  sx={styles.detailstyles.textdecoration}
                >
                  <Typography
                    variant="body1"
                    sx={styles.detailstyles.roboto_14px_02000C}
                  >
                    {productId}
                  </Typography>
                </Box>
              </Breadcrumbs>
            </Box>
          </Grid>

          {/* Part 2 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box>
              <Box sx={styles.detailstyles.mainFrame}>
                <Box sx={styles.detailstyles.main_left_frame}>
                  {/* Part 2.1 */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={styles.detailstyles.picture_list_frame}>
                      <Box sx={styles.detailstyles.image_list_frame}>
                        <ImageList cols={1} sx={styles.detailstyles.imageList}>
                          {products.image.slice(0, 5).map((item, index) => (
                            <ImageListItem
                              key={item.image}
                              onClick={() => setSelectedImageIndex(index)}
                            >
                              <Box
                                sx={{
                                  ...styles.detailstyles.image_list_background,
                                  border:
                                    selectedImageIndex === index
                                      ? "1px solid #02000C"
                                      : "none",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.title}
                                  loading="lazy"
                                  sx={styles.detailstyles.imageItem}
                                />
                              </Box>
                            </ImageListItem>
                          ))}
                          {products.image.length > 5 && (
                            <Box
                              sx={styles.detailstyles.viewAll}
                              onClick={() => {
                                handleViewAll();
                              }}
                            >
                              <Typography
                                sx={styles.detailstyles.roboto_14px_02000C}
                              >
                                View All
                              </Typography>
                            </Box>
                          )}
                        </ImageList>
                      </Box>
                      <Dialog
                        open={viewAll}
                        onClose={handleViewAll}
                        maxWidth={false}
                        sx={styles.detailstyles.dialogFrame}
                      >
                        <DialogTitle sx={styles.detailstyles.dialogTitle}>
                          <Typography
                            sx={styles.detailstyles.roboto_20px_000000D9}
                          >
                            All Photos
                          </Typography>
                          <IconButton
                            aria-label="close"
                            onClick={handleViewAll}
                            sx={styles.detailstyles.iconColor}
                          >
                            <CloseIcon fontSize="large" />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          <ImageList cols={3}>
                            {products.image.map((item) => (
                              <ImageListItem
                                key={item.image}
                                sx={styles.detailstyles.dialog_image_list_frame}
                              >
                                <Box
                                  sx={
                                    styles.detailstyles
                                      .dialog_image_list_background
                                  }
                                >
                                  <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    sx={styles.detailstyles.imageItem}
                                  />
                                </Box>
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </DialogContent>
                      </Dialog>
                      <Box sx={styles.detailstyles.image_show_frame}>
                        <IconButton sx={styles.detailstyles.favoriteIcon}>
                          <FavoriteBorderIcon />
                        </IconButton>
                        <Box
                          component="img"
                          src={
                            products.image.slice(0, 5)[selectedImageIndex].image
                          }
                          alt={
                            products.image.slice(0, 5)[selectedImageIndex].title
                          }
                        />
                        <IconButton
                          onClick={handleNextImage}
                          sx={styles.detailstyles.arrowForward}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Part 2.2 */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={styles.detailstyles.detailList}>
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
                              variant="body1"
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
                    {product.classicalGuitar.map((item) => (
                      <Box
                        key={item.id}
                        sx={styles.detailstyles.product_detail_frame}
                      >
                        <Box sx={styles.detailstyles.product_detail_title}>
                          <Typography
                            sx={styles.detailstyles.roboto_20px_000000D9}
                          >
                            Review from us
                          </Typography>
                          <IconButton
                            onClick={handleToggleReview}
                            sx={{
                              transform: review
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s",
                            }}
                          >
                            <ExpandMoreIcon fontSize="large" />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            ...styles.detailstyles.review_frame,
                            WebkitLineClamp: review ? "none" : 5,
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={styles.detailstyles.roboto_14px_02000C}
                          >
                            {item.review.main}
                          </Typography>
                          <Box
                            component={"ul"}
                            sx={styles.detailstyles.review_ul}
                          >
                            {item.review.list.map((list, index) => (
                              <Typography
                                component={"li"}
                                variant="body1"
                                key={index}
                                sx={styles.detailstyles.review_li}
                              >
                                {list}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                        <Typography
                          onClick={handleToggleReview}
                          sx={styles.detailstyles.review_more}
                        >
                          {review ? "View less" : "View more"}
                        </Typography>
                      </Box>
                    ))}

                    {product.classicalGuitar.map((item) => (
                      <Box key={item.id}>
                        {/* Specifiation */}
                        <Box sx={styles.detailstyles.product_detail_title}>
                          <Typography
                            sx={styles.detailstyles.roboto_20px_000000D9}
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
                          sx={styles.detailstyles.collapse_border}
                        >
                          <Box sx={styles.detailstyles.collapse_padding}>
                            {Object.keys(specifications).map((key, index) => (
                              <Box
                                key={index}
                                sx={styles.detailstyles.specifiation_frame}
                              >
                                <Box
                                  sx={styles.detailstyles.specifiation_width}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={styles.detailstyles.roboto_14px_000000}
                                  >
                                    {labels[key as keyof typeof specifications]}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  sx={styles.detailstyles.roboto_14px_02000C}
                                >
                                  {
                                    specifications[
                                      key as keyof typeof specifications
                                    ]
                                  }
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Collapse>

                        {/* Shipping police */}
                        <Box sx={styles.detailstyles.product_detail_title}>
                          <Typography
                            sx={styles.detailstyles.roboto_20px_000000D9}
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
                          sx={styles.detailstyles.collapse_border}
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
                              variant="body1"
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
                        <Box sx={styles.detailstyles.product_detail_title}>
                          <Typography
                            sx={styles.detailstyles.roboto_20px_000000D9}
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
                          sx={styles.detailstyles.collapse_border}
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
                              variant="body1"
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

                <Box sx={styles.detailstyles.main_right_frame}>
                  {/* Part 2.4 */}
                  {product.classicalGuitar.map((item) => (
                    <Box key={item.id}>
                      <Box sx={styles.detailstyles.titleFrame}>
                        <Typography sx={styles.detailstyles.roboto_30px_02000C}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_14px_76757C}
                        >
                          Condition: {item.condition}
                        </Typography>
                      </Box>
                      <Box sx={styles.detailstyles.titleSpace}>
                        <Typography sx={styles.detailstyles.roboto_30px_02000C}>
                          {item.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_14px_76757C}
                        >
                          New guitar: {item.newprice}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  {/* Part 2.5 */}
                  <Box sx={styles.detailstyles.buttonFrame}>
                    <Button
                      component={Link}
                      to="/home"
                      sx={styles.detailstyles.buttonStyle_02000C}
                    >
                      <Typography sx={styles.detailstyles.roboto_16px_FFFFFF}>
                        Buy It Now
                      </Typography>
                    </Button>
                    <Button
                      component={Link}
                      to="/home"
                      sx={styles.detailstyles.buttonStyle_FFFFFF}
                    >
                      <Typography sx={styles.detailstyles.roboto_16px_02000C}>
                        Add to Cart
                      </Typography>
                    </Button>
                  </Box>

                  {/* Part 2.6 */}
                  <Box sx={styles.detailstyles.deliveTitle}>
                    <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                      How to get it
                    </Typography>
                    <Box>
                      <Button
                        disableFocusRipple
                        sx={styles.detailstyles.deliver_button_frame}
                        onClick={() => {
                          setOpenLocation(true);
                        }}
                      >
                        <Box sx={styles.detailstyles.button_frame}>
                          <Box sx={styles.detailstyles.button_space}>
                            <ShoppingCartIcon fontSize="small" />
                            <Typography
                              variant="body1"
                              sx={styles.detailstyles.roboto_16px}
                            >
                              Deliver to Deliver to{" "}
                              {locationFunctions.storedZipCode
                                ? locationFunctions.storedZipCode
                                : " M5G 2G4 "}
                            </Typography>
                          </Box>
                          <Box sx={styles.detailstyles.deliverTime}>
                            <Typography sx={styles.detailstyles.roboto_14px}>
                              Free Shippinig, Get it by Sat, Jul 27
                            </Typography>
                          </Box>
                        </Box>
                        <ArrowForwardIosIcon fontSize="medium" />
                      </Button>
                      <LocationDrawer
                        open={openLocation}
                        setOpen={setOpenLocation}
                      />
                      <Button
                        sx={styles.detailstyles.pickup_button_frame}
                        variant="text"
                        disableFocusRipple
                        onClick={() => {
                          setOpenPickUp(true);
                        }}
                      >
                        <Box sx={styles.detailstyles.pickup_button_space}>
                          <StoreIcon fontSize="small" />
                          <Typography
                            variant="body1"
                            sx={styles.detailstyles.roboto_16px}
                          >
                            Pick up at Toronto Downtown
                          </Typography>
                        </Box>
                        <ArrowForwardIosIcon fontSize="medium" />
                      </Button>
                      <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
                    </Box>
                  </Box>

                  {/* Part 2.7 */}
                  <Box sx={styles.detailstyles.shipments_frame}>
                    <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                      Protect your shipment
                    </Typography>
                    <Box>
                      <Box sx={styles.detailstyles.shipments_text}>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_16px_000000D9}
                        >
                          $30 - Full refund if item is damaged
                        </Typography>
                      </Box>
                      <Box sx={styles.detailstyles.shipments_text}>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_16px_000000D9}
                        >
                          $10 - Half refund if item is damaged
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Part 3 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={styles.detailstyles.mayLike_frame}>
              <Typography
                variant="h2"
                sx={styles.detailstyles.roboto_30px_02000C}
              >
                You might also like
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={functions.handlePrevNewArrival}
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    left: "-24px",
                    top: "40%",
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
                  onClick={functions.handleNextNewArrival}
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    right: "-17px",
                    top: "40%",
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
                    .slice(
                      functions.indexNewArrival,
                      functions.indexNewArrival +
                        functions.itemsToShowNewArrival
                    )
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
                        <Box
                          component={Link}
                          to={item.Link}
                          sx={{
                            width: "250px",
                            height: "250px",
                            borderRadius: "8px",
                          }}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            sx={{
                              width: "100%",
                              height: "100%",
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
                              width: "100%",
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
                              textDecoration: "none",
                              color: "#76757C",
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
                              textDecoration: "none",
                              color: "#000000D9",
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
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
