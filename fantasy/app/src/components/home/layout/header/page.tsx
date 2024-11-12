import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Badge,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { cognitoSignOutUrl } from "../../../../api/auth/page";
import { useHeader } from "../../../../hooks/useHeader.hook/page";
import { useLocation } from "../../../../hooks/useLocation.hook/page";
import { useCart } from "../../../../hooks/useCart.hook/page";
import * as styles from "../../../../styles/layout.style/header.style/page";
import { headerCategory as categories } from "../../../../lists/guitar.list/page";
import LocationDrawer from "../../drawer/location.drawer/page";
import PickUpDrawer from "../../drawer/pickUp.drawer/page";
import ContactUsDrawer from "../../drawer/contactUs.drawer/page";
import CartDrawer from "../../drawer/cart.drawer/page";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const headerHook = useHeader();
  const locationHook = useLocation(headerHook.setOpenLocation);
  const cartHook = useCart();

  const name = localStorage.getItem("name") || "";
  const firstLetter = name.charAt(0).toUpperCase();

  // 用户菜单
  const [signIn, setSignIn] = React.useState<null | HTMLElement>(null);
  const openSignIn = Boolean(signIn);
  const handleOpenSignIn = (event: React.MouseEvent<HTMLElement>) => {
    setSignIn(event.currentTarget);
  };
  const handleCloseSignIn = () => {
    setSignIn(null);
  };
  const [menu, setMeun] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(menu);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMeun(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMeun(null);
  };

  // 登录
  const handleSignIn = () => {
    const currentPath = window.location.pathname;
    localStorage.setItem("lastVisitedPath", currentPath);
    navigate("/signin");
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.clear();
    cartHook.setCartItemCount(0);
    cartHook.setCartItems([]);
    cartHook.setSaveItems([]);
    cartHook.setCartTotal(0);
    cartHook.handleLogout();
    handleCloseMenu();
  };

  // 跳转到 Cognito 退出页面
  const handleSignOut = () => {
    const currentPath = window.location.pathname;
    localStorage.setItem("lastVisitedPath", currentPath);
    window.location.href = cognitoSignOutUrl;
  };

  return (
    <Box>
      <Box sx={styles.headerstyles.header_frame}>
        {/* Logo Name */}
        <Box
          component={Link}
          to={`/`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "130px",
            height: "40px",
            mr: "8px",
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

        {/* 登录按钮 */}
        <Box sx={{ mx: "10px" }}>
          {localStorage.getItem("accessToken") ? (
            <Button
              onClick={handleOpenMenu}
              variant="text"
              disableFocusRipple
              startIcon={
                <Avatar
                  sx={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#FFEACE",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "center",
                      color: "#02000C",
                    }}
                  >
                    {firstLetter}
                  </Typography>
                </Avatar>
              }
              sx={styles.headerstyles.button_black}
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
                Account
              </Typography>
            </Button>
          ) : (
            <Button
              onClick={handleOpenSignIn}
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

        {/* 登录前菜单 */}
        <Menu
          anchorEl={signIn}
          keepMounted
          open={openSignIn}
          onClose={handleCloseSignIn}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                display: "flex",
                flexDirection: "column",
                width: "268px",
                height: "184px",
                padding: "8px 24px 0px 24px",
              },
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button
              onClick={handleSignIn}
              sx={{
                width: "220px",
                height: "48px",
                border: "1px solid #02000C",
                borderRadius: "4px",
                backgroundColor: "#02000C",
                textTransform: "none",
                "&:hover": { backgroundColor: "#02000C" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "center",
                  color: "#FFFFFF",
                }}
              >
                Sign In or Create Account
              </Typography>
            </Button>
            <Box
              sx={{
                width: "220px",
                border: "1px solid #DDDCDE",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "119px",
                height: "24px",
                gap: "8px",
              }}
            >
              <PersonOutlineIcon sx={{ width: "22px", height: "22px" }} />
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
                My Account
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "119px",
                height: "24px",
                gap: "8px",
              }}
            >
              <ViewInArOutlinedIcon sx={{ width: "22px", height: "22px" }} />
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
                My Orders
              </Typography>
            </Box>
          </Box>
        </Menu>

        {/* 登录后菜单 */}
        <Menu
          anchorEl={menu}
          keepMounted
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                width: "268px",
                height: "218px",
                padding: "8px 24px 0px 24px",
              },
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Welcome, {name}
            </Typography>
            <Box
              sx={{
                width: "220px",
                border: "1px solid #DDDCDE",
              }}
            />
            {/* 我的账户 */}
            <Box
              component={Link}
              to="/account"
              onClick={handleCloseMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "119px",
                height: "24px",
                color: "#02000C",
                textDecoration: "none",
                cursor: "pointer",
                gap: "8px",
                "&:hover": { borderBottom: "0.5px solid black" },
              }}
            >
              <PersonOutlineIcon sx={{ width: "22px", height: "22px" }} />
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
                My Account
              </Typography>
            </Box>
            {/* 我的订单 */}
            <Box
              component={Link}
              to="/order"
              onClick={handleCloseMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "107px",
                height: "24px",
                color: "#02000C",
                textDecoration: "none",
                cursor: "pointer",
                gap: "8px",
                "&:hover": { borderBottom: "0.5px solid black" },
              }}
            >
              <ViewInArOutlinedIcon sx={{ width: "22px", height: "22px" }} />
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
                My Orders
              </Typography>
            </Box>
            <Box
              sx={{
                width: "220px",
                border: "1px solid #DDDCDE",
              }}
            />
            {/* 退出登录 */}
            <Box
              onClick={() => {
                handleLogout();
                handleSignOut();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "92px",
                height: "24px",
                color: "#02000C",
                textDecoration: "none",
                cursor: "pointer",
                gap: "8px",
                "&:hover": { borderBottom: "0.5px solid black" },
              }}
            >
              <LogoutIcon sx={{ width: "22px", height: "22px" }} />
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
                Sign out
              </Typography>
            </Box>
          </Box>
        </Menu>

        {/* 购物车按钮 */}
        <Box sx={styles.headerstyles.link_frame}>
          <Button
            variant="text"
            disableFocusRipple
            onClick={() => {
              headerHook.setOpenCart(true);
            }}
            startIcon={
              <Badge
                badgeContent={
                  cartHook.accessToken
                    ? cartHook.cartItemCount
                    : cartHook.localCartCount
                }
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

      {/* part 2 */}
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
    </Box>
  );
};

export default Header;
