import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Badge,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useHeader } from "../../../hooks/useHeader.hook/page";
import { useLocation } from "../../../hooks/useLocation.hook/page";
import { useCart } from "../../../hooks/useCart.hook/page";
import * as styles from "../../../styles/layout.style/header.style/page";
import * as category from "../../../lists/category.list/page";
import LocationDrawer from "../../../drawer/location.drawer/page";
import PickUpDrawer from "../../../drawer/pickUp.drawer/page";
import ContactUsDrawer from "../../../drawer/contactUs.drawer/page";
import CartDrawer from "../../../drawer/cart.drawer/page";

const Header: React.FC = () => {
  const headerHook = useHeader();
  const locationHook = useLocation(headerHook.setOpenLocation);
  const cartHook = useCart();


  return (
    <Box>
      {/* Part 1 */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* Logo Name */}
        <Box sx={styles.headerstyles.header_frame}>
          <Box
            component={Link}
            to={`/`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "130px",
              height: "40px",
              mx: "8px",
              gap: "16px",
              textDecoration: "none",

              flexShrink: 0,
            }}
          >
            <Typography sx={styles.headerstyles.logoName}>Logo Name</Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, height: "40px", mx: "5px" }}>
            <Autocomplete
              freeSolo
              options={headerHook.searchHistory}
              sx={styles.headerstyles.autocomplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Find guitars you love..."
                  size="small"
                  variant="outlined"
                  value={headerHook.searchTerm}
                  onChange={(e) => headerHook.setSearchTerm(e.target.value)}
                  onKeyDown={headerHook.handleKeyDown}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {/* Sign In Button */}
          <Box sx={{ mx: "10px" }}>
            <Button
              component={Link}
              to="/signin"
              variant="text"
              disableFocusRipple
              startIcon={
                <PersonOutlineIcon sx={styles.headerstyles.icon_32px} />
              }
              sx={styles.headerstyles.button_black}
            >
              <Typography
                variant="body1"
                sx={styles.headerstyles.roboto_16px_FFFFFF}
              >
                Sign In
              </Typography>
            </Button>
          </Box>

          {/* Shopping Cart Button */}
          <Box sx={styles.headerstyles.link_frame}>
            <Button
              variant="text"
              disableFocusRipple
              onClick={() => {
                headerHook.setOpenCart(true);
              }}
              startIcon={
                <Badge
                  badgeContent={cartHook.cartItemCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FFEACE",
                      color: "#000000",
                      top: "5px",
                      right: "5px",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={styles.headerstyles.icon_32px} />
                </Badge>
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                color: "#FFFFFF",
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
                variant="body1"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#FFFFFF",
                }}
              >
                Cart
              </Typography>
            </Button>
            <CartDrawer open={headerHook.openCart} setOpen={headerHook.setOpenCart} />
          </Box>
        </Box>
      </Grid>

      {/* part 2 */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={styles.headerstyles.navigation_frame}>
          {/* Letf Group Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
            }}
          >
            {category.table.list.map((category) => (
              <Box key={category.id} sx={styles.headerstyles.left_group_frame}>
                <Button
                  key={category.id}
                  component={Link}
                  to={`/${category.name}`}
                  disableFocusRipple
                  sx={styles.headerstyles.button_white}
                >
                  <Typography
                    variant="body1"
                    sx={styles.headerstyles.roboto_14px_02000C}
                  >
                    {category.name}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Box>

          {/* Right Group Buttons */}
          <Box sx={styles.headerstyles.right_group}>
            {/* Deliver */}
            <Box sx={styles.headerstyles.right_group_frame}>
              <Button
                variant="text"
                startIcon={
                  <LocalShippingIcon sx={styles.headerstyles.icon_22px} />
                }
                disableFocusRipple
                sx={styles.headerstyles.button_white}
                onClick={() => {
                  headerHook.setOpenLocation(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={styles.headerstyles.roboto_14px_02000C}
                >
                  Deliver to{" "}
                  {locationHook.storedZipCode
                    ? locationHook.storedZipCode
                    : " M5G 2G4 "}
                </Typography>
              </Button>

              <LocationDrawer
                open={headerHook.openLocation}
                setOpen={headerHook.setOpenLocation}
              />
            </Box>

            {/* Pick up */}
            <Box sx={styles.headerstyles.right_group_frame}>
              <Button
                variant="text"
                startIcon={<StoreIcon sx={styles.headerstyles.icon_22px} />}
                disableFocusRipple
                sx={styles.headerstyles.button_white}
                onClick={() => {
                  headerHook.setOpenPickUp(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={styles.headerstyles.roboto_14px_02000C}
                >
                  Pick up at Toronto Downtown
                </Typography>
              </Button>
              <PickUpDrawer
                open={headerHook.openPickUp}
                setOpen={headerHook.setOpenPickUp}
              />
            </Box>

            {/* Contact Us */}
            <Box sx={styles.headerstyles.right_group_frame}>
              <Button
                variant="text"
                startIcon={
                  <PhoneEnabledIcon sx={styles.headerstyles.icon_22px} />
                }
                disableFocusRipple
                sx={styles.headerstyles.button_white}
                onClick={() => {
                  headerHook.setOpenContactUs(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={styles.headerstyles.roboto_14px_02000C}
                >
                  Contact Us
                </Typography>
              </Button>
              <ContactUsDrawer
                open={headerHook.openContactUs}
                setOpen={headerHook.setOpenContactUs}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Header;
