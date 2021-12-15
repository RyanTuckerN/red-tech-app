import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { API_KEY, API_URL, Order } from "..";
import { colors } from "../../../shared/colors";
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { OrderSaveCtx } from "../../../contexts/State";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Add, DeleteForever, Search } from "@material-ui/icons";
import ListHeader from "./ListHeader";
import { DesktopView, DeviceView } from "./Views";

interface AddOrderProps {
  open: boolean;
  orders: Order[];
  setOpen: (b: boolean) => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function AddOrder({
  open,
  orders,
  setOpen,
  setOrders,
}: AddOrderProps) {
  // context will update as user is creating an order. no need to save, as it is handled in context.
  // the context also saves to localstorage, so depending on browser settings, it should persist through a refresh
  const { savedOrder, setSavedOrder } = useContext(OrderSaveCtx);
  const {
    orderType = "",
    customerName = "",
    createdByUserName = "",
  } = savedOrder;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (!orderType || !customerName || !createdByUserName) return;

      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          ApiKey: API_KEY,
        }),
        body: JSON.stringify(savedOrder), //context
      });
      const newOrder: Order = await res.json();
      setOrders([...orders, newOrder]); //add the order to view

      //reset form
      setSavedOrder!({
        orderType: "Standard",
        customerName: "",
        createdByUserName: "",
      });

      //close dialog
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //id is equivalent to the corresponding order property
    const obj = { ...savedOrder, [e.target.id]: e.target.value };
    //update context as user types
    setSavedOrder!(obj);
  };

  //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form action="submit" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
          <DialogContent>
            <InputLabel htmlFor="orderType">Type</InputLabel>
            <Select
              id="orderType"
              native
              value={orderType}
              fullWidth
              margin="dense"
              variant={"outlined"}
              inputProps={{
                name: "order-type",
                id: "orderType",
                onChange: updateOrder,
              }}
            >
              {[
                "Standard",
                "SaleOrder",
                "PurchaseOrder",
                "TransferOrder",
                "ReturnOrder",
              ].map((type, i) => {
                return (
                  <option key={i} value={type}>
                    {/* aesthetics only*/}
                    {type.split("Order")[0]}
                  </option>
                );
              })}
            </Select>
            <TextField
              margin="dense"
              id="customerName"
              label="Customer Name"
              required
              type="text"
              fullWidth
              value={customerName}
              onChange={updateOrder}
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="createdByUserName"
              label="Created By"
              type="text"
              required
              fullWidth
              value={createdByUserName}
              onChange={updateOrder}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
