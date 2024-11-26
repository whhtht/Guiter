import React, { useState, useCallback, useEffect } from "react";
import { ProductContext, Product, FilterValues } from "../context/page";
import { queryProduct } from "../../../api/product/page";

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

  const value = {
    HeaderCategory,
    Category,
    Brand,
    Condition,
    Handedness,
    images,
    fetchProduct,
    product,
    setProduct,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    handleFilterChange,
    handleSort,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
