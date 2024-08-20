import React, { useState } from "react";
import { useLocation } from "../useLocation.hook/page";
import { product } from "../../lists/classicalGuitar.list/page";
import { newArrivals } from "../../lists/newArrivals.list/page";

type Product = {
  id: number;
  name: string;
  condition: string;
  price: string;
  newprice: string;
  review: { main: string; list: string[] };
  image: ImageItems[];
};

type ImageItems = { image: string; title: string };

type MayLikeType = {
  id: number;
  name: string;
  price: string;
  condition: string;
  image: string;
  Link: string;
};

export const useProductDetail = () => {
  const products: Product = product.classicalGuitar[0];
  const specifications = product.specification[0].list;
  const labels = product.specification[0].label;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const startIndex = Math.max(0, selectedImageIndex - 4);
  // const endIndex = Math.min(products.image.length, startIndex + 5);

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

  const [specifiation, setSpecifiation] = useState(false);
  const handleToggleSpecifiation = () => {
    setSpecifiation(!specifiation);
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
  const mayLike = useItems(newArrivals);

  return {
    products,
    specifications,
    labels,
    selectedImageIndex,
    setSelectedImageIndex,
    viewAll,
    handleViewAll,
    handleNextImage,
    review,
    handleToggleReview,
    specifiation,
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
    mayLike,
  };
};
