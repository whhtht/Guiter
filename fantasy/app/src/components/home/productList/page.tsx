import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import Header from "../../layout/header/page";
import { categories } from "./products";
import { guitar } from "../../../lists/guitar.list/page";
import Footer from "../../layout/footer/page";



const useCollapse = () => {
  const [collapseOpen, setCollapseOpen] = useState(true);
  const [collapseClose, setCollapseClose] = useState(false);
  const handleCollapseOpen = () => {
    setCollapseOpen(!collapseOpen);
  };
  const handleCollapseClose = () => {
    setCollapseClose(!collapseClose);
  };
  return {
    collapseOpen,
    collapseClose,
    handleCollapseOpen,
    handleCollapseClose,
  };
};

const useChange = () => {
  const [changeClose, setChangeClose] = useState(false);
  const [changeOpen, setChangeOpen] = useState(true);
  const handleChangeOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeOpen(event.target.checked);
  };
  const handleChangeClose = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeClose(event.target.checked);
  };
  return {
    changeOpen,
    changeClose,
    handleChangeOpen,
    handleChangeClose,
  };
};

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const categoryList = useCollapse();
  const brandList = useCollapse();
  const priceList = useCollapse();
  const conditionList = useCollapse();
  const handednessList = useCollapse();

  const cordobaCheck = useChange();
  const fenderCheck = useChange();
  const gibsonCheck = useChange();
  const mosriteCheck = useChange();

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [error, setError] = useState({ min: false, max: false });

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState("Most Recent First");
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

  console.log("category in product list", category);
  console.log("productId in product list", productId);

  return (
    <Box>
      <Header />
      <Box sx={{ padding: "16px 72px 16px 72px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
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
                  height: "100%",
                  flexShrink: 0,
                }}
              >
                {/* Category */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
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
                    onClick={categoryList.handleCollapseOpen}
                    sx={{
                      color: "#000000D9",
                      transform: categoryList.collapseOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Collapse
                  in={categoryList.collapseOpen}
                  collapsedSize={0}
                  sx={{
                    borderBottom: "1px solid #DDDCDE",
                  }}
                >
                  <List
                    component="nav"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                      margin: "0px 0px 15px 0px",
                      padding: "0px 0px 0px 0px",
                    }}
                  >
                    {/* Category */}
                    {categories.map((category, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          onClick={() => handleCategoryClick(category)}
                          sx={{
                            width: "100%",
                            color:
                              selectedCategory === category
                                ? "#02000C"
                                : "#76757C",
                            padding: "5px 0px 5px 0px",
                            "&.Mui-selected": {
                              color: "#02000C",
                              backgroundColor: "transparent",
                            },
                            "&.Mui-selected:hover": {
                              color: "#02000C",
                              backgroundColor: "transparent",
                            },
                            "&:hover": {
                              color: "#02000C",
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <ListItemText
                            primary={category}
                            primaryTypographyProps={{
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontWeight:
                                selectedCategory === category ? 500 : 400,
                              lineHeight: "24px",
                              textAlign: "left",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>

                {/* Brand */}
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
                    onClick={brandList.handleCollapseClose}
                    sx={{
                      color: "#000000D9",
                      transform: brandList.collapseClose
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Collapse
                  in={brandList.collapseClose}
                  collapsedSize={0}
                  sx={{
                    borderBottom: "1px solid #DDDCDE",
                  }}
                >
                  <FormGroup
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={cordobaCheck.changeOpen}
                          onChange={cordobaCheck.handleChangeOpen}
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Cordoba"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fenderCheck.changeClose}
                          onChange={fenderCheck.handleChangeClose}
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Fender"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gibsonCheck.changeClose}
                          onChange={gibsonCheck.handleChangeClose}
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Gibson"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={mosriteCheck.changeClose}
                          onChange={mosriteCheck.handleChangeClose}
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Mosrite"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                  </FormGroup>
                </Collapse>

                {/* Price */}
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
                    Price
                  </Typography>
                  <ExpandMoreIcon
                    onClick={priceList.handleCollapseClose}
                    sx={{
                      color: "#000000D9",
                      transform: priceList.collapseClose
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Collapse
                  in={priceList.collapseClose}
                  collapsedSize={0}
                  sx={{
                    borderBottom: "1px solid #DDDCDE",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: error.min || error.max ? "106px" : "40px",
                      margin: "0px 0px 20px 0px",
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
                        value={minPrice !== null ? minPrice : ""}
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
                        value={maxPrice !== null ? maxPrice : ""}
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

                {/* Condition */}
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
                    Condition
                  </Typography>
                  <ExpandMoreIcon
                    onClick={conditionList.handleCollapseClose}
                    sx={{
                      color: "#000000D9",
                      transform: conditionList.collapseClose
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Collapse
                  in={conditionList.collapseClose}
                  collapsedSize={0}
                  sx={{
                    borderBottom: "1px solid #DDDCDE",
                  }}
                >
                  <FormGroup
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Excellent"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Very Good"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Good"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Fair"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Poor"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Non Functioning"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                  </FormGroup>
                </Collapse>

                {/* Handedness */}
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
                    Handedness
                  </Typography>
                  <ExpandMoreIcon
                    onClick={handednessList.handleCollapseClose}
                    sx={{
                      color: "#000000D9",
                      transform: handednessList.collapseClose
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                    fontSize="large"
                  />
                </Box>
                <Collapse
                  in={handednessList.collapseClose}
                  collapsedSize={0}
                  sx={{
                    borderBottom: "1px solid #DDDCDE",
                  }}
                >
                  <FormGroup
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      width: "100%",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Right-Handed"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            "&.Mui-checked": {
                              color: "#02000C",
                            },
                          }}
                        />
                      }
                      label="Left-Handed"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#02000C",
                      }}
                    />
                  </FormGroup>
                </Collapse>
              </Box>

              {/* right side */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  {/* Title */}
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
                    {/* Results */}
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
                      564 Results
                    </Typography>

                    {/* Sort by */}
                    <Box display="flex" alignItems="center">
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
                              transform: isMenuOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease-in-out",
                              color: "#02000C",
                            }}
                          />
                        }
                        sx={{ textTransform: "none" }}
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
                          onClick={() =>
                            handleMenuItemClick("Most Recent First")
                          }
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
                          onClick={() =>
                            handleMenuItemClick("Price Low to High")
                          }
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
                          onClick={() =>
                            handleMenuItemClick("Price High to Low")
                          }
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
                </Box>

                {/* Product List */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                  }}
                >
                  {guitar
                    .map((product) => (
                      <Box key={product.id} sx={{ margin: "0px 0px 10px 0px" }}>
                        <Box
                          component={Link}
                          to={`/${category}/${product.id}`}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "308px",
                            height: "308px",
                            overflow: "hidden",
                            borderRadius: "8px",
                            margin: "0px 0px 10px 0px",
                          }}
                        >
                          <Box
                            component="img"
                            src={product.image[0].image}
                            alt={product.name}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "inline-flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
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
                            {product.name}
                          </Typography>
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
                            Condition: {product.condition}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: "20px",
                              fontWeight: 500,
                              lineHeight: "28px",
                              textAlign: "left",
                              color: "#000000D9",
                            }}
                          >
                            {product.price}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>

                {/* Pagination */}
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
                    count={7}
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
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
