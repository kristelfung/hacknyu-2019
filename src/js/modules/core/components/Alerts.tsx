import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { Errors, JssRules } from "../../types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import AnimatedNotification from "./AnimatedNotification";
import { clearError, clearNotification } from "../coreActions"

interface AlertsStyles<T> extends Styles {
  Alerts: T;
}

interface Props {
  errors: Errors;
  classes: AlertsStyles<string>;
  clearError: (type: string) => any;
  clearNotification: (type: string) => any;
}

const styles: AlertsStyles<JssRules> = {
  Alerts: {
    position: "fixed",
    top: "2vh",
    left: "2vw"
  }
};

const Alerts: React.SFC<Props> = ({ clearError, clearNotification, notifications, errors, classes }) => {
  return (
    <div className={classes.Alerts}>
      {Object.entries(errors).map(([type, message], index) => (
        <AnimatedNotification
          isError={true}
          type={type}
          clear={clearError}
          message={message}
          key={index}
        />
      ))}
      {Object.entries(notifications).map(([type, message], index) => (
        <AnimatedNotification
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

const mapStateToProps = state => ({
  errors: state.core.errors,
  notifications: state.core.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearError, clearNotification }, dispatch);


export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Alerts);
