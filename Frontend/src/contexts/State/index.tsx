import React, { createContext, useEffect, useState } from "react";
import { Order } from "../../views/Home";

interface Props {
  children: React.ReactNode;
}

export interface OrderContext {
  savedOrder: Order;
  setSavedOrder?: (order: Order) => void;
}

interface DefaultCtx {
  savedOrder: Order;
}

export const OrderSaveCtx = createContext<OrderContext>({
  savedOrder: {
    orderType: "Standard",
    customerName: "",
    createdByUserName: "",
  },
});

export default function OrderProvider({ children }: Props) {
  const [savedOrder, setSavedOrder] = useState<Order>({
    orderType: "Standard",
    customerName: "",
    createdByUserName: "",
  });

  useEffect(() => {
    setSavedOrder(
      localStorage.getItem("savedOrder")
        ? JSON.parse(localStorage.getItem("savedOrder")!)
        : {
            savedOrder: {
              orderType: "Standard",
              customerName: "",
              createdByUserName: "",
            },
          }
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("savedOrder", JSON.stringify(savedOrder));
  }, [savedOrder]);

  return (
    <OrderSaveCtx.Provider value={{ savedOrder, setSavedOrder }}>
      {children}
    </OrderSaveCtx.Provider>
  );
}
