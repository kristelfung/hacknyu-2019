import * as React from "react";
import { Styles } from "react-jss";
import { JssRules } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { ReactNodeLike } from "prop-types";

interface TimelineDescriptionStyles<T> extends Styles {
  TimelineDescription: T;
  "@media (max-width: 800px)": T;
}

interface Props {
  classes: TimelineDescriptionStyles<string>;
  children: ReactNodeLike;
  left: string;
  top: string;
}
const styles: TimelineDescriptionStyles<JssRules> = {
  TimelineDescription: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: props => props.top,
    maxWidth: "150px",
    fontSize: "1.2em",
    left: props => props.left
  },
  '@media (max-width: 800px)': {
    TimelineDescription: {
      maxWidth: "45px",
      fontSize: "1em"
    }
  }
};


const TimelineDescription: React.SFC<Props> = ({ classes, children }) => {
  return (
    <div className={classes.TimelineDescription}>
      {children}
    </div>
  )
}

export default injectSheet(styles)(TimelineDescription);