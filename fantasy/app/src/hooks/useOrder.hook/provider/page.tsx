import React, { useState, useCallback } from "react";
import { OrderContext, Order, Detail } from "../context/page";

import { getUserOrders, getOrderDetail } from "../../../api/order/page";

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<Order[]>([]);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const shippingFee = 30;
  const tax = 0.15;
  const [hst, setHst] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await getUserOrders();
      const data = response.data;
      setOrder(data);
      return data;
    } catch (error) {
      console.error("Fetch order error:", error);
      const errorResponse = error as { message: string };
      throw Error(errorResponse.message);
    }
  }, []);

  const handleOrderDetail = useCallback(async (orderId: string) => {
    try {
      const response = await getOrderDetail(orderId);
      const data = response.data[0];
      setDetail(data);
      const totalQuantity = data.products.reduce(
        (acc: number, item: { quantity: number }) =>
          acc + Number(item.quantity),
        0
      );
      setQuantity(totalQuantity);
      const subtotalAmount = data.products.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
          acc + item.price * item.quantity,
        0
      );
      setSubtotal(subtotalAmount);
      const hstAmount = subtotalAmount * tax;
      setHst(hstAmount);
      setTotal(subtotalAmount + shippingFee + hstAmount);
      return data;
    } catch (error) {
      console.error("Fetch order detail error:", error);
      const errorResponse = error as { message: string };
      throw Error(errorResponse.message);
    }
  }, []);

  const value = {
    fetchOrder,
    order,
    handleOrderDetail,
    detail,
    quantity,
    subtotal,
    shippingFee,
    hst,
    total,
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
