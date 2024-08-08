import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

// Mui Components
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Side picture
//import ExampleImages from "../../images/side.images/colors.jpg";

// Importing styles
import {
  headerStyle,
  titleStyle,
  mainStyle,
  logoName,
  searchBar,
  buttonStyle,
  iconStyle_1,
  iconStyle_2,
  roboto_14px,
  roboto_16px,
  roboto_20px,
  roboto_30px,
  roboto_14px_center,
  roboto_20px_center,
  linkStyle,
  componentSpace,
  carouselImage,
  listStyle,
  leftButton,
  arrowBack,
  rightButton,
  arrowForward,
  carouselBox,
  sliceBox,
  productList,
  serviceStyle,
  serviceBox,
  serviceList,
  categoryStyle,
  categoryLeft,
  categoryLeftBox,
  categoryLeftImage,
  categoryRight,
  categoryRightBox,
  categoryRightImage,
} from "../../styles/homepage.style/page";

// Featured guitars
import { featuredGuitars } from "../../lists/featuredGuitars.list/page";
// New arrivals
import { newArrivals } from "../../lists/newArrivals.list/page";
// Service list
import { serviceItems } from "../../lists/service.list/page";
// Category list
import { classical, filterCategory } from "../../lists/category.list/page";

const Homepage: React.FC = () => {
  // Items for the shop
  const [indexItems, setIndexItems] = useState(0);
  const itemToShow = 5;
  const handlePrevItems = () => {
    setIndexItems((prevIndexItems) => Math.max(prevIndexItems - 1, 0));
  };
  const handleNextItems = () => {
    setIndexItems((prevIndexItems) =>
      prevIndexItems < featuredGuitars.length - itemToShow
        ? prevIndexItems + 1
        : prevIndexItems
    );
  };

  // New arrivals
  const [indexNewArrivals, setIndexNewArrivals] = useState(0);
  const newArrivalsToShow = 5;
  const handlePrevNewArrivals = () => {
    setIndexNewArrivals((prevIndexNewArrivals) =>
      Math.max(prevIndexNewArrivals - 1, 0)
    );
  };
  const handleNextNewArrivals = () => {
    setIndexNewArrivals((prevIndexNewArrivals) =>
      prevIndexNewArrivals < newArrivals.length - newArrivalsToShow
        ? prevIndexNewArrivals + 1
        : prevIndexNewArrivals
    );
  };

  return (
    <Box>
      <Grid container>
        <Box sx={mainStyle}>
          {/* Part 1 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* Logo Name */}
            <Box sx={headerStyle}>
              <Typography sx={logoName}>Logo Name</Typography>

              {/* Search Bar */}
              <TextField
                placeholder="Find guitars you love..."
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={searchBar}
              />

              {/* Sign In Button */}
              <Box component={Link} to="/" sx={linkStyle}>
                <Button
                  variant="text"
                  startIcon={<PersonOutlineIcon sx={iconStyle_1} />}
                  sx={buttonStyle}
                >
                  <Typography
                    variant="body1"
                    sx={{ ...roboto_16px, color: "#02000C" }}
                  >
                    Sign In
                  </Typography>
                </Button>
              </Box>

              {/* Shopping Cart Button */}
              <Box component={Link} to="/" sx={linkStyle}>
                <Button
                  variant="text"
                  startIcon={<ShoppingCartIcon sx={iconStyle_1} />}
                  sx={buttonStyle}
                >
                  <Typography
                    variant="body1"
                    sx={{ ...roboto_16px, color: "#02000C" }}
                  >
                    Cart
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* part 2 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={headerStyle}>
              {/* Letf Group Buttons */}
              <Box sx={componentSpace}>
                {/* Classical Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle}>
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Classical Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Acoustic Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle}>
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Acoustic Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Semi-Acoustic Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle}>
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Semi-Acoustic Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Ukulele */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle}>
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Ukulele
                    </Typography>
                  </Button>
                </Box>

                {/* Banjo */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle}>
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Banjo
                    </Typography>
                  </Button>
                </Box>
              </Box>

              {/* Right Group Buttons */}
              <Box sx={componentSpace}>
                {/* Deliver */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<LocalShippingIcon sx={iconStyle_2} />}
                    sx={buttonStyle}
                  >
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Deliver to M5G2G4
                    </Typography>
                  </Button>
                </Box>

                {/* Pick up */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<StoreIcon sx={iconStyle_2} />}
                    sx={buttonStyle}
                  >
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Pick up at Toronto Downtown
                    </Typography>
                  </Button>
                </Box>

                {/* Contact Us */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<PhoneEnabledIcon sx={iconStyle_2} />}
                    sx={buttonStyle}
                  >
                    <Typography
                      variant="body1"
                      sx={{ ...roboto_14px, color: "#02000C" }}
                    >
                      Contact Us
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Part 3 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Carousel prevIcon={null} nextIcon={null} variant="dark">
            <Carousel.Item interval={1000}>
              <Box component={Link} to="/">
                <Box component="img" sx={carouselImage} />
              </Box>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <Box component={Link} to="/">
                <Box component="img" sx={carouselImage} />
              </Box>
            </Carousel.Item>
          </Carousel>
        </Grid>

        {/* Part 4 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={titleStyle}>
            <Typography variant="h2" sx={{ ...roboto_30px, color: "#02000C" }}>
              Shop our featured guitars
            </Typography>
          </Box>

          {/* Shop Items List */}
          <Box sx={listStyle}>
            <IconButton onClick={handlePrevItems} sx={leftButton}>
              <ArrowBackIos sx={arrowBack} />
            </IconButton>
            <IconButton onClick={handleNextItems} sx={rightButton}>
              <ArrowForwardIos sx={arrowForward} />
            </IconButton>
            <Box sx={carouselBox}>
              {featuredGuitars
                .slice(indexItems, indexItems + itemToShow)
                .map((item) => (
                  <Box key={item.id} sx={sliceBox}>
                    <Box
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...productList,
                        backgroundColor: item.backgroundcolor,
                      }}
                    ></Box>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_16px, color: "#02000C" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_14px, color: "#76757C" }}
                    >
                      {item.condition}
                    </Typography>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_20px, color: "#000000D9" }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>

        {/* Part 5 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={titleStyle}>
            <Typography variant="h2" sx={{ ...roboto_30px, color: "#02000C" }}>
              New Arrivals
            </Typography>
          </Box>

          {/* New Arrivals List */}
          <Box sx={listStyle}>
            <IconButton onClick={handlePrevNewArrivals} sx={leftButton}>
              <ArrowBackIos sx={arrowBack} />
            </IconButton>
            <IconButton onClick={handleNextNewArrivals} sx={rightButton}>
              <ArrowForwardIos sx={arrowForward} />
            </IconButton>
            <Box sx={carouselBox}>
              {newArrivals
                .slice(indexNewArrivals, indexNewArrivals + newArrivalsToShow)
                .map((item) => (
                  <Box key={item.id} sx={sliceBox}>
                    <Box
                      component={Link}
                      to={item.Link}
                      sx={{
                        ...productList,
                        backgroundColor: item.backgroundcolor,
                      }}
                    ></Box>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_16px, color: "#02000C" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_14px, color: "#76757C" }}
                    >
                      {item.condition}
                    </Typography>
                    <Typography
                      component={Link}
                      to={item.Link}
                      sx={{ ...roboto_20px, color: "#000000D9" }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>

        {/* Part 6 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Service */}
          <Box sx={serviceStyle}>
            {serviceItems.map((item) => (
              <Box key={item.id} sx={serviceBox}>
                <Box
                  component={Link}
                  to={item.Link}
                  sx={{
                    ...serviceList,
                    backgroundColor: item.backgroundcolor,
                  }}
                ></Box>
                <Typography
                  component={Link}
                  to={item.Link}
                  sx={{ ...roboto_20px_center, color: "#000000D9" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  component={Link}
                  to={item.Link}
                  sx={{ ...roboto_14px_center, color: "#02000C" }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Part 7 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* Title */}
          <Box sx={titleStyle}>
            <Typography variant="h2" sx={{ ...roboto_30px, color: "#02000C" }}>
              Browse by category
            </Typography>
          </Box>
          {/* Category */}
          <Box sx={categoryStyle}>
            <Box sx={categoryLeft}>
              <Box sx={categoryLeftBox}>
                <Typography sx={{ ...roboto_20px, color: "#000000D9" }}>
                  {classical.name}
                </Typography>
                <Box
                  component="img"
                  sx={{
                    ...categoryLeftImage,
                    backgroundColor: classical.color,
                  }}
                />
              </Box>
            </Box>
            <Box sx={categoryRight}>
              <Grid container spacing={3}>
                {filterCategory.map((category) => (
                  <Grid item key={category.id} xs={6}>
                    <Box sx={categoryRightBox}>
                      <Typography sx={{ ...roboto_20px, color: "#000000D9" }}>
                        {category.name}
                      </Typography>
                      <Box
                        sx={{
                          ...categoryRightImage,
                          backgroundColor: category.color,
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Part 8 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              width: "100%",
              height: "438px",
              backgroundColor: "#D9D9D9",
              margin: "100px 0px 0px 0px",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
