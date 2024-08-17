import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../layout/header/page";

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  console.log("category in product list", category);
  console.log("productId in product list", productId);

  const productLists = [
    {
      id: 1,
      name: "Guitar Inventory ID",
    },
    {
      id: 2,
      name: "Guitar Inventory ID 1",
    },
    {
      id: 3,
      name: "Guitar Inventory ID 2",
    },
    {
      id: 4,
      name: "Guitar Inventory ID 3",
    },
  ];

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box component={Link} to={`/home`}>
          home
        </Box>
        {productLists.map((product) => (
          <Box
            key={product.id}
            component={Link}
            to={`/home/${category}/${product.name}`}
          >
            {product.name}
          </Box>
        ))}
      </Box>{" "}
    </Box>
  );
};

export default ProductDetail;
