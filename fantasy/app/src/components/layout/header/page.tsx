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
  Menu,
  MenuItem,
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
import { headerCategory as categories } from "../../../lists/guitar.list/page";
import LocationDrawer from "../../../drawer/location.drawer/page";
import PickUpDrawer from "../../../drawer/pickUp.drawer/page";
import ContactUsDrawer from "../../../drawer/contactUs.drawer/page";
import CartDrawer from "../../../drawer/cart.drawer/page";

const Header: React.FC = () => {
  const headerHook = useHeader();
  const locationHook = useLocation(headerHook.setOpenLocation);
  const cartHook = useCart();

  // 用户菜单
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    cartHook.setCartItemCount(0);
    cartHook.setCartItems([]);
    cartHook.setCartTotal("0");
    handleCloseMenu();
  };

  const getEmailFromToken = () => {
    const token = localStorage.getItem("idToken");
    if (!token) return null;
    // JWT 格式为三部分: header.payload.signature
    const payload = token.split(".")[1]; // 取出第二部分 payload
    if (!payload) return null;
    // 解码 Base64 编码的 payload
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    // 从 payload 中提取邮箱信息 (假设 JWT 中的邮箱字段是 'email')
    return payloadObject.email;
  };

  // 获取邮箱的前缀部分
  const getMaskedEmail = () => {
    const email = getEmailFromToken();
    if (!email) return null;
    // 使用正则表达式，匹配 @ 之前的部分
    const username = email.split("@")[0];
    return username;
  };

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
            {localStorage.getItem("idToken") ? (
              <Button
                onClick={handleOpenMenu}
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
                  Profile
                </Typography>
              </Button>
            ) : (
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
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  width: "150px",
                },
              },
            }}
          >
            <Box sx={{ ml: "15px" }}>
              <Typography>Hi {getMaskedEmail()} </Typography>
            </Box>

            <MenuItem>
              <Typography>User Detail</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography>Logic Out</Typography>
            </MenuItem>
          </Menu>

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
            <CartDrawer
              open={headerHook.openCart}
              setOpen={headerHook.setOpenCart}
            />
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
            {categories.map((category, index) => (
              <Box key={index} sx={styles.headerstyles.left_group_frame}>
                <Button
                  component={Link}
                  to={`/productlist/${category}`}
                  disableFocusRipple
                  sx={styles.headerstyles.button_white}
                >
                  <Typography
                    variant="body1"
                    sx={styles.headerstyles.roboto_14px_02000C}
                  >
                    {category}
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
