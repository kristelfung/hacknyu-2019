import * as React from "react"
import injectSheet, { WithStyles } from "react-jss";


interface Props extends WithStyles<typeof styles> {
  color: string;
  left: string;
  top: string;
}

const styles = {
  TimelineStop: {
    position: "absolute",
    left: (props: Props) => props.left,
    top: (props: Props) => props.top,
    height: "19px",
    width: "19px",
    borderRadius: "50%",
    backgroundColor: (props: Props) => props.color,
    border: "3px solid black"
  }
}

const TimelineStop: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.TimelineStop} />
  )
}

export default injectSheet(styles)(TimelineStop);