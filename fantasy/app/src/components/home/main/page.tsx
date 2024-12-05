import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useProduct } from "../../../hooks/useProduct.hook/hook/page";
import { Product } from "../../../hooks/useProduct.hook/context/page";
import Header from "../layout/header/page";
import Footer from "../layout/footer/page";

// Mui Components
import { Box, Grid, Button, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Side picture
import * as carousel from "../../../lists/side.list/page";
// Service list
import { serviceItems } from "../../../lists/service.list/page";

const useItems = (items: Product[], itemsToShow = 5) => {
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

const Homepage: React.FC = () => {
  const { fetchProduct, featured, newArrival, FliteCategory } = useProduct();
  const featuredGuitar = useItems(featured);
  const newArrivalGuitar = useItems(newArrival);

  const featuredGuitarCount = featured.slice(
    featuredGuitar.index,
    featuredGuitar.index + featuredGuitar.itemsToShow
  );
  const featuredGuitarPlaceholder = Math.max(0, 5 - featuredGuitarCount.length);

  const newArrivalGuitarCount = newArrival.slice(
    newArrivalGuitar.index,
    newArrivalGuitar.index + newArrivalGuitar.itemsToShow
  );
  const newArrivalGuitarPlaceholder = Math.max(
    0,
    5 - newArrivalGuitarCount.length
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Box>
      <Header />

      {/* Part 1 */}
      <Carousel prevIcon={null} nextIcon={null} variant="dark">
        {carousel.sides.albums.map((image) => (
          <Carousel.Item key={image.id} interval={2000}>
            <Box>
              <Box
                component="img"
                src={image.image}
                sx={{
                  positions: "relative",
                  display: "block",
                  height: "522px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  width: "440px",
                  top: "110px",
                  left: "82px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "54px",
                    fontWeight: 700,
                    lineHeight: "63px",
                    textAlign: "left",
                    color: "#02000C",
                  }}
                >
                  {image.title}
                </Typography>

                <Box sx={{ margin: "28px 0px 40px 0px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: "28px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  >
                    {image.subtitle}
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to={image.to}
                  disableFocusRipple
                  sx={{
                    width: "232px",
                    height: "48px",
                    backgroundColor: "#02000C",
                    textTransform: "none",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#02000C",
                    },
                    "&.Mui-focusVisible": {
                      boxShadow: "0 0 0 2px #5796dc",
                    },
                  }}
                >
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
                    {image.button}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0px 72px",
          margin: "56px 0px 0px 0px",
          gap: "26px",
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
          Shop our featured guitars
        </Typography>

        {/* Shop Items List */}
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={featuredGuitar.handlePrev}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              left: "-23px",
              top: "35%",
              backgroundColor: "#FFFFFF",
              borderRadius: "50px",
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
            onClick={featuredGuitar.handleNext}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              right: "-23px",
              top: "35%",
              PointerEvents: "auto",
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
              positions: "relative",
              display: "flex",
              justifyContent: "space-between",
              flexdirection: "row",
              overflow: "hidden",
            }}
          >
            {featuredGuitarCount.map((item, index) => (
              <Box
                component={Link}
                to={`/product/${encodeURIComponent(item.name)}`}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "252px",
                  border: "1px solid #FFFFFF",
                  textDecoration: "none",
                  padding: "6px 0px 0px 0px",
                  gap: "12px",
                  "&:hover": {
                    boxShadow: " 0px 1px 4px 0px #00000040",
                    borderRadius: "8px",
                    border: "1px solid #DDDCDE",
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  sx={{
                    width: "240px",
                    height: "240px",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "240px",
                    height: "108px",
                  }}
                >
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {/* Product name */}
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
                      {item.name}
                    </Typography>
                  </Box>

                  {/* Condition */}
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
                    Condition: {item.condition}
                  </Typography>

                  {/* Price */}
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
                    $ {item.price}
                  </Typography>
                </Box>
              </Box>
            ))}
            {Array.from({
              length: featuredGuitarPlaceholder,
            }).map((_, index) => (
              <Box key={`placeholder-${index}`} sx={{ width: "252px" }} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0px 72px",
          margin: "56px 0px 0px 0px",
          gap: "26px",
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
          New Arrivals
        </Typography>

        {/* New Arrivals List */}
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={newArrivalGuitar.handlePrev}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              left: "-23px",
              top: "35%",
              backgroundColor: "#FFFFFF",
              borderRadius: "50px",
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
            onClick={newArrivalGuitar.handleNext}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              right: "-23px",
              top: "35%",
              PointerEvents: "auto",
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
              positions: "relative",
              display: "flex",
              justifyContent: "space-between",
              flexdirection: "row",
              overflow: "hidden",
            }}
          >
            {newArrivalGuitarCount.map((item, index) => (
              <Box
                component={Link}
                to={`/product/${encodeURIComponent(item.name)}`}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "252px",
                  border: "1px solid #FFFFFF",
                  textDecoration: "none",
                  padding: "6px 0px 0px 0px",
                  gap: "12px",
                  "&:hover": {
                    color: "#FFFFFF",
                    boxShadow: " 0px 1px 4px 0px #00000040",
                    borderRadius: "8px",
                    border: "1px solid #DDDCDE",
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  sx={{
                    width: "240px",
                    height: "240px",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "240px",
                    height: "108px",
                  }}
                >
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    {/* Product name */}
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
                      {item.name}
                    </Typography>
                  </Box>

                  {/* Condition */}
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
                    Condition: {item.condition}
                  </Typography>

                  {/* Price */}
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
                    $ {item.price}
                  </Typography>
                </Box>
              </Box>
            ))}
            {Array.from({
              length: newArrivalGuitarPlaceholder,
            }).map((_, index) => (
              <Box key={`placeholder-${index}`} sx={{ width: "252px" }} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Part 4 */}
      {/* Service */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "100px 72px 20px 72px",
        }}
      >
        {serviceItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              width: "calc(100% / 4)",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "113px",
                height: "113px",
                border: "1px solid #02000C",
                borderRadius: "90%",
                margin: "0px 0px 15px 0px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "260px",
                gap: "10px",
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
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "center",
                  color: "#02000C",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Part 5 */}
      {/* Title */}
      <Box sx={{ padding: "0px 72px 0px 72px", margin: "56px 0px 26px 0px" }}>
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
          Browse by category
        </Typography>
      </Box>
      {/* Category */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: "0px 72px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "432px",
            height: "374px",
            background: "#FFEACE",
            borderRadius: "8px",
            flexShrink: 0,
            padding: "0px 10px 0px 50px",
          }}
        >
          {/* Left Name */}
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
            Classical Guitar
          </Typography>

          {/* Left Image */}
          <Box
            component="img"
            sx={{
              width: "211px",
              height: "329px",
              border: "1px solid #02000C",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "840px",
            height: "374px",
          }}
        >
          <Grid container spacing={3}>
            {FliteCategory.map((category, index) => (
              <Grid item key={index} xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "408px",
                    height: "175px",
                    borderRadius: "8px",
                    background: "#FFEACE",
                    padding: "0px 28px",
                  }}
                >
                  {/* Right Name */}
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
                    {category}
                  </Typography>
                  <Box
                    component="img"
                    sx={{
                      width: "165px",
                      height: "165px",
                      border: "1px solid #02000C",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Homepage;
