import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { ReduxState, Theme } from "../../types";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";

interface Props {
  classes: { [s: string]: string };
  user: User;
}
const styles = (theme: Theme): Styles => ({
  apply: {
    marginTop: "45px",
    padding: "10px 20px 10px 20px",
    fontSize: "2.25em",
    fontVariant: "small-caps",
    backgroundColor: theme.highlightColor,
    color: theme.secondFont,
    transition: "color 1s, background-color 1s",
    "&:hover": {
      backgroundColor: theme.highlightColorHover,
      textDecoration: "none"
    }
  }
});
const ApplyButton: React.SFC<Props> = ({ user, classes }) => {
  if (user) {
    return (
      <Link to="/apply">
        <div className={classes.apply}> Apply</div>
      </Link>
    );
  }
  return (
    <Link to="/login">
      <div className={classes.apply}>Apply</div>
    </Link>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(ApplyButton);
