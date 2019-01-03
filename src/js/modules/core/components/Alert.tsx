import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import { States } from "./AnimatedAlert";
import { ALERT_TIME_INTERVALS } from "../../constants";

interface AlertStyles<T> extends Styles {
  Alert: T;
  text: T;
}

interface Props {
  classes: AlertStyles<string>;
  componentState: States;
  isError: boolean;
  message: string;
}

const styles = (theme: Theme): AlertStyles<JssRules> => ({
  Alert: {
    color: theme.errorText,
    width: "300px",
    margin: "20px",
    fontSize: "1.1em",
    borderRadius: "15px",
    border: props =>
      props.isError
        ? `2px solid ${theme.errorBorder}`
        : `2px solid ${theme.notificationBorder}`,
    backgroundColor: props =>
      props.isError ? theme.errorBackground : theme.notificationBackground,
    transform: props =>
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

const Alert: React.SFC<Props> = ({ classes, message }) => {
  return (
    <div className={classes.Alert}>
      <div className={classes.text}> {message} </div>
    </div>
  );
};

export default injectSheet(styles)(Alert);
