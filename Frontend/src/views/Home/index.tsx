import { useState, useEffect } from "react";
import Page from "../../components/Page";
import HomeView from "./components";

export const API_KEY = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";
export const API_URL = "https://red-candidate-web.azurewebsites.net/api/Orders";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true); //fetch in progress
  const [orders, setOrders] = useState<Order[]>([]); //orders from DB
  const [selected, setSelected] = useState<number[]>([]);

  //keep track of which orders are selected for deletion
  const toggleSelected = (orderId: number): void => {
    if (selected.includes(orderId)) {
      setSelected(selected.filter((n) => n !== orderId));
    } else {
      setSelected([...selected, orderId]);
    }
  };

  //async http request
  const fetchOrders = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}`, {
        method: "GET",
        headers: new Headers({
          ApiKey: API_KEY,
        }),
      });
      const json = await res.json();
      setOrders(json);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //async http request
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
        setOrders(orders.filter((o) => !selected.includes(o.orderId ?? -1)));
    } catch (err) {
      console.log(err);
    }
  };

  // add a new order upon creation
  const addOrderToHomeState = (order: Order): void => {
    setOrders([...orders, order]);
  };

  // CDM
  useEffect(() => {
    fetchOrders();
  }, []);

  const homeViewProps = {
    orders,
    selected,
    loading,
    deleteSelected,
    toggleSelected,
    setSelected,
    addOrderToHomeState
  };

  return (
    <Page headerTitle={"Home"}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <HomeView {...homeViewProps} />
      </div>
    </Page>
  );
}

export interface Order {
  orderId?: number;
  orderType:
    | "Standard"
    | "SaleOrder"
    | "PurchaseOrder"
    | "TransferOrder"
    | "ReturnOrder";
  customerName: string;
  createdDate?: string;
  createdByUserName: string;
}
