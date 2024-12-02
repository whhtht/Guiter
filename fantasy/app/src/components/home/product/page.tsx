import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useProduct } from "../../../hooks/useProduct.hook/hook/page";

import Header from "../layout/header/page";
import Footer from "../layout/footer/page";

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

const ProductList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    Category,
    Brand,
    Condition,
    Handedness,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleFilterChange,
    selectedCategory,
    setSelectedCategory,
  } = useProduct();

  // 展开/折叠逻辑
  const categoryList = useCollapse(true);
  const brandForm = useCollapse(false);
  const priceList = useCollapse(false);
  const conditionForm = useCollapse(false);
  const handednessForm = useCollapse(false);

  // 定义每个筛选器的选中值
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [error, setError] = useState({ min: false, max: false });
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedHandedness, setSelectedHandedness] = useState<string[]>([]);

  // 类别查询逻辑
  const handleCategoryClick = (value: string) => {
    setSelectedCategory(value);
    handleFilterChange({ category: value });
    if (value === "All Categories") {
      navigate("/productlist");
    }
    if (value === "Classical Guitar") {
      navigate("/productlist/classical");
    }
    if (value === "Acoustic Guitar") {
      navigate("/productlist/acoustic");
    }
    if (value === "Semi-Acoustic Guitar") {
      navigate("/productlist/semiacoustic");
    }
    if (value === "Ukulele") {
      navigate("/productlist/ukulele");
    }
    if (value === "Banjo") {
      navigate("/productlist/banjo");
    }
  };
  // 根据路由设置默认选中类别
  useEffect(() => {
    if (location.pathname.includes("/classical")) {
      setSelectedCategory("Classical Guitar");
    } else if (location.pathname.includes("/acoustic")) {
      setSelectedCategory("Acoustic Guitar");
    } else if (location.pathname.includes("/semiacoustic")) {
      setSelectedCategory("Semi-Acoustic Guitar");
    } else if (location.pathname.includes("/ukulele")) {
      setSelectedCategory("Ukulele");
    } else if (location.pathname.includes("/banjo")) {
      setSelectedCategory("Banjo");
    } else {
      setSelectedCategory("All Categories");
    }
  }, [location.pathname, setSelectedCategory]);

  // 品牌查询逻辑
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.name;
    const isChecked = event.target.checked;
    // 根据是否选中，添加或删除品牌
    setSelectedBrand((prevSelectedBrand) => {
      const updatedSelectedBrand = isChecked
        ? [...prevSelectedBrand, brand]
        : prevSelectedBrand.filter((item) => item !== brand);
      return updatedSelectedBrand;
    });
  };

  // 良好度产品查询逻辑
  const handleConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const condition = event.target.name;
    const isChecked = event.target.checked;
    setSelectedCondition((prevSelectedCondition) => {
      const updatedSelectedCondition = isChecked
        ? [...prevSelectedCondition, condition]
        : prevSelectedCondition.filter((item) => item !== condition);
      return updatedSelectedCondition;
    });
  };

  // 惯用手查询逻辑
  const handleHandednessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const handedness = event.target.name;
    const isChecked = event.target.checked;
    setSelectedHandedness((prevSelectedHandedness) => {
      const updatedSelectedHandedness = isChecked
        ? [...prevSelectedHandedness, handedness]
        : prevSelectedHandedness.filter((item) => item !== handedness);
      return updatedSelectedHandedness;
    });
  };

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
  // 根据筛选器选中值查询产品
  useEffect(() => {
    if (
      !selectedBrand.length &&
      !selectedCondition.length &&
      !selectedHandedness.length
    ) {
      handleFilterChange({ category: selectedCategory || "" });
    } else {
      handleFilterChange({
        brand: selectedBrand,
        condition: selectedCondition,
        handedness: selectedHandedness,
      });
    }
  }, [
    selectedCategory,
    selectedBrand,
    selectedCondition,
    selectedHandedness,
    handleFilterChange,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedBrand, selectedCondition, selectedHandedness]);

  return (
    <Box>
      {/* <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          backgroundColor: "#FFFFFF",
        }}
      > */}
        <Header />
      {/* </Box> */}

      <Box
        sx={{
          padding: "16px 72px 16px 72px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "45px",
            margin: "48px 0px 0px 0px",
          }}
        >
          {/* left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "310px",
              flexShrink: 0,
            }}
          >
            {/* Category 筛选器 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: "0px 0px 20px 0px",
              }}
            >
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
                Category
              </Typography>
              <ExpandMoreIcon
                fontSize="large"
                onClick={categoryList.handleCollapse}
                sx={{
                  color: "#02000C",
                  transition: "transform 0.3s",
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
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <List
                component="nav"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  margin: "0px 0px 20px 0px",
                  padding: "0px",
                }}
              >
                {Category.map((item, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton
                      onClick={() => handleCategoryClick(item)}
                      sx={{ padding: "0px" }}
                    >
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          sx: {
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            lineHeight: "24px",
                            textAlign: "left",
                            fontWeight: selectedCategory === item ? 500 : 400,
                            color:
                              selectedCategory === item ? "#02000C" : "#76757C",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Brand 筛选器 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                padding: "20px 0px 20px 0px",
              }}
            >
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
                Brand
              </Typography>
              <ExpandMoreIcon
                fontSize="large"
                onClick={brandForm.handleCollapse}
                sx={{
                  color: "#02000C",
                  transition: "transform 0.3s",
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
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <FormGroup
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  margin: "0px 0px 20px 0px",
                }}
              >
                {Brand.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    label={item}
                    control={
                      <Checkbox
                        name={item}
                        size="small"
                        checked={selectedBrand.includes(item)}
                        onChange={handleBrandChange}
                        sx={{
                          "&.Mui-checked": {
                            color: "#02000C",
                          },
                        }}
                      />
                    }
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  />
                ))}
              </FormGroup>
            </Collapse>

            {/* Price 筛选器 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: "20px 0px 20px 0px",
              }}
            >
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
                Price
              </Typography>
              <ExpandMoreIcon
                fontSize="large"
                onClick={priceList.handleCollapse}
                sx={{
                  color: "#02000C",
                  transition: "transform 0.3s",
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
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px 0px 20px 0px",
                  height: error.min || error.max ? "106px" : "40px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextField
                    placeholder="Min: 20.00"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    type="text"
                    error={error.min}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: false,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        textAlign: "left",
                        color: "#76757C",
                        width: "132px",
                        height: "40px",
                        border: "1px solid #02000C",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #FFFFFF",
                        },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: "16px",
                      height: "1px",
                      backgroundColor: "#02000C",
                    }}
                  />
                  <TextField
                    placeholder="Max: 999,99.00"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    type="text"
                    error={error.max}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: false,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        textAlign: "left",
                        color: "#76757C",
                        width: "132px",
                        height: "40px",
                        border: "1px solid #02000C",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent",
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #FFFFFF",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Input Error Message */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  {error.min && minPrice && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: "0px",
                        width: "125px",
                        height: "66px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                          textAlign: "left",
                          color: "#EB001B",
                        }}
                      >
                        Value must be between 20 and the maximum
                      </Typography>
                    </Box>
                  )}
                  {error.max && maxPrice && (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "5px",
                        width: "125px",
                        height: "66px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "22px",
                          textAlign: "left",
                          color: "#EB001B",
                        }}
                      >
                        Value must be between minimum and 999,99.00
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Collapse>

            {/* Condition 筛选器 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: "20px 0px 20px 0px",
              }}
            >
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
                Condition
              </Typography>
              <ExpandMoreIcon
                onClick={conditionForm.handleCollapse}
                fontSize="large"
                sx={{
                  color: "#02000C",
                  transition: "transform 0.3s",
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
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <FormGroup
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  margin: "0px 0px 20px 0px",
                }}
              >
                {Condition.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    label={item}
                    control={
                      <Checkbox
                        name={item}
                        size="small"
                        checked={selectedCondition.includes(item)}
                        onChange={handleConditionChange}
                        sx={{
                          "&.Mui-checked": {
                            color: "#02000C",
                          },
                        }}
                      />
                    }
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  />
                ))}
              </FormGroup>
            </Collapse>

            {/* Handedness 筛选器 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: "20px 0px 20px 0px",
              }}
            >
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
                Handedness
              </Typography>
              <ExpandMoreIcon
                onClick={handednessForm.handleCollapse}
                fontSize="large"
                sx={{
                  color: "#02000C",
                  transition: "transform 0.3s",
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
              sx={{
                borderBottom: "1px solid #DDDCDE",
              }}
            >
              <FormGroup
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  margin: "0px 0px 20px 0px",
                }}
              >
                {Handedness.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    label={item}
                    control={
                      <Checkbox
                        name={item}
                        size="small"
                        checked={selectedHandedness.includes(item)}
                        onChange={handleHandednessChange}
                        sx={{
                          "&.Mui-checked": {
                            color: "#02000C",
                          },
                        }}
                      />
                    }
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </Box>

          {/* right side */}
          <Box sx={{ width: "956px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductList;
