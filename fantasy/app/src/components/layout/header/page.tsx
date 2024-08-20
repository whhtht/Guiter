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
import * as styles from "../../../styles/layout.style/header.style/page";
import * as category from "../../../lists/category.list/page";
import LocationDrawer from "../../../drawer/location.drawer/page";
import PickUpDrawer from "../../../drawer/pickUp.drawer/page";
import ContactUsDrawer from "../../../drawer/contactUs.drawer/page";

const Header: React.FC = () => {
  const functions = useHeader();
  const locationFunctions = useLocation(functions.setOpenLocation);

  return (
    <Box>
      {/* Part 1 */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* Logo Name */}
        <Box sx={styles.headerstyles.headerFrame}>
          <Typography sx={styles.headerstyles.logoName}>Logo Name</Typography>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, height: "40px", mx: "5px" }}>
            <Autocomplete
              freeSolo
              options={functions.searchHistory}
              sx={styles.headerstyles.autocomplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Find guitars you love..."
                  size="small"
                  variant="outlined"
                  value={functions.searchTerm}
                  onChange={(e) => functions.setSearchTerm(e.target.value)}
                  onKeyDown={functions.handleKeyDown}
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
          <Box sx={styles.headerstyles.linkFrame}>
            <Button
              component={Link}
              to="/"
              variant="text"
              disableFocusRipple
              startIcon={
                <PersonOutlineIcon sx={styles.headerstyles.iconStyle_32px} />
              }
              sx={styles.headerstyles.buttonStyle_black}
            >
              <Typography variant="body1" sx={styles.headerstyles.roboto_16px}>
                Sign In
              </Typography>
            </Button>
          </Box>

          {/* Shopping Cart Button */}
          <Box sx={{ mx: "10px" }}>
            <Button
              component={Link}
              to="/homepage"
              variant="text"
              disableFocusRipple
              startIcon={
                <Badge
                  badgeContent={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FFEACE",
                      color: "#000000",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ width: "32px", height: "32px" }} />
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
          </Box>
        </Box>
      </Grid>

      {/* part 2 */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={styles.headerstyles.navigationFrame}>
          {/* Letf Group Buttons */}
          <Box sx={styles.headerstyles.componentSpace}>
            {category.table.list.map((category) => (
              <Box key={category.id} sx={styles.headerstyles.linkFrame}>
                <Button
                  key={category.id}
                  component={Link}
                  to={`/home/${category.name}`}
                  disableFocusRipple
                  sx={styles.headerstyles.buttonStyle_white}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      ...styles.headerstyles.roboto_14px,
                      color: "#02000C",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Box>

          {/* Right Group Buttons */}
          <Box sx={styles.headerstyles.componentSpace}>
            {/* Deliver */}
            <Box sx={styles.headerstyles.linkFrame}>
              <Button
                variant="text"
                startIcon={
                  <LocalShippingIcon sx={styles.headerstyles.iconStyle_22px} />
                }
                disableFocusRipple
                sx={styles.headerstyles.buttonStyle_white}
                onClick={() => {
                  functions.setOpenLocation(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ ...styles.headerstyles.roboto_14px, color: "#02000C" }}
                >
                  Deliver to{" "}
                  {locationFunctions.storedZipCode
                    ? locationFunctions.storedZipCode
                    : " M5G 2G4 "}
                </Typography>
              </Button>

              <LocationDrawer
                open={functions.openLocation}
                setOpen={functions.setOpenLocation}
              />
            </Box>

            {/* Pick up */}
            <Box sx={styles.headerstyles.linkFrame}>
              <Button
                variant="text"
                startIcon={
                  <StoreIcon sx={styles.headerstyles.iconStyle_22px} />
                }
                disableFocusRipple
                sx={styles.headerstyles.buttonStyle_white}
                onClick={() => {
                  functions.setOpenPickUp(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ ...styles.headerstyles.roboto_14px, color: "#02000C" }}
                >
                  Pick up at Toronto Downtown
                </Typography>
              </Button>
              <PickUpDrawer
                open={functions.openPickUp}
                setOpen={functions.setOpenPickUp}
              />
            </Box>

            {/* Contact Us */}
            <Box sx={styles.headerstyles.linkFrame}>
              <Button
                variant="text"
                startIcon={
                  <PhoneEnabledIcon sx={styles.headerstyles.iconStyle_22px} />
                }
                disableFocusRipple
                sx={styles.headerstyles.buttonStyle_white}
                onClick={() => {
                  functions.setOpenContactUs(true);
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ ...styles.headerstyles.roboto_14px, color: "#02000C" }}
                >
                  Contact Us
                </Typography>
              </Button>
              <ContactUsDrawer
                open={functions.openContactUs}
                setOpen={functions.setOpenContactUs}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Header;
