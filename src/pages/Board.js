import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import List from "../components/List";
import { useSelector, useDispatch } from "react-redux";
import * as dateActions from "../store/actions/date";
import TaskAdder from "../components/TaskAdder";

const Board = () => {
  const classes = useStyles();

  const lists = useSelector((state) => state.board.lists);

  const dispatch = useDispatch();

  useEffect(() => {
    let timer = setInterval(
      () => dispatch(dateActions.setCurrentDate()),
      60000
    );

    return () => clearInterval(timer);
  });

  return (
    <div className={classes.container}>
      {lists.map((list) => (
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cards={list.cards}
        />
      ))}
      <TaskAdder />
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      overflowX: "auto",
      height: "100%",
      padding: theme.spacing(0, 5, 0, 5),
      marginTop: "10vh",
      backgroundColor: "lightblue",
    },
  };
});

export default Board;
