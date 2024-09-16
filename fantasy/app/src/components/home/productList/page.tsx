import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  Grid,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Menu,
  MenuItem,
  Button,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getProductList } from "../../../api/product/page";

import {
  category as categories,
  brand,
  condition,
  handedness,
  guitar,
} from "../../../lists/guitar.list/page";
import Header from "../../layout/header/page";
import Footer from "../../layout/footer/page";

import * as styles from "../../../styles/product.style/product.list/page";

interface Product {
  name: string;
  price: string;
  specificationDetail: {
    Condition: string;
    Categories: string;
    Brand: string;
  };
}

// 展开/折叠通用逻辑
const useCollapse = (initialState = true) => {
  const [collapse, setCollapse] = useState(initialState);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return {
    collapse,
    handleCollapse,
  };
};

const ProductDetail: React.FC = () => {
  const { category } = useParams<{
    category: string;
  }>();
  const navigate = useNavigate();

  // 获取后端产品列表
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    getProductList().then((data) => {
      setProduct(data);
    });
  }, []);

  // 展开/折叠逻辑
  const categoryList = useCollapse(true);
  const brandForm = useCollapse(false);
  const priceList = useCollapse(false);
  const conditionForm = useCollapse(false);
  const handednessForm = useCollapse(false);

  // 类别查询逻辑
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate(`/productlist/${category}`); // 跳转到指定的类别
  };
  //当category改变时，执行useEffect里的函数
  useEffect(() => {
    setSelectedCategory(category || "All Categories"); //设置选中的类别
  }, [category]);
  // 品牌查询逻辑
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.name;
    if (event.target.checked) {
      setSelectedBrand([...selectedBrand, brand]);
    } else {
      setSelectedBrand(selectedBrand.filter((item) => item !== brand));
    }
  };
  // 条件查询逻辑
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const handleConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const condition = event.target.name;
    if (event.target.checked) {
      setSelectedCondition([...selectedCondition, condition]);
    } else {
      setSelectedCondition(
        selectedCondition.filter((item) => item !== condition)
      );
    }
  };
  // 查询钩子
  const filteredGuitars = product.filter((item) => {
    const categoryFilter =
      category === "All Categories" ||
      item.specificationDetail.Categories === category;
    const brandFilter =
      selectedBrand.length === 0 ||
      selectedBrand.includes(item.specificationDetail.Brand);
    const conditionFilter =
      selectedCondition.length === 0 ||
      selectedCondition.includes(item.specificationDetail.Condition);

    return categoryFilter && brandFilter && conditionFilter;
  });
  // 产品数量显示
  const itemCount = filteredGuitars.length;
  // 价格查询逻辑
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [error, setError] = useState({ min: false, max: false });
  // 最低价格输入逻辑
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);
    const isEmpty = value === "";

    const containsLetters = /[a-zA-Z]/.test(value);
    const validNumber = /^[0-9]*\.?[0-9]*$/.test(value);
    if (containsLetters || !validNumber || (!isEmpty && numericValue < 20)) {
      setError((prev) => ({ ...prev, min: true }));
    } else {
      setError((prev) => ({ ...prev, min: false }));
    }

    setMinPrice(value);
  };
  // 最高价格输入逻辑
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);
    const isEmpty = value === "";

    const containsLetters = /[a-zA-Z]/.test(value);
    const validNumber = /^[0-9]*\.?[0-9]*$/.test(value);
    if (containsLetters || !validNumber || (!isEmpty && numericValue > 99999)) {
      setError((prev) => ({ ...prev, max: true }));
    } else {
      setError((prev) => ({ ...prev, max: false }));
    }

    setMaxPrice(value);
  };
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
    handleClose();
  };
  const isMenuOpen = Boolean(anchorEl);
  // 分页逻辑
  const [page, setPage] = useState(1);
  // 每页显示10个产品
  const itemsPerPage = 10;
  // 总页数
  const totalPages = Math.ceil(8 / itemsPerPage);
  // 改变页码
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // 显示产品
  const displayedProducts = filteredGuitars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  // 显示产品图片
  const itemImage = displayedProducts.map((item) => {
    // 从guitar列表中找到对应的产品
    const localguitar = guitar.find((guitar) => guitar.name === item.name);
    // 如果有图片，显示图片，否则显示默认图片
    const image =
      localguitar && localguitar.image.length > 0
        ? localguitar.image[0].image
        : "default-image.jpg";
    return { ...item, image };
  });

  return (
    <Box>
      <Header />
      <Box sx={styles.list_styles.list_frame}>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={styles.list_styles.main_frame}>
              {/* left side */}
              <Box sx={styles.list_styles.left_frame}>
                {/* Category Title */}
                <Box sx={styles.list_styles.category_frame}>
                  <Typography sx={styles.list_styles.roboto_20px_02000C}>
                    Category
                  </Typography>
                  <ExpandMoreIcon
                    fontSize="large"
                    onClick={categoryList.handleCollapse}
                    sx={{
                      ...styles.list_styles.expandmore_icon,
                      transform: categoryList.collapse
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>

                {/* Category List */}
                <Collapse
                  in={categoryList.collapse}
                  collapsedSize={0}
                  sx={styles.list_styles.border_bottom}
                >
                  <List component="nav" sx={styles.list_styles.category_list}>
                    {categories.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          selected={selectedCategory === item}
                          onClick={() => handleCategoryClick(item)}
                          sx={{
                            ...styles.list_styles.category_item,
                            color:
                              selectedCategory === item ? "#02000C" : "#76757C",
                          }}
                        >
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: styles.list_styles.category_text,
                              fontWeight: selectedCategory === item ? 500 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>

                {/* Brand Title */}
                <Box sx={styles.list_styles.filter_frame}>
                  <Typography sx={styles.list_styles.roboto_20px_02000C}>
                    Brand
                  </Typography>
                  <ExpandMoreIcon
                    fontSize="large"
                    onClick={brandForm.handleCollapse}
                    sx={{
                      ...styles.list_styles.expandmore_icon,
                      transform: brandForm.collapse
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>

                {/* Brand Form */}
                <Collapse
                  in={brandForm.collapse}
                  collapsedSize={0}
                  sx={styles.list_styles.border_bottom}
                >
                  <FormGroup sx={styles.list_styles.form_frame}>
                    {brand.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        label={item}
                        control={
                          <Checkbox
                            name={item}
                            size="small"
                            checked={selectedBrand.includes(item)}
                            onChange={handleBrandChange}
                            sx={styles.list_styles.form_label}
                          />
                        }
                        sx={styles.list_styles.roboto_16px_02000C}
                      />
                    ))}
                  </FormGroup>
                </Collapse>

                {/* Price Title */}
                <Box sx={styles.list_styles.filter_frame}>
                  <Typography sx={styles.list_styles.roboto_20px_02000C}>
                    Price
                  </Typography>
                  <ExpandMoreIcon
                    fontSize="large"
                    onClick={priceList.handleCollapse}
                    sx={{
                      ...styles.list_styles.expandmore_icon,
                      transform: priceList.collapse
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>

                {/* Price List */}
                <Collapse
                  in={priceList.collapse}
                  collapsedSize={0}
                  sx={styles.list_styles.border_bottom}
                >
                  <Box
                    sx={{
                      ...styles.list_styles.price_form,
                      height: error.min || error.max ? "106px" : "40px",
                    }}
                  >
                    <Box sx={styles.list_styles.price_input}>
                      <TextField
                        placeholder="Min: 20.00"
                        value={minPrice !== null ? minPrice : ""}
                        onChange={handleMinPriceChange}
                        type="text"
                        error={error.min}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: false,
                        }}
                        sx={styles.list_styles.price_text}
                      />
                      <Box sx={styles.list_styles.price_line} />
                      <TextField
                        placeholder="Max: 999,99.00"
                        value={maxPrice !== null ? maxPrice : ""}
                        onChange={handleMaxPriceChange}
                        type="text"
                        error={error.max}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: false,
                        }}
                        sx={styles.list_styles.price_text}
                      />
                    </Box>

                    {/* Input Error Message */}
                    <Box sx={styles.list_styles.price_error_frame}>
                      {error.min && minPrice && (
                        <Box sx={styles.list_styles.error_min}>
                          <Typography
                            sx={styles.list_styles.roboto_14px_EB001B}
                          >
                            Value must be between 20 and the maximum
                          </Typography>
                        </Box>
                      )}
                      {error.max && maxPrice && (
                        <Box sx={styles.list_styles.error_max}>
                          <Typography
                            sx={styles.list_styles.roboto_14px_EB001B}
                          >
                            Value must be between minimum and 999,99.00
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Collapse>

                {/* Condition Title */}
                <Box sx={styles.list_styles.filter_frame}>
                  <Typography sx={styles.list_styles.roboto_20px_02000C}>
                    Condition
                  </Typography>
                  <ExpandMoreIcon
                    onClick={conditionForm.handleCollapse}
                    fontSize="large"
                    sx={{
                      ...styles.list_styles.expandmore_icon,
                      transform: conditionForm.collapse
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>

                {/* Condition Form */}
                <Collapse
                  in={conditionForm.collapse}
                  collapsedSize={0}
                  sx={styles.list_styles.border_bottom}
                >
                  <FormGroup sx={styles.list_styles.form_frame}>
                    {condition.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        label={item}
                        control={
                          <Checkbox
                            name={item}
                            size="small"
                            checked={selectedCondition.includes(item)}
                            onChange={handleConditionChange}
                            sx={styles.list_styles.form_label}
                          />
                        }
                        sx={styles.list_styles.roboto_16px_02000C}
                      />
                    ))}
                  </FormGroup>
                </Collapse>

                {/* Handedness */}
                <Box sx={styles.list_styles.filter_frame}>
                  <Typography sx={styles.list_styles.roboto_20px_02000C}>
                    Handedness
                  </Typography>
                  <ExpandMoreIcon
                    onClick={handednessForm.handleCollapse}
                    fontSize="large"
                    sx={{
                      ...styles.list_styles.expandmore_icon,
                      transform: handednessForm.collapse
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>

                {/* Handedness Form */}
                <Collapse
                  in={handednessForm.collapse}
                  collapsedSize={0}
                  sx={styles.list_styles.border_bottom}
                >
                  <FormGroup sx={styles.list_styles.form_frame}>
                    {handedness.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        label={item}
                        control={
                          <Checkbox
                            name={item}
                            size="small"
                            sx={styles.list_styles.form_label}
                          />
                        }
                        sx={styles.list_styles.roboto_16px_02000C}
                      />
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>

              {/* right side */}
              <Box sx={styles.list_styles.right_width}>
                {/* Product Title */}
                <Box sx={styles.list_styles.right_frame}>
                  {/* Title */}
                  <Typography sx={styles.list_styles.roboto_30px_02000C}>
                    {selectedCategory}
                  </Typography>
                  <Box sx={styles.list_styles.sort_frame}>
                    {/* Results */}

                    <Typography sx={styles.list_styles.roboto_16px_02000C}>
                      {itemCount} Results
                    </Typography>

                    {/* Sort by */}
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="h6"
                        sx={styles.list_styles.roboto_16px_02000C}
                      >
                        Sort by:
                      </Typography>
                      <Button
                        onClick={handleClick}
                        endIcon={
                          <ExpandMoreIcon
                            sx={{
                              ...styles.list_styles.expandmore_icon_02000C,
                              transform: isMenuOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          />
                        }
                        sx={styles.list_styles.button_frame}
                      >
                        <Typography sx={styles.list_styles.roboto_16px_02000C}>
                          {selectedSort}
                        </Typography>
                      </Button>

                      {/* Menu */}
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={isMenuOpen}
                        onClose={handleClose}
                        slotProps={styles.list_styles.menu_frame}
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
                          onClick={() =>
                            handleMenuItemClick("Most Recent First")
                          }
                        >
                          <Typography
                            sx={styles.list_styles.roboto_16px_02000C}
                          >
                            Most Recent First
                          </Typography>
                        </MenuItem>

                        {/* Low to High */}
                        <MenuItem
                          onClick={() =>
                            handleMenuItemClick("Price Low to High")
                          }
                        >
                          <Typography
                            sx={styles.list_styles.roboto_16px_02000C}
                          >
                            Price Low to High
                          </Typography>
                        </MenuItem>

                        {/* High to Low */}
                        <MenuItem
                          onClick={() =>
                            handleMenuItemClick("Price High to Low")
                          }
                        >
                          <Typography
                            sx={styles.list_styles.roboto_16px_02000C}
                          >
                            Price High to Low
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                </Box>

                {/* Product List */}
                <Box sx={styles.list_styles.product_frame}>
                  {itemImage.map((item, index) => (
                    <Box key={index}>
                      <Box
                        component={Link}
                        to={`/product/${encodeURIComponent(item.name)}`}
                        sx={styles.list_styles.product_space}
                      >
                        <Box
                          key={index}
                          component="img"
                          src={item.image}
                          sx={styles.list_styles.product_image}
                        />
                      </Box>

                      <Box sx={styles.list_styles.product_text}>
                        <Typography
                          variant="h6"
                          sx={styles.list_styles.roboto_16px_02000C}
                        >
                          {item.name}
                        </Typography>
                        <Typography sx={styles.list_styles.roboto_14px_76757C}>
                          Condition: {item.specificationDetail.Condition}
                        </Typography>
                        <Typography
                          sx={styles.list_styles.roboto_20px_000000D9}
                        >
                          {item.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Pagination */}
                <Box sx={styles.list_styles.pagination_frame}>
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
                                ...styles.list_styles.pagination_previous,
                              }
                            : {
                                ...styles.list_styles.pagination_next,
                              }),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
