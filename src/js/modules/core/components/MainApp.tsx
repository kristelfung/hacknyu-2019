import * as React from "react";
import { ReactNode } from "react";
import injectSheet, { Styles } from "react-jss";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReduxState, Theme } from "../../types";
// @ts-ignore
import { addUser, deleteUser, refreshWindowDimensions } from "../coreActions";
import Header from "./Header";
import { User } from "firebase";
import UserInfo from "./UserInfo";
import { auth } from "../../../firebase";
import Alerts from "./Alerts";


interface MainAppStyles<T> extends Styles {
  MainApp: T
}

interface Props {
  classes: MainAppStyles<string>;
  children: ReactNode;
  error: string;
  location: Location;
  user: User;
  addUser: (u: User) => any;
  deleteUser: () => any;
  onResizeWindow: () => any;
}


const styles = (theme: Theme): MainAppStyles<object> => ({
  MainApp: {
    backgroundColor: theme.backgroundColor,
    color: theme.fontColor,
    transition: "background-color 2s, font-color 2s",
    fontFamily: theme.fontFamily,
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0"
  }
});


class MainApp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    auth.onAuthStateChanged(user => {
      if (user) {
        props.addUser(user);
      } else {
        props.deleteUser();
      }
    });
  }

  onResizeWindow = () => {
    this.props.onResizeWindow();
  };
  componentDidMount() {
    window.addEventListener("resize", this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }
  render() {
    let { classes, error, children, user } = this.props;
    return (
      <div className={classes.MainApp}>
        <Alerts />
        <Header />
        {user && <UserInfo user={user} />}
        {error && <h2 className={classes.error}> {error} </h2>}
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  error: state.core.appError,
  user: state.core.user
});

const mapDispatchToProps = (dispatch: any) => ({
  addUser: (user: User) => dispatch(addUser(user)),
  deleteUser: () => dispatch(deleteUser()),
  onResizeWindow: () => {
    dispatch(refreshWindowDimensions());
  }
});

// @ts-ignore
export default compose(
  withRouter,
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MainApp);
