import React, { useState } from "react";
import { Paper, Button, TextField, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import * as boardActions from "../store/actions/board";

const TaskAdder = (props) => {
  const classes = useStyles();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("New task!");
  const dispatch = useDispatch();

  const handleCreation = () => {
    if (title.length > 15) {
      alert("Task name should be 15 symbols or less");
      setIsAdding(false);
      return;
    }
    if (props.listId) {
      dispatch(boardActions.addCard(props.listId, title));
    } else {
      dispatch(boardActions.addList(title));
    }
    setIsAdding(false);
  };

  return (
    <Paper
      className={
        props.listId !== undefined ? classes.cardAdder : classes.listAdder
      }
    >
      {isAdding ? (
        <TextField
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onBlur={handleCreation}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleCreation();
          }}
          variant="standard"
          inputProps={{ className: classes.input }}
          className={classes.textField}
          fullWidth
          autoFocus
        />
      ) : (
        <Button
          variant={props.listId ? "text" : "contained"}
          color={props.listId ? "primary" : "secondary"}
          startIcon={<Add />}
          className={classes.button}
          onClick={() => {
            setIsAdding(true);
          }}
        >
          {props.listId ? "Add Card" : "Add List"}
        </Button>
      )}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    listAdder: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "25%",
      minWidth: "300px",
      height: "80px",
      backgroundColor: "#E8E8E8",
      margin: theme.spacing(5),
    },
    cardAdder: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: "#fff",
    },
    textField: {
      flex: 1,
      margin: theme.spacing(1, 2),
    },
    input: {
      fontSize: "20px",
    },
    button: {
      margin: theme.spacing(1, 0),
    },
  };
});

export default TaskAdder;
