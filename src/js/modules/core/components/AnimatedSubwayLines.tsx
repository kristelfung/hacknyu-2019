import * as React from "react";
import AnimatedSubwayLine from "./AnimatedSubwayLine";
import { trackColors } from "../../ThemeInjector";
import injectSheet, { WithStyles } from "react-jss";

type Props = WithStyles<typeof styles>;

const styles = {
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

const AnimatedSubwayLines: React.FunctionComponent<Props> = ({ classes }) => {
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