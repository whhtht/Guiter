import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const Header: React.FC = () => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #DDDCDE",
        padding: "0px 72px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "72px",
        }}
      >
        <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
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
            Logo Name
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
