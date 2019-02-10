import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { States } from "./AnimatedAlert";
import { ALERT_TIME_INTERVALS } from "../../constants";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  componentState: States;
  isError: boolean;
  message: string;
}

const styles = (theme: Theme) => ({
  Alert: {
    color: theme.errorText,
    width: "300px",
    margin: "20px",
    fontSize: "1.1em",
    borderRadius: "15px",
    border: (props: Props) =>
      props.isError
        ? `2px solid ${theme.errorBorder}`
        : `2px solid ${theme.notificationBorder}`,
    backgroundColor: (props: Props) =>
      props.isError ? theme.errorBackground : theme.notificationBackground,
    transform: (props: Props) =>
      props.componentState !== States.Mounted ? "translateX(-40vw)" : "none",
    transition: `transform ${ALERT_TIME_INTERVALS.ANIMATION_TIME}ms`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: "20px"
  }
});

const Alert: React.FunctionComponent<Props> = ({ classes, message }) => {
  return (
    <div className={classes.Alert}>
      <div className={classes.text}> {message} </div>
    </div>
  );
};

export default injectSheet(styles)(Alert);
