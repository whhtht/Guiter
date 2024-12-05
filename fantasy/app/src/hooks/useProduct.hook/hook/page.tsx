import { useContext } from "react";
import { ProductContext, ProductContextType } from "../context/page";

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
