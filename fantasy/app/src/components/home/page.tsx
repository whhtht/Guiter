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
import ExampleImages from "../../images/sideImages/colors.jpg";

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
  roboto_16px,
  roboto_14px,
  roboto_30px,
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
  roboto_20px,
  roboto_14px_center,
  roboto_20px_center,
  serviceStyle,
  serviceBox,
  serviceList,
} from "../../styles/homepage/hompage.style.page";

// Featured guitars
import { featuredGuitars } from "../../images/featuredGuitars/page";

// New arrivals
import { newArrivals } from "../../images/newArrivals/page";

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

  const items = [
    {
      id: 1,
      name: "Guitar 1",
      backgroundcolor: "#F0F0F0",
      title: "Free and Insured Shipping on Every Order",
      text: "",
      Link: "/",
    },
    {
      id: 2,
      name: "Guitar 2",
      backgroundcolor: "#F0F0F0",
      title: "Expert Customer Service",
      text: "",
      Link: "/",
    },
    {
      id: 3,
      name: "Guitar 3",
      backgroundcolor: "#F0F0F0",
      title: "In-Store Pick Up",
      text: "We provide flexibility for you to pick up your guitars in person.",
      Link: "/",
    },
    {
      id: 4,
      name: "Guitar 4",
      backgroundcolor: "#F0F0F0",
      title: "Pro Selection on Each Guitar",
      text: "Our experts carefully review each guitar to guarantee you the quality.",
      Link: "/",
    },
  ];

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
          <Carousel prevIcon={null} nextIcon={null}>
            <Carousel.Item interval={2000}>
              <Box component={Link} to="/">
                <Box component="img" src={ExampleImages} sx={carouselImage} />
              </Box>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Box component={Link} to="/">
                <Box component="img" src={ExampleImages} sx={carouselImage} />
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
            <IconButton
              onClick={handlePrevItems}
              disabled={indexItems === 0}
              sx={leftButton}
            >
              <ArrowBackIos sx={arrowBack} />
            </IconButton>
            <IconButton
              onClick={handleNextItems}
              disabled={indexItems >= featuredGuitars.length - itemToShow}
              sx={rightButton}
            >
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
            <IconButton
              onClick={handlePrevNewArrivals}
              disabled={indexNewArrivals === 0}
              sx={leftButton}
            >
              <ArrowBackIos sx={arrowBack} />
            </IconButton>
            <IconButton
              onClick={handleNextNewArrivals}
              disabled={
                indexNewArrivals >= newArrivals.length - newArrivalsToShow
              }
              sx={rightButton}
            >
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
            {items.map((item) => (
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










          
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
