import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const TimeStamp = ({ lastEdited }) => {
  const classes = useStyles();
  const [stamp, setStamp] = useState("");
  const currentDate = useSelector((state) => parseInt(state.date.date));

  useEffect(() => {
    const handleStampChange = (currentDate) => {
      const timeSinceEdit = (currentDate - parseInt(lastEdited)) / 1000;
      if (!currentDate || timeSinceEdit < 0 || timeSinceEdit < 60) {
        setStamp("just now");
      } else if (timeSinceEdit < 3600) {
        setStamp(`${Math.ceil(timeSinceEdit / 60)} m ago`);
      } else if (timeSinceEdit < 86400) {
        setStamp(`${Math.floor(timeSinceEdit / 3600)} h ago`);
      } else if (timeSinceEdit < 604800) {
        setStamp(`${Math.floor(timeSinceEdit / 86400)} d ago`);
      } else {
        setStamp("long time ago");
      }
    };

    handleStampChange(currentDate);
  }, [currentDate, lastEdited]);

  return (
    <div className={classes.container}>
      <Typography className={classes.timeStamp} variant="subtitle2">
        Last edited {stamp}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },
    timeStamp: {
      fontSize: "8px",
      margin: theme.spacing(-1, 0, 1, 2),
    },
  };
});

export default TimeStamp;
