import React from "react";
import { Paper, IconButton, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import EditableTitle from "./EditableTitle";
import TimeStamp from "./TimeStamp";
import { useDispatch } from "react-redux";
import * as boardActions from "../store/actions/board";

const CustomCard = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Paper className={classes.outerContainer}>
      <div className={classes.container}>
        <EditableTitle
          cardId={props.id}
          listId={props.listId}
          title={props.title}
          type="card"
        />
        <IconButton
          onClick={() => {
            dispatch(boardActions.deleteCard(props.id, props.listId));
          }}
        >
          <Delete />
        </IconButton>
      </div>
      <TimeStamp lastEdited={props.lastEdited} />
    </Paper>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    outerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      margin: theme.spacing(0, 0, 2, 0),
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  };
});

export default CustomCard;
