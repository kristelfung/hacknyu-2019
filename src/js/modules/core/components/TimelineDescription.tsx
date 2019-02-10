import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { ReactNodeLike } from "prop-types";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  children: ReactNodeLike;
  left: string;
  top: string;
}
const styles = (theme: Theme) => ({
  TimelineDescription: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: (props: Props) => props.top,
    maxWidth: "150px",
    fontSize: "1.2em",
    left: (props: Props) => props.left
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    TimelineDescription: {
      maxWidth: "45px",
      fontSize: "1em"
    }
  }
});

const TimelineDescription: React.FunctionComponent<Props> = ({ classes, children }) => {
  return <div className={classes.TimelineDescription}>{children}</div>;
};

export default injectSheet(styles)(TimelineDescription);
