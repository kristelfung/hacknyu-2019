import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import SubwayStop from "./SubwayStop";
import { STOPS_COUNT } from "../../constants";

interface Props extends WithStyles<typeof styles> {
  color: string;
  lineStep: number;
  stopOffsets: number[];
  lineOffset: number;
  currentStop: number;
}

const styles = {
  SubwayLine: {
    height: "15px",
    width: (props: Props) =>
      `${props.lineStep * (100 / STOPS_COUNT)}vw`,
    transition: "width 1s",
    margin: "10px 0px 10px 0px",
    borderRadius: "10%",
    position: "relative",
    backgroundColor: (props: Props) => props.color
  }
};

const SubwayLine: React.FunctionComponent<Props> = ({
  classes,
  currentStop,
  stopOffsets
}) => {
  let subwayStops = [];
  // Wow I think this is my first traditional for loop in JS in ages
  for (let i = 0; i < STOPS_COUNT; i++) {
    subwayStops.push(
      <SubwayStop
        key={i}
        stopIndex={i}
        currentStop={currentStop}
        offset={stopOffsets[i]}
      />
    );
  }
  return <div className={classes.SubwayLine}>{subwayStops}</div>;
};

export default injectSheet(styles)(SubwayLine);
