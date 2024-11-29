import React from "react";
import { HashLink } from "react-router-hash-link";
import { useCart } from "../../../../hooks/useCart.hook/hook/page";
import { Drawer, Box, IconButton, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const cartHook = useCart();

  return (
    <Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            positions: "relative",
            width: "420px",
            height: "100%",
            padding: "30px 30px 0px 30px",
          }}
        >
          {/* Top */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="large" sx={{ color: "#02000C" }} />
              </IconButton>
            </Box>
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
              Your shopping cart (
              {cartHook.accessToken
                ? cartHook.cartItemCount
                : cartHook.localCartCount}
              )
            </Typography>
            <Box
              sx={{
                margin: "5px 0px 0px 0px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#008A02",
                }}
              >
                {cartHook.accessToken
                  ? cartHook.cartItemCount
                  : cartHook.localCartCount}{" "}
                item added to cart!
              </Typography>
            </Box>
          </Box>

          {/* Middle */}
          <Box
            sx={{
              overflowY: "auto",
              height: "calc(100% - 107px)",
            }}
          >
            {cartHook.accessToken
              ? cartHook.cartItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      borderBottom: "1px solid #DDDCDE",
                      padding: "20px 0px 20px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "66px",
                        height: "66px",
                        borderRadius: "8px",
                        backgroundColor: "#EFEFEF",
                      }}
                    >
                      <Box component="img" sx={{ height: "100%" }} />
                    </Box>
                    <Box
                      sx={{
                        width: "274px",
                      }}
                    >
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
                        {item.product.name}
                      </Typography>
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
                        {item.product.condition}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          ${Number(item.product.price).toFixed(2)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <IconButton onClick={() => cartHook.addToCart(item)}>
                            <AddCircleOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                                color: "#02000C",
                              }}
                            />
                          </IconButton>
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
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() => cartHook.putFromCart(item)}
                          >
                            <RemoveCircleOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                                color: "#02000C",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <IconButton
                          onClick={() => cartHook.removeFromCart(item)}
                        >
                          <DeleteOutlineIcon
                            sx={{
                              width: "22px",
                              height: "22px",
                              color: "#02000C",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))
              : Array.isArray(cartHook.localCartItems) &&
                cartHook.localCartItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      borderBottom: "1px solid #DDDCDE",
                      padding: "20px 0px 20px 0px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "66px",
                        height: "66px",
                        borderRadius: "8px",
                        backgroundColor: "#EFEFEF",
                      }}
                    >
                      <Box component="img" sx={{ height: "100%" }} />
                    </Box>
                    <Box
                      sx={{
                        width: "274px",
                      }}
                    >
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
                        {item.product.name}
                      </Typography>
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
                        {item.product.condition}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "28px",
                            textAlign: "left",
                            color: "#000000D9",
                          }}
                        >
                          ${Number(item.product.price).toFixed(2)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <IconButton onClick={() => cartHook.addToCart(item)}>
                            <AddCircleOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                                color: "#02000C",
                              }}
                            />
                          </IconButton>
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
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() => cartHook.putFromCart(item)}
                          >
                            <RemoveCircleOutlineIcon
                              sx={{
                                width: "22px",
                                height: "22px",
                                color: "#02000C",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <IconButton
                          onClick={() => cartHook.removeFromCart(item)}
                        >
                          <DeleteOutlineIcon
                            sx={{
                              width: "22px",
                              height: "22px",
                              color: "#02000C",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
          </Box>
        </Box>

        {/* bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #DDDCDE",
            padding: "0px 32px 0px 32px",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "24px",
              margin: "15px 0px 0px 0px",
            }}
          >
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
              Subtotal
            </Typography>
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
              ${cartHook.accessToken ? cartHook.cartTotal : cartHook.localTotal}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "24px 0px 32px 0px",
            }}
          >
            <Button
              component={HashLink}
              to="/cart#top"
              scroll={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
              }}
              sx={{
                width: "170px",
                height: "48px",
                border: "1px solid #76757C",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#02000C",
                }}
              >
                View Full Cart
              </Typography>
            </Button>
            <Button
              component={HashLink}
              to="/checkout#top"
              scroll={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
              }}
              sx={{
                width: "170px",
                height: "48px",
                border: "1px solid #02000C",
                backgroundColor: "#02000C",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#02000C",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                }}
              >
                Check Out Now
              </Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CartDrawer;
