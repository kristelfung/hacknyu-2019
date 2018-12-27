import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import { States } from "./AnimatedNotification";
import { NOTIFICATION_TIME_INTERVALS } from "../../constants";

interface NotificationStyles<T> extends Styles {
  Notification: T;
  text: T;
}

interface Props {
  classes: NotificationStyles<string>;
  componentState: States;
  isError: boolean;
  message: string;
}

const styles = (theme: Theme): NotificationStyles<JssRules> => ({
  Notification: {
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
    transition: `transform ${NOTIFICATION_TIME_INTERVALS.ANIMATION_TIME}ms`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: "20px"
  }
});

const Notification: React.SFC<Props> = ({ classes, message }) => {
  return (
    <div className={classes.Notification}>
      <div className={classes.text}> {message} </div>
    </div>
  );
};

export default injectSheet(styles)(Notification);
