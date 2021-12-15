import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../../shared/colors";

const useStyles = makeStyles((theme) => ({
  wrapper: {
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
    marginRight: "15px",
  },
  button: {
    float: "right",
    minWidth: "2.1em",
    maxWidth: "2.1em",
    margin: "0 2.5px",
  },
  flex: {
    display: "flex",
    width: "100%",
    flexFlow: "row nowrap",
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
    position: "relative",
    top: 3,
    height: "2.2em",
    fontWeight: 200,
    width: "calc(100vw - 250px)",
    maxWidth: "250px",
  },
  filters: {
    fontStyle: "italic",
    color: colors.brandDarkGray,
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  select: {
    width: "30px",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
