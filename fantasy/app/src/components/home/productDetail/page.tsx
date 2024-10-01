import React from "react";
import { Link, useParams } from "react-router-dom";
import { useProductDetail } from "../../../hooks/useProductDetail.hook/page";
import { useCart } from "../../../hooks/useCart.hook/page";
import { newArrivals } from "../../../lists/newArrivals.list/page";
import LocationDrawer from "../../drawer/location.drawer/page";
import PickUpDrawer from "../../drawer/pickUp.drawer/page";
import Header from "../../layout/header/page";
import Footer from "../../layout/footer/page";

import { guitar } from "../../../lists/guitar.list/page";

// Mui Components
import {
  Box,
  Button,
  Grid,
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

// Styles
import * as styles from "../../../styles/product.style/product.detail/page";

const ProductDetail: React.FC = () => {
  const { productName } = useParams<{
    category: string;
    productName: string;
  }>();

  // 从本地数据获取产品数据
  const guitars = guitar.find((p) => p.name.toString() === productName);
  // 从本地数据获取产品图片
  const totalImages = Math.min(guitars?.image?.length ?? 0, 5);
  // 切换产品图片
  const handleNextImage = () => {
    productHook.setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % totalImages
    );
  };

  const productHook = useProductDetail();
  const cartHook = useCart();

  return (
    <Box>
      <Header />
      <Box sx={styles.detailstyles.detailFrame}>
        <Grid container>
          {/* Part 1 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box>
              <Box sx={styles.detailstyles.mainFrame}>
                <Box sx={styles.detailstyles.main_left_frame}>
                  {/* Part 1.1 */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={styles.detailstyles.picture_list_frame}>
                      <Box sx={styles.detailstyles.image_list_frame}>
                        <ImageList
                          cols={1}
                          sx={{
                            display: "flex",
                            justifyContent:
                              (guitars?.image?.length ?? 0) >= 5
                                ? "space-between"
                                : "flex-start",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100% ",
                            height: "630px",
                            zIndex: 0,
                          }}
                        >
                          {guitars?.image.slice(0, 5).map((img, index) => (
                            <ImageListItem
                              key={index}
                              onClick={() =>
                                productHook.setSelectedImageIndex(index)
                              }
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
                                    (guitars?.image?.length ?? 0) >= 5
                                      ? "0px 0px 0px 0px"
                                      : "0px 0px 9.7px 0px",
                                  border:
                                    productHook.selectedImageIndex === index
                                      ? "1px solid #02000C"
                                      : "none",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={img.image}
                                  loading="lazy"
                                  sx={styles.detailstyles.imageItem}
                                />
                              </Box>
                            </ImageListItem>
                          ))}
                          {(guitars?.image?.length ?? 0) >= 5 && (
                            <Box
                              sx={styles.detailstyles.viewAll}
                              onClick={() => {
                                productHook.handleViewAll();
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
                        open={productHook.viewAll}
                        onClose={productHook.handleViewAll}
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
                            onClick={productHook.handleViewAll}
                            sx={styles.detailstyles.iconColor}
                          >
                            <CloseIcon fontSize="large" />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          {guitars?.image && (
                            <ImageList cols={3}>
                              {guitars.image.map((item, index) => (
                                <ImageListItem
                                  key={index}
                                  sx={
                                    styles.detailstyles.dialog_image_list_frame
                                  }
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
                                      loading="lazy"
                                      sx={styles.detailstyles.imageItem}
                                    />
                                  </Box>
                                </ImageListItem>
                              ))}
                            </ImageList>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Box sx={styles.detailstyles.image_show_frame}>
                        <IconButton sx={styles.detailstyles.favoriteIcon}>
                          <FavoriteBorderIcon />
                        </IconButton>
                        <Box
                          component="img"
                          src={
                            guitars?.image?.slice(0, 5)[
                              productHook.selectedImageIndex
                            ].image
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

                  {/* Part 1.2 */}
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

                  {/* Part 1.3 */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {/* Review */}
                    <Box sx={styles.detailstyles.product_detail_frame}>
                      <Box sx={styles.detailstyles.product_detail_title}>
                        <Typography
                          sx={styles.detailstyles.roboto_20px_000000D9}
                        >
                          Review from us
                        </Typography>
                        <IconButton
                          onClick={productHook.handleToggleReview}
                          sx={{
                            transform: productHook.review
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
                          WebkitLineClamp: productHook.review ? "none" : 5,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_14px_02000C}
                        ></Typography>
                        <Box
                          component={"ul"}
                          sx={styles.detailstyles.review_ul}
                        >
                          {guitars?.review?.list.map((list, index) => (
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
                        onClick={productHook.handleToggleReview}
                        sx={styles.detailstyles.review_more}
                      >
                        {productHook.review ? "View less" : "View more"}
                      </Typography>
                    </Box>

                    {/* Specifiation */}
                    <Box sx={styles.detailstyles.product_detail_title}>
                      <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                        Specifications
                      </Typography>
                      <IconButton
                        onClick={productHook.handleToggleSpecifiation}
                        sx={{
                          transform: productHook.specifiationOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <ExpandMoreIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Collapse
                      in={productHook.specifiationOpen}
                      collapsedSize={0}
                      sx={styles.detailstyles.collapse_border}
                    >
                      {productHook.product &&
                        Object.keys(productHook.product.specificationDetail)
                          .filter(
                            (key) =>
                              key !== "id" &&
                              key !== "createdAt" &&
                              key !== "updatedAt"
                          )
                          .map((key) => (
                            <Box
                              key={key}
                              sx={styles.detailstyles.collapse_padding}
                            >
                              <Box sx={styles.detailstyles.specifiation_frame}>
                                <Box
                                  sx={styles.detailstyles.specifiation_width}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={styles.detailstyles.roboto_14px_000000}
                                  >
                                    {key}:
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  sx={styles.detailstyles.roboto_14px_02000C}
                                >
                                  {
                                    productHook.product?.specificationDetail[
                                      key as keyof typeof productHook.product.specificationDetail
                                    ]
                                  }
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                    </Collapse>

                    {/* Shipping police */}
                    <Box sx={styles.detailstyles.product_detail_title}>
                      <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                        Shipping Police
                      </Typography>
                      <IconButton
                        onClick={productHook.handleToggleShippingPolice}
                        sx={{
                          transform: productHook.shippingPolice
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <ExpandMoreIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Collapse
                      in={productHook.shippingPolice}
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
                          to={`/`}
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
                      <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                        Return Police
                      </Typography>
                      <IconButton
                        onClick={productHook.handleToggleReturn}
                        sx={{
                          transform: productHook.returnPolice
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <ExpandMoreIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Collapse
                      in={productHook.returnPolice}
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
                          to={`/`}
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
                  </Grid>
                </Box>

                <Box sx={styles.detailstyles.main_right_frame}>
                  {/* Part 1.4 */}
                  {productHook.product && (
                    <Box>
                      <Box sx={styles.detailstyles.titleFrame}>
                        <Typography sx={styles.detailstyles.roboto_30px_02000C}>
                          {productHook.product.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_14px_76757C}
                        >
                          Condition:{" "}
                          {productHook.product.specificationDetail.Condition}
                        </Typography>
                      </Box>
                      <Box sx={styles.detailstyles.titleSpace}>
                        <Typography sx={styles.detailstyles.roboto_30px_02000C}>
                          ${Number(productHook.product.price).toFixed(2)}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={styles.detailstyles.roboto_14px_76757C}
                        ></Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Part 1.5 */}
                  <Box sx={styles.detailstyles.buttonFrame}>
                    <Button
                      component={Link}
                      to={`/cart`}
                      sx={styles.detailstyles.buttonStyle_02000C}
                    >
                      <Typography sx={styles.detailstyles.roboto_16px_FFFFFF}>
                        Buy It Now
                      </Typography>
                    </Button>
                    <Button
                      onClick={() =>
                        cartHook.addToCart({
                          quantity: 1,
                          id: productHook.product?.id || "",
                          cart: { type: "cart" },
                          product: {
                            name: productHook.product?.name || "",
                            price: productHook.product?.price.toString() || "",
                            specificationDetail: {
                              Condition:
                                productHook.product?.specificationDetail
                                  ?.Condition || "",
                            },
                          },
                        })
                      }
                      sx={styles.detailstyles.buttonStyle_FFFFFF}
                    >
                      <Typography sx={styles.detailstyles.roboto_16px_02000C}>
                        Add to Cart
                      </Typography>
                    </Button>
                  </Box>

                  {/* Part 1.6 */}
                  <Box sx={styles.detailstyles.deliveTitle}>
                    <Typography sx={styles.detailstyles.roboto_20px_000000D9}>
                      How to get it
                    </Typography>
                    <Box>
                      <Button
                        disableFocusRipple
                        sx={styles.detailstyles.deliver_button_frame}
                        onClick={() => {
                          productHook.setOpenLocation(true);
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
                              {productHook.locationFunctions.storedZipCode
                                ? productHook.locationFunctions.storedZipCode
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
                        open={productHook.openLocation}
                        setOpen={productHook.setOpenLocation}
                      />
                      <Button
                        sx={styles.detailstyles.pickup_button_frame}
                        variant="text"
                        disableFocusRipple
                        onClick={() => {
                          productHook.setOpenPickUp(true);
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
                      <PickUpDrawer
                        open={productHook.openPickUp}
                        setOpen={productHook.setOpenPickUp}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Part 2 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={styles.detailstyles.mayLike_frame}>
              <Typography
                variant="h2"
                sx={styles.detailstyles.roboto_30px_02000C}
              >
                You might also like
              </Typography>
              <Box sx={styles.detailstyles.iconbutton_frame}>
                <IconButton
                  onClick={productHook.mayLike.handlePrev}
                  sx={styles.detailstyles.left_iconbutton}
                >
                  <ArrowBackIos
                    sx={styles.detailstyles.iconbutton_left_style}
                  />
                </IconButton>
                <IconButton
                  onClick={productHook.mayLike.handleNext}
                  sx={styles.detailstyles.right_iconbutton}
                >
                  <ArrowForwardIos
                    sx={styles.detailstyles.iconbutton_right_style}
                  />
                </IconButton>
                <Box sx={styles.detailstyles.mayLike_list_frame}>
                  {newArrivals
                    .slice(
                      productHook.mayLike.index,
                      productHook.mayLike.index +
                        productHook.mayLike.itemsToShow
                    )
                    .map((item) => (
                      <Box
                        key={item.id}
                        sx={styles.detailstyles.mayLike_list_size}
                      >
                        <Box
                          component={Link}
                          to={item.Link}
                          sx={styles.detailstyles.mayLike_list_box}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            sx={styles.detailstyles.mayLike_list_image}
                          />
                        </Box>
                        <Box sx={styles.detailstyles.mayLike_text_frame}>
                          <Typography
                            component={Link}
                            to={item.Link}
                            sx={styles.detailstyles.mayLike_text_title}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            component={Link}
                            to={item.Link}
                            sx={styles.detailstyles.mayLike_text_condition}
                          >
                            Condition: {item.condition}
                          </Typography>
                          <Typography
                            component={Link}
                            to={item.Link}
                            sx={styles.detailstyles.mayLike_text_price}
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
