import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useHome } from "../../../hooks/useHome.hook/page";
import Header from "../../layout/header/page";

// Mui Components
import { Box, Grid, Button, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Side picture
import * as carousel from "../../../lists/side.list/page";
// Importing styles
import * as styles from "../../../styles/homepage.style/page";
// Featured guitars list
import { featuredGuitars } from "../../../lists/featuredGuitars.list/page";
// New arrivals list
import { newArrivals } from "../../../lists/newArrivals.list/page";
// Service list
import { serviceItems } from "../../../lists/service.list/page";
// Category list
import * as category from "../../../lists/category.list/page";
import Footer from "../../layout/footer/page";

const Homepage: React.FC = () => {
  // import useHome hook
  const functions = useHome();

  return (
    <Box>
      <Header />
      <Grid container>
        {/* Part 1 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Carousel prevIcon={null} nextIcon={null} variant="dark">
            {carousel.sides.albums.map((image) => (
              <Carousel.Item key={image.id} interval={2000}>
                <Box>
                  <Box
                    component="img"
                    src={image.image}
                    sx={styles.homeStyles.carouselImage}
                  />
                  <Box sx={styles.homeStyles.carouselContent}>
                    {image.title && (
                      <Typography sx={styles.homeStyles.roboto_carousel_title}>
                        {image.title}
                      </Typography>
                    )}

                    {image.subtitle && (
                      <Typography
                        sx={styles.homeStyles.roboto_carousel_subtitle}
                      >
                        {image.subtitle}
                      </Typography>
                    )}

                    {image.button && (
                      <Box style={styles.homeStyles.carousel_button}>
                        <Button
                          component={Link}
                          to={image.to}
                          variant="text"
                          disableFocusRipple
                          sx={styles.homeStyles.buttonStyle_black}
                        >
                          <Typography
                            variant="body1"
                            sx={styles.homeStyles.roboto_16px}
                          >
                            {image.button}
                          </Typography>
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>

        {/* Part 2 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={styles.homeStyles.titleStyle}>
            <Typography
              variant="h2"
              sx={{ ...styles.homeStyles.roboto_30px, color: "#02000C" }}
            >
              Shop our featured guitars
            </Typography>
          </Box>

          {/* Shop Items List */}
          <Box sx={styles.homeStyles.listStyle}>
            <IconButton
              onClick={functions.handlePrevfeaturedGuitar}
              sx={styles.homeStyles.leftButton}
            >
              <ArrowBackIos sx={styles.homeStyles.arrowBack} />
            </IconButton>
            <IconButton
              onClick={functions.handleNextfeaturedGuitar}
              sx={styles.homeStyles.rightButton}
            >
              <ArrowForwardIos sx={styles.homeStyles.arrowForward} />
            </IconButton>
            <Box sx={styles.homeStyles.carouselBox}>
              {featuredGuitars
                .slice(
                  functions.indexfeaturedGuitar,
                  functions.indexfeaturedGuitar +
                    functions.itemToShowfeaturedGuitar
                )
                .map((item) => (
                  <Box key={item.id} sx={styles.homeStyles.sliceBox}>
                    {/* Image */}
                    <Box
                      component={Link}
                      to={item.Link}
                      sx={styles.homeStyles.productList}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        sx={styles.homeStyles.imageStyle}
                      />
                    </Box>

                    {/* Product name */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      variant="body1"
                      sx={styles.homeStyles.roboto_16px_productName}
                    >
                      {item.name}
                    </Typography>

                    {/* Condition */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...styles.homeStyles.roboto_14px,
                        color: "#76757C",
                      }}
                    >
                      Condition: {item.condition}
                    </Typography>

                    {/* Price */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...styles.homeStyles.roboto_20px,
                        color: "#000000D9",
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>

        {/* Part 3 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={styles.homeStyles.titleStyle}>
            <Typography
              variant="h2"
              sx={{ ...styles.homeStyles.roboto_30px, color: "#02000C" }}
            >
              New Arrivals
            </Typography>
          </Box>

          {/* New Arrivals List */}
          <Box sx={styles.homeStyles.listStyle}>
            <IconButton
              onClick={functions.handlePrevNewArrival}
              sx={styles.homeStyles.leftButton}
            >
              <ArrowBackIos sx={styles.homeStyles.arrowBack} />
            </IconButton>
            <IconButton
              onClick={functions.handleNextNewArrival}
              sx={styles.homeStyles.rightButton}
            >
              <ArrowForwardIos sx={styles.homeStyles.arrowForward} />
            </IconButton>
            <Box sx={styles.homeStyles.carouselBox}>
              {newArrivals
                .slice(
                  functions.indexNewArrival,
                  functions.indexNewArrival + functions.itemsToShowNewArrival
                )
                .map((item) => (
                  <Box key={item.id} sx={styles.homeStyles.sliceBox}>
                    {/* Image */}
                    <Box
                      component={Link}
                      to={item.Link}
                      sx={styles.homeStyles.productList}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        sx={styles.homeStyles.imageStyle}
                      />
                    </Box>

                    {/* Product name */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={styles.homeStyles.roboto_16px_productName}
                    >
                      {item.name}
                    </Typography>

                    {/* Condition */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...styles.homeStyles.roboto_14px,
                        color: "#76757C",
                      }}
                    >
                      Condition: {item.condition}
                    </Typography>

                    {/* Price */}
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...styles.homeStyles.roboto_20px,
                        color: "#000000D9",
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>

        {/* Part 4 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Service */}
          <Box sx={styles.homeStyles.serviceStyle}>
            {serviceItems.map((item) => (
              <Box key={item.id} sx={styles.homeStyles.serviceBox}>
                {/* Image */}
                <Box
                  component={Link}
                  to={item.Link}
                  sx={styles.homeStyles.serviceList}
                >
                  <Box
                    component="img"
                    src={item.image}
                    sx={styles.homeStyles.imageStyle}
                  />
                </Box>

                {/* Title */}
                <Typography
                  component={Link}
                  to={item.Link}
                  sx={styles.homeStyles.roboto_20px_service}
                >
                  {item.title}
                </Typography>

                {/* Text */}
                <Typography
                  component={Link}
                  to={item.Link}
                  sx={styles.homeStyles.roboto_14px_service}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Part 5 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={styles.homeStyles.titleStyle}>
            <Typography
              variant="h2"
              sx={{ ...styles.homeStyles.roboto_30px, color: "#02000C" }}
            >
              Browse by category
            </Typography>
          </Box>
          {/* Category */}
          <Box sx={styles.homeStyles.categoryStyle}>
            <Box sx={styles.homeStyles.categoryLeft}>
              {/* Left Name */}
              <Typography
                sx={{ ...styles.homeStyles.roboto_20px, color: "#02000C" }}
              >
                {category.table.classical.name}
              </Typography>

              {/* Left Image */}
              <Box
                component="img"
                src={category.table.classical.image}
                sx={styles.homeStyles.categoryLeftImage}
              />
            </Box>
            <Box sx={styles.homeStyles.categoryRight}>
              <Grid container spacing={3}>
                {category.table.filterCategory.map((category) => (
                  <Grid item key={category.id} xs={6}>
                    <Box sx={styles.homeStyles.categoryRightBox}>
                      {/* Right Name */}
                      <Typography
                        sx={styles.homeStyles.roboto_20px_categoryRight}
                      >
                        {category.name}
                      </Typography>
                      <Box
                        component="img"
                        src={category.image}
                        sx={styles.homeStyles.categoryRightImage}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Homepage;
