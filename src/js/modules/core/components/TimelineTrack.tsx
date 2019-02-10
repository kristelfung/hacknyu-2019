import * as React from "react"
import injectSheet, { WithStyles } from "react-jss";


const styles = {
  TimelineTrack: {
    backgroundColor: (props: Props) => props.color,
    height: "10px",
    width: (props: Props) => props.width,
  }
};

interface Props extends WithStyles<typeof styles> {
  width: string;
  color: string;
}


const TimelineTrack: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.TimelineTrack} />
  )
};

export default injectSheet(styles)(TimelineTrack)