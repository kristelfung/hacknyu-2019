import * as React from "react";
import withStyles, { WithStyles } from "react-jss";
import { Link } from "react-router-dom";
import { Theme } from "../../ThemeInjector";
import AnimatedSubwayLines from "./AnimatedSubwayLines";

const styles = {
  NotFoundPage: {
    width: "100vw"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.2em",
    alignItems: "center"
  }
};

type Props = WithStyles<typeof styles>;

const NotFoundPage: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.NotFoundPage}>
      <div className={classes.text}>
        <h1> Not Found</h1>
        <p>
          We're sorry, but this train is out of service. Please take another
          route! We apologize for the inconvience.
        </p>
      </div>
      <AnimatedSubwayLines />
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
