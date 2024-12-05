import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        mt: "300px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "60px", m: "0px 0px 10px 0px" }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "16px" }}>
        The page does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
