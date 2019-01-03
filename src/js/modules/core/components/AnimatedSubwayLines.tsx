import * as React from "react";
import AnimatedSubwayLine from "./AnimatedSubwayLine";
import { trackColors } from "../../ThemeInjector";
import { Styles } from "react-jss";
import { JssRules } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";

interface AnimatedSubwayLinesStyles<T> extends Styles {
  AnimatedSubwayLines: T;
}

interface Props {
  classes: AnimatedSubwayLinesStyles<string>;
}

const styles: AnimatedSubwayLinesStyles<JssRules> = {
  AnimatedSubwayLines: {
    display: "flex",
    minHeight: "300px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px 0 0 0",
    width: "100%"
  }
};

const AnimatedSubwayLines: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AnimatedSubwayLines}>
      <AnimatedSubwayLine color={trackColors.green} />
      <AnimatedSubwayLine color={trackColors.red} />
      <AnimatedSubwayLine color={trackColors.blue} />
      <AnimatedSubwayLine color={trackColors.orange} />
    </div>
  );
};

export default injectSheet(styles)(AnimatedSubwayLines);