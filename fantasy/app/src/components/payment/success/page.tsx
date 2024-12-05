import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../home/layout/header/page";
import { useCart } from "../../../hooks/useCart.hook/hook/page";
import { useProfile } from "../../../hooks/useProfile.hook/hook/page";

import { Box, Button, Typography } from "@mui/material";

const Success: React.FC = () => {
  const delivery = localStorage.getItem("delivery");
  const cart = localStorage.getItem("cart");
  const { fetchCart } = useCart();
  const { name, address, country, province, city, postalCode } = useProfile();

  useEffect(() => {
    if (cart === null || cart.length < 0) {
      localStorage.removeItem("cart");
    }
    fetchCart();
  }, [fetchCart, cart]);

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "96px 0px 0px 72px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "left",
            color: "02000C",
          }}
        >
          Order placed successfully! Thanks!
        </Typography>
        <Box sx={{ marginTop: "28px" }}>
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
            Order confirmation will be sent to your email.
          </Typography>
        </Box>
        {delivery === "delivery" ? (
          // 配送付款成功
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
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
                Deliver to
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#02000C",
                }}
              >
                {name}
              </Typography>
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
                , {address}, {city}, {province}, {postalCode}, {country}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexd1: "row", gap: "4px" }}>
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
                Estimated delivery by
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#02000C",
                }}
              >
                Sat, Jul 27
              </Typography>
            </Box>
          </Box>
        ) : (
          // 自取付款成功
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              marginTop: "16px",
              gap: "16px",
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
              Pickup your order at our store, 382 Yonge Street, Toronto
            </Typography>
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
              Mon - Fri, 10:00 am - 10:00 pm (EST) <br /> Sat - Sun, 10:00 am -
              6:00pm (EST)
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "725px",
            height: "80px",
            border: "1px solid #DDDCDE",
            borderRadius: "4px",
            marginTop: "32px",
            padding: "16px 24px",
          }}
        >
          <Typography>
            Looking to track your orders more easily? Create an account today!
          </Typography>
          <Button
            component={Link}
            to="/signup"
            sx={{
              width: "180px",
              height: "48px",
              border: "1px solid #02000C",
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
              Create an account
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Success;
