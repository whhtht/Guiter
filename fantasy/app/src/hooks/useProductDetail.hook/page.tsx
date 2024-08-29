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


  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [viewAll, setViewAll] = useState(false);
  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
  };

  const [review, setRewiew] = useState(false);
  const handleToggleReview = () => {
    setRewiew(!review);
  };

  const [specifiationOpen, setSpecifiationOpen] = useState(false);
  const handleToggleSpecifiation = () => {
    setSpecifiationOpen(!specifiationOpen);
  };

  const [shippingPolice, setShippingPolice] = useState(false);
  const handleToggleShippingPolice = () => {
    setShippingPolice(!shippingPolice);
  };

  const [returnPolice, setReturnPolice] = useState(false);
  const handleToggleReturn = () => {
    setReturnPolice(!returnPolice);
  };

  const [openLocation, setOpenLocation] = React.useState(false);
  const [openPickUp, setOpenPickUp] = React.useState(false);
  const locationFunctions = useLocation(setOpenLocation);

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

  const [openCart, setOpenCart] = React.useState(false);

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
