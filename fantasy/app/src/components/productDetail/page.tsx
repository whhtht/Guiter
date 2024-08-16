import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Mui Components
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { product } from "../../lists/classicalGuitar.list/page";

type Product = {
  id: number;
  name: string;
  price: number;
  review: string;
  image: ImageItems[];
};
type ImageItems = { image: string; title: string };

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const products: Product = product.product1[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < products.image.length - 1 ? prevIndex + 1 : 0
    );
  };

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
                width: "58%",
                height: "200vh",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "100%",
                  margin: "0px 0px 0px 0px",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <ImageList
                    cols={1}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100% ",
                      height: "100%",
                    }}
                  >
                    {products.image.map((item, index) => (
                      <ImageListItem
                        key={item.image}
                        sx={{
                          width: "100% ",
                          height: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "115px",
                            height: "115px",
                            overflow: "hidden",
                            backgroundColor: "#EFEFEF",
                            border:
                              selectedImageIndex === index
                                ? "1px solid #02000C"
                                : "none",
                            borderRadius: "8px",
                          }}
                        >
                          <Box
                            component="img"
                            src={`${item.image}?w=100&h=100&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            sx={{
                              height: "100%",
                            }}
                          />
                        </Box>
                      </ImageListItem>
                    ))}
                  </ImageList>
                  <Box />
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    width: "630px",
                    height: "630px",
                    backgroundColor: "#EFEFEF",
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "white",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <Box
                    component="img"
                    src={products.image[selectedImageIndex].image}
                    alt={products.image[selectedImageIndex].title}
                  />
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: "absolute",
                      top: "48%",
                      right: "16px",
                      backgroundColor: "white",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
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

//   const products = product.product1[0];

//   return (
//     <Box sx={{ margin: "18px 72px 0px 72px" }}>
//       <Grid container>
//         {/* 左侧图片部分 */}
//         <Grid item xs={12}>
//           <Box sx={{ display: "flex", justifyContent: "center" }}>

//             <ImageList cols={1} gap={20} sx={{ width: "120px" }}>
//               {products.image.map((item) => (
//                 <ImageListItem key={item.image} sx={{ width: "110px", height: "110px", overflow: "hidden" }}>
//                   <Box
//                     component="img"
//                     src={item.image}
//                     alt={item.title}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       objectPosition: "center",
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       boxShadow: "0 0 5px rgba(0,0,0,0.2)",
//                       transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                       "&:hover": {
//                         transform: "scale(1.05)",
//                         boxShadow: "0 0 10px rgba(0,0,0,0.5)",
//                       },
//                     }}
//                   />
//                 </ImageListItem>
//               ))}
//             </ImageList>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProductDetail;
