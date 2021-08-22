import React from "react";
import { Paper, IconButton, makeStyles } from "@material-ui/core";
import { Delete, Clear } from "@material-ui/icons";
import EditableTitle from "./EditableTitle";
import CustomCard from "./Card";
import TaskAdder from "./TaskAdder";
import { useDispatch, useSelector } from "react-redux";
import * as boardActions from "../store/actions/board";
import { Droppable } from "react-beautiful-dnd";

const List = (props) => {
  const classes = useStyles();

  const cards = useSelector(
    (state) => state.board.lists.find((list) => list.id === props.id).cards
  );

  const dispatch = useDispatch();

  return (
    <div className={classes.outerContainer}>
      <Paper className={classes.container}>
        <div className={classes.headerContainer}>
          <EditableTitle listId={props.id} title={props.title} type="list" />
          <div className={classes.buttonContainer}>
            <IconButton
              onClick={() => {
                dispatch(boardActions.clearList(props.id));
              }}
            >
              <Clear />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(boardActions.deleteList(props.id));
              }}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <Droppable droppableId={props.id}>
          {(provided) => (
            <div
              className={classes.cardContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card, index) => (
                <CustomCard
                  key={card.id}
                  listId={props.id}
                  id={card.id}
                  title={card.title}
                  lastEdited={card.lastEdited}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <TaskAdder listId={props.id} />
            </div>
          )}
        </Droppable>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    outerContainer: {
      width: "25%",
      minWidth: "300px",
      margin: theme.spacing(5, 0, 5, 5),
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#E8E8E8",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "80px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: theme.spacing(1, 1, 1, 0),
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      margin: theme.spacing(0, 0, 2, 0),
    },
  };
});

export default List;
