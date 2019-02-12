import * as React from "react";
import { ReactNodeLike } from "prop-types";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  InputLabel: {
    maxWidth: "300px",
    lineHeight: "1.8rem"
  }
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNodeLike
}


const InputLabel: React.FunctionComponent<Props> = ({ classes, children }) => {
  return (
    <legend className={classes.InputLabel}>
      {children}
    </legend>
  )
}

export default withStyles(styles)(InputLabel);