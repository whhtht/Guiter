import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "72px",
        backgroundColor: "#02000C",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "38px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "left",
            color: "#FFFFFF",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Privacy policy
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "left",
            color: "#FFFFFF",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Terms of use
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "left",
            color: "#FFFFFF",
          }}
        >
          © 2024, Store name
        </Typography>
      </Box>
    </Box>
  );
};
