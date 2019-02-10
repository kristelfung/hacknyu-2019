import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { STOPS_COUNT } from "../../constants";


interface Props extends WithStyles<typeof styles> {
  currentStop: number;
  stopIndex: number;
  offset: number;
}

const styles = {
  SubwayStop: {
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "50%",
    transition: "transform 0.75s",
    width: "25px",
    height: "25px",
    border: "0.5px solid #d9d9d9",
    top: "-6px",
    left: (props: Props) =>
      `${(props.stopIndex + 1) * (100 / STOPS_COUNT) - props.offset}vw`,
    transform: (props: Props) =>
      props.stopIndex < props.currentStop
        ? "scale(1)"
        : "scale(0)"
  }
};

const SubwayStop: React.FunctionComponent<Props> = ({ classes }) => {
  return <div className={classes.SubwayStop} />;
};

export default injectSheet(styles)(SubwayStop);
