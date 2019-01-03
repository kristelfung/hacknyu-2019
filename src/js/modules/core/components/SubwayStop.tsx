import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { STOPS_COUNT } from "../../constants";
import { JssRules } from "../../types";

interface SubwayStopStyles<T> extends Styles {
  SubwayStop: T;
}

interface Props {
  classes: SubwayStopStyles<string>;
  currentStop: number;
  stopIndex: number;
  offset: number;
}

const styles: SubwayStopStyles<JssRules> = {
  SubwayStop: {
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "50%",
    transition: "transform 0.75s",
    width: "25px",
    height: "25px",
    border: "0.5px solid #d9d9d9",
    top: "-6px",
    left: props =>
      `${(props.stopIndex + 1) * (100 / STOPS_COUNT) - props.offset}vw`,
    transform: props =>
      props.stopIndex < props.currentStop
        ? "scale(1)"
        : "scale(0)"
  }
};

const SubwayStop: React.SFC<Props> = ({ classes }) => {
  return <div className={classes.SubwayStop} />;
};

export default injectSheet(styles)(SubwayStop);
