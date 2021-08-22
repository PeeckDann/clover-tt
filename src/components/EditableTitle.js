import React, { useState } from "react";
import { Typography, TextField, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as boardActions from "../store/actions/board";

const EditableTitle = (props) => {
  const classes = useStyles();

  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(props.title);

  const dispatch = useDispatch();

  const handleEditing = () => {
    if (title.length > 15) {
      alert("Task name should be 15 symbols or less");
      setTitle(props.title);
      setIsEdited(false);
      return;
    }
    if (props.type === "card") {
      dispatch(boardActions.editCard(props.cardId, props.listId, title));
    } else if (props.type === "list") {
      dispatch(boardActions.editList(props.listId, title));
    }
    setIsEdited(false);
  };

  return (
    <div className={classes.container}>
      {isEdited ? (
        <TextField
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onBlur={handleEditing}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleEditing();
          }}
          variant="standard"
          inputProps={{ className: classes.input }}
          fullWidth
          autoFocus
        />
      ) : (
        <Typography
          className={classes.input}
          onClick={() => {
            setIsEdited(true);
          }}
          variant="h6"
        >
          {title}
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      margin: theme.spacing(1, 1, 1, 2),
    },
    input: {
      fontSize: "20px",
    },
  };
});

export default EditableTitle;
