import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Order } from "../../views/Home";
import { colors } from "../../shared/colors";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

//LIST
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { JsxElement } from "typescript";
import { Add, DeleteForever, Search } from "@material-ui/icons";
// const selected = [1,4,5]

interface TableProps {
  orders: Order[];
  selected: number[];
  deleteSelected: VoidFunction;
  toggleSelected: (orderId: number) => void;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    fontFamily: "Roboto",
    color: colors.brandDarkGray,
  },
  device: {
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  desktop: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  border: {
    borderBottom: "1px #00000070 solid",
  },
  header: {
    fontSize: "2em",
    fontWeight: 800,
    display: "inline-block",
    color: "#000",
    marginRight: '15px'
  },
  button: {
    float: "right",
    minWidth: "2.7em",
    maxWidth: "2.7em",
    margin: "0 2.5px"
  },
  flex: {
    display: "flex",
    width: "100%",
  },
  divider: {
    width: "100%",
  },
  alignRight: {
    textAlign: "right",
  },
  bold: {
    fontWeight: 800,
    color: colors.brandBlack,
  },
  listWrapper: {
    maxHeight: "calc(100vh - 220px)",
    overflowY: "auto",
    marginTop: 10,
  },
  search: {
    position: 'relative',
    top: 3,
    height: "2.2em",
    fontWeight: 200,
    width: 'calc(100vw - 235px)',
    maxWidth: '250px',
    
  },
  filters: {
    fontStyle: 'italic',
    color: colors.brandDarkGray,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  }

}));

const heading = { fontSize: "1.2em", fontWeight: 600 };

export default function OrdersList(props: TableProps) {
  const [orders, setOrders] = useState<Order[]>(props.orders);
  const { selected, deleteSelected } = props;
  const classes = useStyles();

  const filterOrders = (id: string): void => {
    if (id === "") setOrders(props.orders);
    else
      setOrders([
        ...props.orders.filter((order) => order.orderId === parseInt(id)),
      ]);
  };

  return (
    <div className={classes.wrapper}>
      <div className="flex">
        <Typography variant="h1" className={classes.header}>
          Orders
        </Typography>
        <SearchBar filterOrders={filterOrders} />
        <Button
          className={classes.button}
          onClick={deleteSelected}
          color="secondary"
          variant="contained"
          disabled={!selected.length}
        >
          <DeleteForever />
        </Button>
        <Button
          className={classes.button}
          onClick={()=>console.log('add')}
          color={'default'}
          variant="contained"
        >
          <Add />
        </Button>
      </div>

      <div className={classes.filters}>
        <div className="left"><Typography>Select all</Typography></div>
        <div className="right"> <Typography>Filter By: Name | Type</Typography></div>
      </div>

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
              style={{
                fontSize: "1em",
                fontStyle: "italic",
              }}
            >
              No Orders!
            </Typography>
          </div>
        )}
        <div className={classes.desktop}>
          <DesktopView {...props} orders={orders} />
        </div>
        <div className={classes.device}>
          <DeviceView {...props} orders={orders} />
        </div>
      </div>
    </div>
  );
}

function DesktopView({ orders, selected, toggleSelected }: TableProps) {
  return (
    <TableContainer>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell style={heading}>ID</TableCell>
            <TableCell style={heading} align="right">
              Type
            </TableCell>
            <TableCell style={heading} align="right">
              Customer
            </TableCell>
            <TableCell style={heading} align="right">
              Date
            </TableCell>
            <TableCell style={heading} align="right">
              Created By
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, i) => {
            const {
              orderId,
              orderType,
              customerName,
              createdDate,
              createdByUserName,
            } = order;

            return (
              <TableRow
                key={orderId}
                style={{
                  backgroundColor:
                    i % 2 !== 0 ? colors.brandWhite : colors.brandRed + "14", //hex suffix for opacity
                }}
              >
                <TableCell component="th" scope="row">
                  <FormControl>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={selected.includes(orderId)}
                          onChange={() => toggleSelected(orderId)}
                          style={{ position: "relative", bottom: 2.5 }}
                        />
                      }
                      label={orderId}
                      labelPlacement="start"
                    />
                  </FormControl>
                </TableCell>
                <TableCell align="right">{orderType}</TableCell>
                <TableCell align="right">{customerName}</TableCell>
                <TableCell align="right">{createdDate}</TableCell>
                <TableCell align="right">{createdByUserName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DeviceView({ orders, selected, toggleSelected }: TableProps) {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {orders.map(
        (
          { orderId, orderType, customerName, createdDate, createdByUserName },
          i
        ) => {
          const d = new Date(createdDate);
          const shortDate = `${d.getMonth() + 1}/${d.getDate()}/${
            d.getFullYear() % 1000
          }`;

          return (
            <ListItem
              key={orderId}
              role={undefined}
              dense
              button
              className={classes.border}
              onClick={() => toggleSelected(orderId)}
              style={{
                backgroundColor:
                  i % 2 !== 0 ? colors.brandWhite : colors.brandRed + "14", //hex suffix for opacity
                paddingRight: 0,
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.bold}>
                    ID: {orderId}
                  </Typography>
                </Grid>
                <Grid className={classes.alignRight} item xs={6}>
                  <Typography className={classes.bold}>{shortDate}</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={6}>
                  <Typography className={classes.bold}>Type </Typography>
                </Grid>
                <Grid className={classes.alignRight} item xs={6}>
                  <Typography>{orderType}</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={6}>
                  <Typography className={classes.bold}>Customer</Typography>
                </Grid>
                <Grid className={classes.alignRight} item xs={6}>
                  <Typography>{customerName}</Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={6}>
                  <Typography className={classes.bold}>Created By</Typography>
                </Grid>
                <Grid className={classes.alignRight} item xs={6}>
                  <Typography>{createdByUserName}</Typography>
                </Grid>
              </Grid>
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  checked={selected.includes(orderId)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${orderId}`,
                  }}
                />
              </ListItemIcon>
            </ListItem>
          );
        }
      )}
    </List>
  );
}

interface SearchProps {
  filterOrders: (id: string) => void;
}

const SearchBar = ({ filterOrders }: SearchProps) => {
  const [id, setId] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    filterOrders(id);
  }, [id]);

  return (
    <TextField
      variant={"outlined"}
      color="secondary"
      type={"number"}
      value={id}
      onChange={(e) => setId(e.target.value)}
      InputProps={{
        className: classes.search,
        placeholder: "ID #",
        endAdornment: <Search style={{ color: colors.brandLightGray }} />,
      }}
    />
  );
};
