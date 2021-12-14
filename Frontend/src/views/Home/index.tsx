import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import OrdersTable from "../../components/Table";

const API_KEY = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";
const API_URL = "https://red-candidate-web.azurewebsites.net/api/Orders";

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: 1,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 2,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 3,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 4,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 5,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 6,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
    {
      orderId: 7,
      orderType: "PurchaseOrder",
      customerName: "Company B",
      createdDate: "Tuesday, 14 December 2021",
      createdByUserName: "RT",
    },
  ]);
  const [selected, setSelected] = useState<number[]>([]);

  //keep track of which orders are selected for deletion
  const toggleSelected = (orderId: number): void => {
    if (selected.includes(orderId)) {
      setSelected(selected.filter((n) => n !== orderId));
    } else {
      setSelected([...selected, orderId]);
    }
  };

  const fetchOrders = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "GET",
        headers: new Headers({
          ApiKey: API_KEY,
        }),
      });
      const json = await res.json();
      setOrders(json);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSelected = async (): Promise<void> => {
    try {
      if (!selected.length) return;
      const res = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: new Headers({
          ApiKey: API_KEY,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(selected),
      });
      res.status === 200 &&
        setOrders(orders.filter((o) => !selected.includes(o.orderId)));
    } catch (err) {
      console.log(err);
    }
  };

  //   useEffect(() => {
  //     fetchOrders();
  //   }, []);

  const tableProps = {
    orders,
    selected,
    deleteSelected,
    toggleSelected,
  };

  return (
    <Page headerTitle={"Home"}>
      <div style={{maxWidth: 1000, margin: "0 auto"}}>
          <OrdersTable {...tableProps} />
      </div>
    </Page>
  );
}

export interface Order {
  orderId: number;
  orderType: string;
  customerName: string;
  createdDate: string;
  createdByUserName: string;
}
