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
import { useLocation } from "../../../../hooks/useLocation.hook/page";
import { useCart } from "../../../../hooks/useCart.hook/hook/page";
import { useProduct } from "../../../../hooks/useProduct.hook/hook/page";
import LocationDrawer from "../../drawer/location.drawer/page";
import PickUpDrawer from "../../drawer/pickUp.drawer/page";
import ContactUsDrawer from "../../drawer/contactUs.drawer/page";
import CartDrawer from "../../drawer/cart.drawer/page";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const [openContactUs, setOpenContactUs] = React.useState(false);
  const [openCart, setOpenCart] = React.useState<boolean>(false);
  const locationHook = useLocation(setOpenLocation);
  const cartHook = useCart();
  const {
    HeaderCategory,
    setSelectedCategory,
    handleFilterChange,
    searchTerm,
    searchResults,
    handleSearchChange,
    handleOptionSelect,
  } = useProduct();

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

  // 分类按钮
  const handleCategoryClick = (value: string) => {
    setSelectedCategory(value);
    handleFilterChange({ category: value });
    if (value === "All Categories") {
      navigate("/productlist");
    }
    if (value === "Classical Guitar") {
      navigate("/productlist/classical");
    }
    if (value === "Acoustic Guitar") {
      navigate("/productlist/acoustic");
    }
    if (value === "Semi-Acoustic Guitar") {
      navigate("/productlist/semiacoustic");
    }
    if (value === "Ukulele") {
      navigate("/productlist/ukulele");
    }
    if (value === "Banjo") {
      navigate("/productlist/banjo");
    }
  };

  return (
    <Box>
      {/* part 1 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "78px",
          backgroundColor: "#02000C",
          padding: "16px 72px",
        }}
      >
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
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "28px",
              textAlign: "left",
              color: "#FFFFFF",
            }}
          >
            Logo Name
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, height: "40px", mx: "5px" }}>
          <Autocomplete
            freeSolo
            inputValue={searchTerm}
            options={searchResults}
            onInputChange={(_, newValue) => {
              handleSearchChange(newValue);
            }}
            onChange={(_, newValue) => {
              if (newValue) {
                handleOptionSelect(newValue);
              }
            }}
            sx={{
              borderRadius: "4px",
              border: "1px solid #02000C",
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "left",
              color: "#595959",
              backgroundColor: "#FFFFFF",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Find guitars you love..."
                size="small"
                variant="outlined"
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
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                color: "#FFFFFF",
                backgroundColor: "#02000C",
                textTransform: "none",
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
                Account
              </Typography>
            </Button>
          ) : (
            <Button
              onClick={handleOpenSignIn}
              variant="text"
              disableFocusRipple
              startIcon={
                <PersonOutlineIcon
                  sx={{
                    width: "32px",
                    height: "32px",
                  }}
                />
              }
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                color: "#FFFFFF",
                backgroundColor: "#02000C",
                textTransform: "none",
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
        <Box
          sx={{
            ml: "10px",
          }}
        >
          <Button
            variant="text"
            disableFocusRipple
            onClick={() => {
              setOpenCart(true);
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
                <ShoppingCartIcon
                  sx={{
                    width: "32px",
                    height: "32px",
                  }}
                />
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
          <CartDrawer open={openCart} setOpen={setOpenCart} />
        </Box>
      </Box>

      {/* part 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "48px",
          borderBottom: "1px solid #DDDCDE",
          padding: "0px 72px",
        }}
      >
        {/* 左边按钮 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "552px",
            height: "48px",
          }}
        >
          {HeaderCategory.map((value, index) => (
            <Box
              key={index}
              sx={{
                borderBottom: "2px solid #FFFFFF",
                "&:hover": {
                  borderBottom: "2px solid #02000C",
                  transition: "width 0.3s ease-in-out",
                },
              }}
            >
              <Button
                onClick={() => handleCategoryClick(value)}
                disableFocusRipple
                sx={{
                  height: "45px",
                  textTransform: "none",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                  },
                  "&.Mui-focusVisible": {
                    boxShadow: "0 0 0 2px #5796dc",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    textAlign: "left",
                    color: "#02000C",
                  }}
                >
                  {value}
                </Typography>
              </Button>
            </Box>
          ))}
        </Box>

        {/* Right Group Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "559px",
            height: "48px",
          }}
        >
          {/* Deliver */}
          <Box
            sx={{
              borderBottom: "2px solid #FFFFFF",
              "&:hover": {
                borderBottom: "2px solid #02000C",
                transition: "width 0.3s ease-in-out",
              },
            }}
          >
            <Button
              variant="text"
              startIcon={
                <LocalShippingIcon
                  sx={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              }
              disableFocusRipple
              sx={{
                height: "45px",
                color: "#02000C",
                textTransform: "none",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&.Mui-focusVisible": {
                  boxShadow: "0 0 0 2px #5796dc",
                },
              }}
              onClick={() => {
                setOpenLocation(true);
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Deliver to{" "}
                {locationHook.storedZipCode
                  ? locationHook.storedZipCode
                  : " M5G 2G4 "}
              </Typography>
            </Button>

            <LocationDrawer open={openLocation} setOpen={setOpenLocation} />
          </Box>

          {/* Pick up */}
          <Box
            sx={{
              borderBottom: "2px solid #FFFFFF",
              "&:hover": {
                borderBottom: "2px solid #02000C",
                transition: "width 0.3s ease-in-out",
              },
            }}
          >
            <Button
              variant="text"
              startIcon={
                <StoreIcon
                  sx={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              }
              disableFocusRipple
              sx={{
                height: "45px",
                color: "#02000C",
                textTransform: "none",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&.Mui-focusVisible": {
                  boxShadow: "0 0 0 2px #5796dc",
                },
              }}
              onClick={() => {
                setOpenPickUp(true);
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Pick up at Toronto Downtown
              </Typography>
            </Button>
            <PickUpDrawer open={openPickUp} setOpen={setOpenPickUp} />
          </Box>

          {/* Contact Us */}
          <Box
            sx={{
              borderBottom: "2px solid #FFFFFF",
              "&:hover": {
                borderBottom: "2px solid #02000C",
                transition: "width 0.3s ease-in-out",
              },
            }}
          >
            <Button
              variant="text"
              startIcon={
                <PhoneEnabledIcon
                  sx={{
                    width: "22px",
                    height: "22px",
                  }}
                />
              }
              disableFocusRipple
              sx={{
                height: "45px",
                color: "#02000C",
                textTransform: "none",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&.Mui-focusVisible": {
                  boxShadow: "0 0 0 2px #5796dc",
                },
              }}
              onClick={() => {
                setOpenContactUs(true);
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Contact Us
              </Typography>
            </Button>
            <ContactUsDrawer open={openContactUs} setOpen={setOpenContactUs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
