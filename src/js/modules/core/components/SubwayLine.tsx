import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import SubwayStop from "./SubwayStop";
import { STOPS_COUNT } from "../../constants";
import { JssRules } from "../../types";

interface SubwayLineStyles<T> extends Styles {
  SubwayLine: T;
}

interface SubwayLineProps {
  color: string;
  lineStep: number;
  stopOffsets: number[];
  lineOffset: number;
  currentStop: number;
  classes: SubwayLineStyles<string>;
}

const styles: SubwayLineStyles<JssRules> = {
  SubwayLine: {
    height: "15px",
    width: props =>
      `${props.lineStep * (100 / STOPS_COUNT)}vw`,
    transition: "width 1s",
    margin: "10px 0px 10px 0px",
    borderRadius: "10%",
    position: "relative",
    backgroundColor: props => props.color
  }
};

const SubwayLine: React.SFC<SubwayLineProps> = ({
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
