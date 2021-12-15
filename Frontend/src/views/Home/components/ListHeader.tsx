import { useState, useEffect } from "react";
import { Order } from "..";
import { colors } from "../../../shared/colors";
import { Add, DeleteForever, Search } from "@material-ui/icons";
import {
  Button,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

interface ListHeaderProps {
  classes: any;
  selected: number[];
  orders: Order[];
  typeOptions: string[];
  customerOptions: string[];
  typeSortValue: string;
  customerSortValue: string;
  filterOrdersById: (id: string) => void;
  clearFilters: VoidFunction;
  deleteSelected: () => Promise<void>;
  setAddOpen: (b: boolean) => void;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setTypeSortValue: React.Dispatch<React.SetStateAction<string>>;
  setCustomerSortValue: React.Dispatch<React.SetStateAction<string>>;
  selectAll: VoidFunction;
}

export default function ListHeader({
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
}: ListHeaderProps) {
  return (
    <div>
      <div className="flex">
        <Typography variant="h1" className={classes.header}>
          Orders
        </Typography>
        <SearchBar
          classes={classes}
          filterOrdersById={filterOrdersById}
          clearFilters={clearFilters}
        />
        <Button
          className={classes.button}
          onClick={deleteSelected}
          color="secondary"
          variant="contained"
          disabled={!selected.length}
          title="Delete Selected Orders"
        >
          <DeleteForever />
        </Button>
        <Button
          className={classes.button}
          onClick={() => setAddOpen(true)}
          color={"default"}
          variant="contained"
          title="Add Order"
        >
          <Add />
        </Button>
      </div>
      <div className={classes.filters}>
        <div className="left">
          {!!selected.length && selected.length === orders.length ? (
            <Button
              variant={"contained"}
              style={{ padding: 3 }}
              onClick={() => setSelected([])}
            >
              Unselect All
            </Button>
          ) : (
            <Button
              variant={"contained"}
              style={{ padding: 5 }}
              onClick={selectAll}
              disabled={!orders.length}
            >
              Select All
            </Button>
          )}
        </div>
        <div className={classes.right}>
          <div>
            <InputLabel htmlFor="orderType">Type</InputLabel>
            <Select
              id="orderType"
              native
              value={typeSortValue}
              fullWidth
              margin="dense"
              variant={"standard"}
              inputProps={{
                name: "order-type",
                id: "orderType",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setTypeSortValue(e.target.value);
                },
              }}
            >
              <option value="">All</option>
              {typeOptions.map((orderType, i) => {
                return (
                  <option key={i} value={orderType}>
                    {orderType.split("Order")[0]}
                  </option>
                );
              })}
            </Select>
          </div>
          <div style={{ marginLeft: 10 }}>
            <InputLabel htmlFor="customerName">Customer</InputLabel>
            <Select
              id="customerName"
              native
              value={customerSortValue}
              fullWidth
              margin="dense"
              variant={"standard"}
              inputProps={{
                name: "customer-name",
                id: "customerName",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setCustomerSortValue(e.target.value);
                },
                style: { border: 0 },
              }}
            >
              <option value="">All</option>
              {customerOptions.map((customerName, i) => {
                return (
                  <option key={i} value={customerName}>
                    {customerName}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SearchProps {
  filterOrdersById: (id: string) => void;
  clearFilters: VoidFunction;
  classes: any; // styles from useStyles hook
}

function SearchBar({ filterOrdersById, clearFilters, classes }: SearchProps) {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    filterOrdersById(id);
    /* eslint-disable-next-line */
  }, [id]);

  return (
    <TextField
      variant={"outlined"}
      color="secondary"
      type={"tel"}
      value={id}
      title="Find Order By ID Number"
      onFocus={() => {
        clearFilters();
        setId("");
      }}
      onChange={(e) => setId(e.target.value.replace(/[^0-9]+/g, ""))}
      InputProps={{
        className: classes.search,
        placeholder: "ID #",
        endAdornment: (
          <Search
            style={{ color: colors.brandLightGray, height: 17, width: 17 }}
          />
        ),
      }}
    />
  );
}
