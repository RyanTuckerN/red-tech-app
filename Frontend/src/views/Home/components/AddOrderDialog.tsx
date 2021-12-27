import { useContext } from "react";
import { API_KEY, API_URL, Order } from "..";
import { Button, InputLabel, Select, TextField } from "@material-ui/core";
import { OrderSaveCtx } from "../../../contexts/State";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AddOrderProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  addOrderToHomeState: (order: Order) => void;
}

export default function AddOrder({
  open,
  setOpen,
  addOrderToHomeState,
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
      res.status === 200 && addOrderToHomeState(newOrder); //add the order to view

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
    //element id is equivalent to the corresponding order property
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
              name="customer name"
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
