import { useContext } from "react";
import { OrderContext, OrderContextType } from "../context/page";

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
