import { useState, useEffect } from "react";
import { Order } from "..";
import { Typography } from "@material-ui/core";

import { DesktopView, DeviceView } from "./Views";
import ListHeader from "./ListHeader";
import AddOrder from "./AddOrderDialog";
import useStyles from "./useStyles";

export interface HomeProps {
  loading: boolean;
  orders: Order[];
  selected: number[];
  deleteSelected: () => Promise<void>;
  toggleSelected: (orderId: number) => void;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  addOrderToHomeState: (order: Order) => void;
}

export default function HomeView(props: HomeProps) {
  const [orders, setOrders] = useState<Order[]>(props.orders); //unique to this component
  const [addOpen, setAddOpen] = useState(false); //add order dialog
  const [typeSortValue, setTypeSortValue] = useState<string>(""); //sort by order type
  const [customerSortValue, setCustomerSortValue] = useState<string>(""); //sort by customer
  const [typeOptions, setTypeOptions] = useState<string[]>([]); //only show existing types
  const [customerOptions, setCustomerOptions] = useState<string[]>([]); //only show existing customers

  const { selected, deleteSelected, setSelected } = props;
  
  const classes = useStyles();

  const clearFilters = () => {
    setTypeSortValue("");
    setCustomerSortValue("");
  };

  // update display by id
  const filterOrdersById = (id: string): void => {
    if (id === "") filterBy();
    else {
      let tempArr = [...props.orders];
      tempArr = tempArr.filter((order) => order.orderId === parseInt(id));
      setOrders(tempArr);
    }
  };

  //filter display by customer or type
  const filterBy = (): void => {
    setSelected([]); //don't want to delete by accident if not showing, so clear selected
    let tempArr = [...props.orders];

    if (typeSortValue)
      tempArr = tempArr.filter((order) => order.orderType === typeSortValue);

    if (customerSortValue)
      tempArr = tempArr.filter(
        (order) => order.customerName === customerSortValue
      );

    setOrders(tempArr);
  };

  //select VISIBLE orders, so filtered orders are unaffected
  const selectAll = (): void => {
    setSelected([...orders.map((order) => order.orderId!)]);
  };

  //update local state orders and filter options when props.orders changes
  useEffect(() => {
    setOrders(props.orders);
    setTypeSortValue("");
    setCustomerSortValue("");
    setTypeOptions(
      props.orders
        .map((order) => order.orderType)
        .filter((order, i, arr) => arr.indexOf(order) === i)
        .sort()
    );
    setCustomerOptions(
      props.orders
        .map((order) => order.customerName)
        .filter((order, i, arr) => arr.indexOf(order) === i)
        .sort()
    );
  }, [props.orders]);

  //reset selected when orders change
  useEffect(() => {
    setSelected([]);
  }, [orders]);

  //filter whenever user adds/removes filter
  useEffect(filterBy, [typeSortValue, customerSortValue]);

  const headerProps = {
    classes,
    selected,
    orders,
    typeOptions,
    customerOptions,
    typeSortValue,
    customerSortValue,
    setTypeSortValue,
    setCustomerSortValue,
    setAddOpen,
    filterOrdersById,
    clearFilters,
    deleteSelected,
    setSelected,
    selectAll,
    addOrderToHomeState: props.addOrderToHomeState
  };

  return (
    <div className={classes.wrapper}>
      <ListHeader {...headerProps} />
      <div className={classes.listWrapper}>
        {!orders.length && (
          <div
            style={{
              margin: "0 auto",
              width: "fit-content",
            }}
          >
            <Typography
              variant={"caption"}
              style={{fontSize: "1em", fontStyle: "italic"}}>
              {props.loading ? "Loading" : "No Orders!"}
            </Typography>
          </div>
        )}

        {/* media screen queries in useStyles */}
        <div className={classes.desktop}>
          {!!orders.length && <DesktopView {...props} classes={classes} orders={orders} />}
        </div>
        <div className={classes.device}>
          {!!orders.length && <DeviceView {...props} classes={classes} orders={orders} />}
        </div>
      </div>

      {/* dialog */}
      <AddOrder
        open={addOpen}
        setOpen={setAddOpen}
        addOrderToHomeState={props.addOrderToHomeState}
      />
    </div>
  );
}
