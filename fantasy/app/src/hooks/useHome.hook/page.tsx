import { useState } from "react";
import { featuredGuitars } from "../../lists/featuredGuitars.list/page";
import { newArrivals } from "../../lists/newArrivals.list/page";

// Item list
type ItemType = {
  id: number;
  name: string;
  price: string;
  condition: string;
  image: string;
  Link: string;
};
const useItems = (items: ItemType[], itemsToShow = 5) => {
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

export const useHome = () => {
  // Item list
  const featuredGuitar = useItems(featuredGuitars);
  const newArrival = useItems(newArrivals);

  return {
    indexfeaturedGuitar: featuredGuitar.index,
    itemToShowfeaturedGuitar: featuredGuitar.itemsToShow,
    handlePrevfeaturedGuitar: featuredGuitar.handlePrev,
    handleNextfeaturedGuitar: featuredGuitar.handleNext,
    indexNewArrival: newArrival.index,
    itemsToShowNewArrival: newArrival.itemsToShow,
    handlePrevNewArrival: newArrival.handlePrev,
    handleNextNewArrival: newArrival.handleNext,
  };
};
