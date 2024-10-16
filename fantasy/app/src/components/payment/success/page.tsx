import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import Header from "../../layout/header/page";

const Success: React.FC = () => {
  const delivery = localStorage.getItem("delivery");

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginTop: "96px",
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
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "16px",
              gap: "16px",
            }}
          >
            <Typography>
              Shipping to Kelly Chang, 433-633 Yoo Street, Unit 316, M5G2G4,
              Toronto, ON
            </Typography>
            <Typography>Estimated delivery by Sat, Jul 27</Typography>
          </Box>
        ) : (
          // 自取付款成功
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                textAlign: "center",
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
