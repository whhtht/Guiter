import React, { useState } from "react";
import { useLocation } from "../useLocation.hook/page";
import { newArrivals } from "../../lists/newArrivals.list/page";

type MayLikeType = {
  id: number;
  name: string;
  price: string;
  condition: string;
  image: string;
  Link: string;
};

export const useProductDetail = () => {
  // 选择的图片索引
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // 是否查看全部图片
  const [viewAll, setViewAll] = useState(false);
  const handleViewAll = () => {
    setViewAll(!viewAll);
  };
  // 下一张图片
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
  };
  // 是否查看评论
  const [review, setRewiew] = useState(false);
  const handleToggleReview = () => {
    setRewiew(!review);
  };
  // 是否查看规格
  const [specifiationOpen, setSpecifiationOpen] = useState(false);
  const handleToggleSpecifiation = () => {
    setSpecifiationOpen(!specifiationOpen);
  };
  // 是否查看配送政策
  const [shippingPolice, setShippingPolice] = useState(false);
  const handleToggleShippingPolice = () => {
    setShippingPolice(!shippingPolice);
  };
  // 是否查看退货政策
  const [returnPolice, setReturnPolice] = useState(false);
  const handleToggleReturn = () => {
    setReturnPolice(!returnPolice);
  };
  // 是否查看位置,取货
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const locationFunctions = useLocation(setOpenLocation);
  // 猜你喜欢
  const useItems = (items: MayLikeType[], itemsToShow = 5) => {
    const [index, setIndex] = useState(0);
    const handlePrev = () => {
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const handleNext = () => {
      setIndex((prevIndex) =>
        prevIndex < items.length - itemsToShow ? prevIndex + 1 : prevIndex
      );
    };
    return {
      index,
      itemsToShow,
      handlePrev,
      handleNext,
    };
  };
  // 购物车
  const [openCart, setOpenCart] = React.useState(false);
  // 猜你喜欢
  const mayLike = useItems(newArrivals);

  return {
    selectedImageIndex,
    setSelectedImageIndex,
    viewAll,
    handleViewAll,
    handleNextImage,
    review,
    handleToggleReview,
    specifiationOpen,
    handleToggleSpecifiation,
    shippingPolice,
    handleToggleShippingPolice,
    returnPolice,
    handleToggleReturn,
    openLocation,
    setOpenLocation,
    openPickUp,
    setOpenPickUp,
    locationFunctions,
    openCart,
    setOpenCart,
    mayLike,
  };
};
