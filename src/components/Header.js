import React from "react";
import { AppBar, Button, Typography, makeStyles } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import * as boardActions from "../store/actions/board";

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <AppBar className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        ReactTrello
      </Typography>
      <Button
        startIcon={<Clear />}
        variant="contained"
        color="secondary"
        onClick={() => {
          dispatch(boardActions.clearBoard());
        }}
      >
        Clear Board
      </Button>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(0, 5, 0, 3),
      height: "10vh",
    },
    title: {
      fontSize: "2em",
    },
  };
});

export default Header;
