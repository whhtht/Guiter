import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useProduct } from "../../../../hooks/useProduct.hook/hook/page";

import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllCategories: React.FC = () => {
  const location = useLocation();
  const { selectedCategory, product, handleSort } = useProduct();

  // 排序逻辑
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState("Most Recent First");
  // 点击排序按钮
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (sortOption: string) => {
    setSelectedSort(sortOption);
    handleSort(sortOption);
    handleClose();
  };
  const isMenuOpen = Boolean(anchorEl);

  // 分页逻辑
  const [page, setPage] = useState(1);
  // 每页显示的产品
  const itemsPerPage = 9;
  // 总页数
  const totalPages = Math.ceil(product.length / itemsPerPage);
  // 改变页码
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // 显示产品
  const displayedProducts = product.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, selectedSort]);

  return (
    <Box id="top">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* 分类标题 */}
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          {selectedCategory}
        </Typography>

        {/* 筛选物品顺序 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            margin: "0px 0px 20px 0px",
          }}
        >
          {/* 物品数量 */}
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
            {product.length} Results
          </Typography>

          {/* 排序 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Sort by:
            </Typography>
            <Button
              onClick={handleClick}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
              sx={{ color: "#02000C", textTransform: "none" }}
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
                {selectedSort}
              </Typography>
            </Button>

            {/* Menu */}
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={isMenuOpen}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    width: "258px",
                    Height: "152px",
                  },
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* Most Recent First */}
              <MenuItem
                onClick={() => handleMenuItemClick("Most Recent First")}
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
                  Most Recent First
                </Typography>
              </MenuItem>

              {/* Low to High */}
              <MenuItem
                onClick={() => handleMenuItemClick("Price Low to High")}
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
                  Price Low to High
                </Typography>
              </MenuItem>

              {/* High to Low */}
              <MenuItem
                onClick={() => handleMenuItemClick("Price High to Low")}
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
                  Price High to Low
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* 物品列表 */}
        {product.length === 0 ? (
          <Box sx={{ height: "1260px" }} />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              height: "1260px",
              gap: "15px",
            }}
          >
            {displayedProducts.map((item, index) => (
              <Box key={index}>
                <Box
                  component={HashLink}
                  to={`/product/${encodeURIComponent(item.name)}#top`}
                  scroll={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "instant",
                    });
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    gap: "5px",
                  }}
                >
                  {/* 图片 */}
                  <Box
                    key={index}
                    sx={{
                      width: "308px",
                      height: "308px",
                      border: "1px solid #02000C",
                      borderRadius: "8px",
                      objectFit: "cover",
                      overflow: "hidden",
                      margin: "0px 0px 5px 0px",
                    }}
                  />
                  {/* 物品名字 */}
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
                    {item.name}
                  </Typography>
                  {/* 物品状态 */}
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
                    Condition: {item.condition}
                  </Typography>
                  {/* 物品价格 */}
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
                    $ {item.price}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* 分页 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "80px 0px 0px 0px",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            size="large"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  ...(item.type === "previous" || item.type === "next"
                    ? {
                        borderRadius: "50%",
                        width: "56px",
                        height: "56px",
                        border: "1px solid #DDDCDE",
                      }
                    : {
                        borderRadius: "0%",
                        margin: "0 8px",
                        "&.Mui-selected": {
                          backgroundColor: "#FFFFFF",
                          borderBottom: "2px solid #02000C",
                        },
                      }),
                }}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AllCategories;
