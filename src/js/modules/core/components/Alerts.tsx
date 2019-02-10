import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { bindActionCreators, compose, Dispatch } from "redux";
import { connect } from "react-redux";
import AnimatedAlert from "./AnimatedAlert";
import { clearError, clearNotification } from "../coreActions"
import { Errors, Notifications } from "../coreReducer";
import { ReduxState } from "../../../reducers";


interface Props extends WithStyles<typeof styles> {
  errors: Errors;
  notifications: Notifications;
  clearError: (type: string) => any;
  clearNotification: (type: string) => any;
}

const styles = {
  Alerts: {
    zIndex: "100",
    position: "fixed",
    top: "6vh",
    left: "2vw"
  }
};

const Alerts: React.FunctionComponent<Props> = ({ clearError, clearNotification, notifications, errors, classes }) => {
  return (
    <div className={classes.Alerts}>
      {Object.entries(errors).map(([type, message]: string[], index: number) => (
        <AnimatedAlert
          isError={true}
          type={type}
          clear={clearError}
          message={message}
          key={index}
        />
      ))}
      {Object.entries(notifications).map(([type, message]: string[], index: number) => (
        <AnimatedAlert
          isError={false}
          type={type}
          message={message}
          clear={clearNotification}
          key={index}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  errors: state.core.errors,
  notifications: state.core.notifications
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ clearError, clearNotification }, dispatch);


export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Alerts);
