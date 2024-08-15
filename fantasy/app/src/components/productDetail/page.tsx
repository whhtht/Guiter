import React from "react";
import { Box, Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link, useParams } from "react-router-dom";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  return (
    <Box sx={{ margin: "18px 72px 0px 72px" }}>
      <Grid container>
        {/* Part 1 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "column",
              flexDirection: "row",
              margin: "0px 0px 18px 0px",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Box component={Link} to="/home" sx={{ textDecoration: "none" }}>
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
                  Home
                </Typography>
              </Box>
              <Box
                component={Link}
                to={`/home/${category}`}
                sx={{ textDecoration: "none" }}
              >
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
                  {category}
                </Typography>
              </Box>
              <Box
                component={Link}
                to={`/home/${category}/${productId}`}
                sx={{ textDecoration: "none" }}
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
                  {productId}
                </Typography>
              </Box>
            </Breadcrumbs>
          </Box>
        </Grid>

        {/* Part 2 */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              margin: "0px 0px 0px 0px",
            }}
          >
            <Box
              sx={{
                width: "59%",
                height: "100vh",
                border: "1px solid #02000C",
                flexShrink: 0,
              }}
            ></Box>
            <Box
              sx={{ width: "502px", height: "100vh", backgroundColor: "green" }}
            ></Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
