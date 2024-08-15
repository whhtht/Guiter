import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./header/page";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  let category, productId;
  if (pathSegments.length >= 1) {
    category = pathSegments[1]; // 获取category，解码可能的URL编码
    productId = pathSegments[2]; // 获取productId，解码可能的URL编码
  }

  // 定义所有明确的需要显示的路径
  const validPaths = [
    "/home",
    `/home/${category}`,
    `/home/${category}/${productId}`,
  ];

  // 检查当前路径是否在有效路径列表中
  const isPathValid = validPaths.some((validPath) => {
    // 检查当前路径无视大小写
    return location.pathname.toLowerCase().startsWith(validPath.toLowerCase());
  });

  console.log("Category:", category); // 输出category
  console.log("Product ID:", productId); // 输出productId
  console.log("Path Segments:", pathSegments); // 输出路径分段
  console.log("Valid Paths:", validPaths); // 输出有效路径
  console.log("Current Path:", location.pathname); // 输出当前路径
  console.log("Is Path Valid:", isPathValid); // 输出路径是否有效

  return (
    <Box>
      {isPathValid && <Header />}
      <Box component="main">{children}</Box>
    </Box>
  );
};

export default Layout;
