import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.setAttribute("hideHeaderFooter", "true");
    return () => {
      document.body.removeAttribute("hideHeaderFooter");
    };
  }, []);

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
        The page {location.pathname} does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
