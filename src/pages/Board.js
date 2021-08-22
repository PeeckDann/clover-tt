import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import List from "../components/List";
import TaskAdder from "../components/TaskAdder";
import { useSelector, useDispatch } from "react-redux";
import * as dateActions from "../store/actions/date";
import * as boardActions from "../store/actions/board";

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

  useEffect(() => {
    dispatch(boardActions.fetchBoard());
    dispatch(dateActions.setCurrentDate());
  }, [dispatch]);

  const handleDragEnd = (result) => {
    dispatch(boardActions.dragCard(result));
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
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
    </DragDropContext>
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
