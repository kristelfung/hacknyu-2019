import * as React from "react"
import { Styles } from "react-jss";
import { JssRules } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";

interface TimelineStopStyles<T> extends Styles {
  TimelineStop: T;
}

interface Props {
  classes: TimelineStopStyles<string>
  color: string;
  left: string;
  top: string;
}

const styles: TimelineStopStyles<JssRules> = {
  TimelineStop: {
    position: "absolute",
    left: props => props.left,
    top: props => props.top,
    height: "19px",
    width: "19px",
    borderRadius: "50%",
    backgroundColor: props => props.color,
    border: "3px solid black"
  }
}

const TimelineStop = ({ classes }) => {
  return (
    <div className={classes.TimelineStop} />
  )
}

export default injectSheet(styles)(TimelineStop);