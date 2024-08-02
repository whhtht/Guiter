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
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Side picture
import ExampleImages from "../sideImages/colors.jpg";

// Importing styles
import {
  parts,
  mainBox,
  logoName,
  searchBar,
  buttonStyle_1,
  buttonStyle_2,
  iconStyle_1,
  iconStyle_2,
  roboto_1,
  roboto_2,
  roboto_3,
  linkStyle,
  componentPart2,
  carouselImage,
  partSpace,
} from "../../style/homePageStyle/page";

const shopItems = [
  {
    id: 1,
    name: "Guitar brand and name",
    price: "$399.99",
    condition: "Excellent",
    image: "image",
  },
  {
    id: 2,
    name: "Guitar brand and name",
    price: "$399.99",
    condition: "Excellent",
    image: "image",
  },
  {
    id: 3,
    name: "Guitar brand and name",
    price: "$399.99",
    condition: "Excellent",
    image: "image",
  },
  {
    id: 4,
    name: "Guitar brand and name",
    price: "$399.99",
    condition: "Excellent",
    image: "image",
  },
  {
    id: 5,
    name: "Guitar brand and name",
    price: "$399.99",
    condition: "Excellent",
    image: "image",
  },
];

const Homepage: React.FC = () => {
  // Items for the shop
  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    if (index < shopItems.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <Box>
      <Grid container>
        <Box sx={mainBox}>
          {/* Part 1 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* Logo Name */}
            <Box sx={parts}>
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
                  sx={buttonStyle_1}
                >
                  <Typography variant="body1" sx={roboto_1}>
                    Sign In
                  </Typography>
                </Button>
              </Box>

              {/* Shopping Cart Button */}
              <Box component={Link} to="/" sx={linkStyle}>
                <Button
                  variant="text"
                  startIcon={<ShoppingCartIcon sx={iconStyle_1} />}
                  sx={buttonStyle_1}
                >
                  <Typography variant="body1" sx={roboto_1}>
                    Cart
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* part 2 */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={parts}>
              {/* Letf Group Buttons */}
              <Box sx={componentPart2}>
                {/* Classical Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle_2}>
                    <Typography variant="body1" sx={roboto_2}>
                      Classical Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Acoustic Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle_2}>
                    <Typography variant="body1" sx={roboto_2}>
                      Acoustic Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Semi-Acoustic Guitar */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle_2}>
                    <Typography variant="body1" sx={roboto_2}>
                      Semi-Acoustic Guitar
                    </Typography>
                  </Button>
                </Box>

                {/* Ukulele */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle_2}>
                    <Typography variant="body1" sx={roboto_2}>
                      Ukulele
                    </Typography>
                  </Button>
                </Box>

                {/* Banjo */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button sx={buttonStyle_2}>
                    <Typography variant="body1" sx={roboto_2}>
                      Banjo
                    </Typography>
                  </Button>
                </Box>
              </Box>

              {/* Right Group Buttons */}
              <Box sx={componentPart2}>
                {/* Deliver */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<LocalShippingIcon sx={iconStyle_2} />}
                    sx={buttonStyle_2}
                  >
                    <Typography variant="body1" sx={roboto_2}>
                      Deliver to M5G2G4
                    </Typography>
                  </Button>
                </Box>

                {/* Pick up */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<StoreIcon sx={iconStyle_2} />}
                    sx={buttonStyle_2}
                  >
                    <Typography variant="body1" sx={roboto_2}>
                      Pick up at Toronto Downtown
                    </Typography>
                  </Button>
                </Box>

                {/* Contact Us */}
                <Box component={Link} to="/" sx={linkStyle}>
                  <Button
                    variant="text"
                    startIcon={<PhoneEnabledIcon sx={iconStyle_2} />}
                    sx={buttonStyle_2}
                  >
                    <Typography variant="body1" sx={roboto_2}>
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
        <Box sx={mainBox}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* Title */}
            <Box sx={partSpace}>
              <Typography variant="h4" sx={roboto_3}>
                Shop our featured guitars
              </Typography>
            </Box>

            {/* Shop Items List */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={handlePrev} disabled={index === 0}>
                <ArrowBackIos />
              </Button>
            </Box>
            <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  transform: `translateX(-${index * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {shopItems.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      width: "240px",
                      height: "240px",
                      margin: "0 10px",
                      flexShrink: 0,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: "240px",
                          height: "240px",
                          backgroundColor: "grey",
                        }}
                      />
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography sx={{ color: "textSecondary" }}>
                        {item.condition}
                      </Typography>
                      <Typography variant="h5">{item.price}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
            <Button
              onClick={handleNext}
              disabled={index === shopItems.length - 1}
            >
              <ArrowForwardIos />
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Homepage;
