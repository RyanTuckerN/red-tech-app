import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Divider, Grid, Typography } from "@material-ui/core";
import { HomeProps } from ".";
import { colors } from "../../../shared/colors";

interface ListProps extends HomeProps {
  classes: any;
}

export function DesktopView({
  classes,
  orders,
  selected,
  toggleSelected,
}: ListProps) {
  return (
    <TableContainer>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell style={classes.heading}>ID</TableCell>
            <TableCell style={classes.heading} align="right">
              Type
            </TableCell>
            <TableCell style={classes.heading} align="right">
              Customer
            </TableCell>
            <TableCell style={classes.heading} align="right">
              Date
            </TableCell>
            <TableCell style={classes.heading} align="right">
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
                          checked={selected.includes(orderId!)}
                          onChange={() => toggleSelected(orderId!)}
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

export function DeviceView({
  classes,
  orders,
  selected,
  toggleSelected,
}: ListProps) {
  return (
    <List className={classes.list}>
      {orders.map(
        (
          { orderId, orderType, customerName, createdDate, createdByUserName },
          i
        ) => {
          const d = new Date(createdDate!);
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
              onClick={() => toggleSelected(orderId!)}
              style={{
                backgroundColor:
                  i % 2 !== 0 ? colors.brandWhite : colors.brandRed + "14", //hex suffix for opacity
                paddingRight: 0,
                borderTop: i === 0 ? "1px #00000070 solid" : "",
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
                  checked={selected.includes(orderId!)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${orderId!}`,
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
