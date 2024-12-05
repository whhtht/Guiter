import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductContext, Product, FilterValues } from "../context/page";
import { searchProducts, queryProduct } from "../../../api/product/page";

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const HeaderCategory = [
    "Classical Guitar",
    "Acoustic Guitar",
    "Semi-Acoustic Guitar",
    "Ukulele",
    "Banjo",
  ];
  const FliteCategory = HeaderCategory.slice(1, 5);

  const Category = [
    "All Categories",
    "Classical Guitar",
    "Acoustic Guitar",
    "Semi-Acoustic Guitar",
    "Ukulele",
    "Banjo",
  ];

  const Brand = ["Cordoba", "Fender", "Gibson", "Mosrite"];

  const Condition = [
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
    "Non Functioning",
  ];

  const Handedness = ["Right-Handed", "Left-Handed"];

  const images = [
    "image 1",
    "image 2",
    "image 3",
    "image 4",
    "image 5",
    "image 6",
  ];

  const [product, setProduct] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrival, setNewArrival] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // 获取商品信息
  const fetchProduct = useCallback(async (filters = {}) => {
    try {
      const response = await queryProduct(filters);
      const sortedResponse = [...response].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFeatured(
        sortedResponse.filter((item) => item.attribute === "featured")
      );
      setNewArrival(
        sortedResponse.filter((item) => item.attribute === "newArrival")
      );
      setProduct(sortedResponse);
    } catch (error) {
      const errorResponse = error as { message: string };
      throw new Error(errorResponse.message);
    }
  }, []);

  // 根据分类获取商品
  useEffect(() => {
    if (selectedCategory) {
      fetchProduct({ category: selectedCategory });
    }
  }, [fetchProduct, selectedCategory]);

  // 处理筛选条件变化
  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const finalFilters = {
        ...filters,
        category: selectedCategory || "",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
      };

      fetchProduct(finalFilters);
    },
    [fetchProduct, selectedCategory, minPrice, maxPrice]
  );

  // 处理排序
  const handleSort = useCallback(
    (sortOption: string) => {
      const sortedProducts = [...product];
      if (sortOption === "Price Low to High") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "Price High to Low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === "Most Recent First") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
      setProduct(sortedProducts); // 更新排序后的商品
    },
    [product]
  );

  // 搜索框
  const navigate = useNavigate();
  const location = useLocation();
  const defaultOptions = useMemo(
    () => [
      "Classical Guitar - Gibson X00345",
      "Classical Nelson X784534",
      "Classion 56X45634",
    ],
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>(defaultOptions);

  // 重置搜索
  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults(defaultOptions);
  }, [defaultOptions]);
  useEffect(() => {
    resetSearch();
  }, [location.pathname, resetSearch]);

  // 处理搜索框变化
  const handleSearchChange = async (value: string) => {
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const products = await searchProducts(value);
        const results = products.map((item: { name: string }) => item.name);
        setSearchResults(results);
      } catch (error) {
        setSearchResults(defaultOptions);
      }
    } else {
      setSearchResults(defaultOptions);
    }
  };

  // 处理点击搜索结果
  const handleOptionSelect = async (option: string) => {
    try {
      const response = await searchProducts(option);
      const product = response[0].name;
      if (option === product) {
        navigate(`/product/${encodeURIComponent(option)}`);
      } else {
        navigate(`/producterror`);
      }
    } catch (error) {
      navigate(`/producterror`);
    }
  };

  const value = {
    HeaderCategory,
    FliteCategory,
    Category,
    Brand,
    Condition,
    Handedness,
    images,
    fetchProduct,
    product,
    setProduct,
    featured,
    newArrival,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    handleFilterChange,
    handleSort,
    searchTerm,
    searchResults,
    handleSearchChange,
    handleOptionSelect,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
