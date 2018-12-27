import * as React from "react";
import { connect } from "react-redux";
import injectSheet, { Styles } from "react-jss";
import { Link } from "react-router-dom";
// @ts-ignore
import { loginWithGoogle, logout } from "../coreActions";
import { User } from "firebase";
import { Theme } from "../../types";

const styles = (theme: Theme): Styles => ({
  Header: {
    minHeight: "300px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  masthead: {
    margin: "0px",
    padding: "0px",
    fontSize: "3rem",
    transition: "font-size 1s"
  },
  headerText: {
    padding: "20px",
    margin: "0px",
    backgroundColor: theme.highlightColor,
    color: theme.secondFont,
    "a:hover": {
      textDecoration: "none"
    }
  },
  link: {
    display: "flex",
    flexDirection: "row",
    color: theme.fontColor
  },
  links: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20px"
  },
  error: {
    color: "red"
  },
  locations: {
    paddingTop: "40px",
    paddingBottom: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    fontSize: "1.4em",
    fontVariant: "small-caps"
  },
  dot: {
    padding: "0px 8px 0px 8px"
  },
  "@media (max-width: 800px)": {
    Header: {
      flexDirection: "column",
      minHeight: "200px"
    },
    headerText: {
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "1em"
    },
    link: {
      fontSize: "0.75em",
      padding: "8px"
    }
  },
  bullet: {
    display: "flex"
  }
});

interface Props {
  classes: { [s: string]: string };
  user: User;
  error: string;
  viewportWidth: number;
  logout: () => any;
}

const Header: React.SFC<Props> = ({ classes, user, logout, viewportWidth }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.locations}>
        New York &mdash; Shanghai &mdash; Abu Dhabi
      </div>
      <div className={classes.masthead}>
        <Link to="/">
          <h1 className={classes.headerText}> HackNYU </h1>
        </Link>
      </div>
      <div className={classes.links}>
        {!user && (
          <h1 className={classes.signUp}>
            <span className={classes.bullet}>
              <Link to="/register">
                <div className={classes.link}>Register</div>
              </Link>
              {viewportWidth > 800 && <div className={classes.dot}>&bull;</div>}
            </span>
          </h1>
        )}
        <h1>
          <span className={classes.bullet}>
            <Link to="/about">
              <div className={classes.link}>About Us</div>
            </Link>
            {viewportWidth > 800 && <div className={classes.dot}>&bull;</div>}
          </span>
        </h1>
        {user ? (
          [
            <h1 key={0}>
              <span className={classes.bullet}>
                <a href="#" className={classes.link} onClick={logout}>
                  Log Out
                </a>
                {viewportWidth > 800 && (
                  <div className={classes.dot}>&bull;</div>
                )}
              </span>
            </h1>,
            <h1 key={1}>
              <Link to="/my_profile" className={classes.link}>
                My Profile
              </Link>
            </h1>
          ]
        ) : (
          <h1>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.core.user,
  error: state.core.error,
  viewportWidth: state.core.viewportWidth
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    dispatch(logout());
  }
});

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
