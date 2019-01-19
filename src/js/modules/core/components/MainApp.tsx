import * as React from "react";
import { ReactNode } from "react";
import injectSheet, { Styles } from "react-jss";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { LoadingStates, ReduxState, Theme } from "../../types";
// @ts-ignore
import { loadInitialState, refreshWindowDimensions } from "../coreActions";
import Header from "./Navbar";
import Footer from "./Footer";
import { User } from "firebase";
import UserInfo from "./UserInfo";
import Alerts from "./Alerts";
import LoadingIcon from "./LoadingIcon";
import ErrorPage from "./ErrorPage";

interface MainAppStyles<T> extends Styles {
  MainApp: T;
  loadingScreen: T;
  loadingIcon: T;
  loadingText: T;
  banner: T;
  bannerImg: T;
}

interface Props {
  classes: MainAppStyles<string>;
  children: ReactNode;
  location: Location;
  user: User;
  addUser: (u: User) => any;
  deleteUser: () => any;
  onResizeWindow: () => any;
  loadingState: LoadingStates
}

const styles = (theme: Theme): MainAppStyles<object> => ({
  MainApp: {
    backgroundColor: theme.backgroundColor,
    color: theme.fontColor,
    fontFamily: theme.fontFamily,
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0"
  },
  loadingScreen: {
    fontFamily: theme.fontFamily,
    fontSize: "1.2em",
    fontVariant: "small-caps",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "80vh"
  },
  loadingIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.fontColor,
    padding: "50px",
  },
  loadingText: {
    paddingBottom: "30px"
  },
  banner: {
    display: "block",
    maxWidth: "100px",
    minWidth: "60px",
    position: "fixed",
    right: "50px",
    top: "0", 
    width: "10%",
    zIndex: "10000",
  },
  bannerImg: {
      width: "100%"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    banner: {
      right: "10px"
    }
  }
});

class MainApp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.loadInitialState(props.location);
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
  componentDidUpdate() {
    const { loadingState, loadInitialState, location } = this.props;
    if (loadingState === LoadingStates.Loading) {
      loadInitialState(location);
    }
  }

  render() {
    let { classes, children, user, loadingState } = this.props;
    if (loadingState === LoadingStates.Loading) {
      return (
        <div className={classes.loadingScreen}>
          <LoadingIcon width="100px" height="100px" padding="0 20px 0 0"/>
        </div>
      );
    }
    if (loadingState === LoadingStates.Failed) {
      return (
        <ErrorPage/>
      );
    }
    if (user) {
      return (
        <div className={classes.MainApp}>
          <Alerts />
          <Header />
          <UserInfo user={user}/>
          {children}
          <Footer />
        </div>
      );
    }
    return (
      <div className={classes.MainApp}>
        <Alerts />
        <Header />
        <a id="mlh-trust-badge" 
          className={classes.banner} 
          href="https://mlh.io/seasons/na-2019/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2019-season&utm_content=white" 
          target="_blank">
          <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg" 
            alt="Major League Hacking 2019 Hackathon Season" 
            className={classes.bannerImg}/>
        </a>
        {children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  loadingState: state.core.loadingState
});

const mapDispatchToProps = (dispatch: any) => ({
  loadInitialState: (location: Location) => {
    dispatch(loadInitialState(location));
  },
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
