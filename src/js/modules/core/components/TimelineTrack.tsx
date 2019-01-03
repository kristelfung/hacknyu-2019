import * as React from "react"
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";

interface TimelineTrackStyles<T> extends Styles {
  TimelineTrack: T;
}

interface Props {
  classes: TimelineTrackStyles<string>
}

const styles: TimelineTrackStyles<JssRules> = {
  TimelineTrack: {
    backgroundColor: props => props.color,
    height: "10px",
    width: props => props.width,
  }
}
const TimelineTrack: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.TimelineTrack} />
  )
}

export default injectSheet(styles)(TimelineTrack)