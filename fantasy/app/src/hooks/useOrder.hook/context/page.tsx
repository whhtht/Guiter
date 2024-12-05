import { createContext } from "react";

export interface Order {
  orderId: string;
  userId: string;
  type: string;
  status: string;
  data: string;
  products: {
    name: string;
    condition: string;
    price: string;
    quantity: number;
  }[];
}
export interface Detail {
  orderId: string;
  userId: string;
  type: string;
  status: string;
  data: string;
  products: {
    name: string;
    condition: string;
    price: string;
    quantity: number;
  }[];
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  payment: {
    type: string;
    brand: string;
    last4: string;
    billingName: string;
    billingAddress: string;
  };
}

export interface OrderContextType {
  fetchOrder: () => Promise<void>;
  order: Order[];
  handleOrderDetail: (ordernumber: string) => Promise<Order>;
  detail: Detail | null;
  quantity: number;
  subtotal: number;
  shippingFee: number;
  hst: number;
  total: number;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);
