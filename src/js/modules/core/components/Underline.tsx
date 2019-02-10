import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";

const styles = {
  Underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  }
};

type Props = WithStyles<typeof styles>;

const Underline: React.FunctionComponent<Props> = ({ classes }) => {
  return <hr className={classes.Underline} />;
};

export default injectSheet(styles)(Underline);
