import * as React from "react";
import { connect } from "react-redux";
import injectSheet, { Styles } from "react-jss";
import { Link } from "react-router-dom";
// @ts-ignore
import { loginWithGoogle, logout } from "../coreActions";
import { User } from "firebase";
import { Theme } from "../../types";

interface NavbarStyles<T> extends Styles {
  Navbar: T;
  link: T;
  links: T;
  [p:string]: T;
}
const styles = (theme: Theme): NavbarStyles => ({
  Navbar: {
    height: "100%",
    width: "100vw",
    display: "flex",
    paddingLeft: "30px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    maxWidth: theme.containerMaxWidth,
  },
  link: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.4em",
    fontWeight: "bold",
    marginRight: "1em",
    color: theme.fontColor,
    "&:hover": {
      textDecoration: "underline",
    },
    "&:active": {
      textDecoration: "underline",
    },
  },
  links: {
    height: "6.5em",
    display: "flex",
    alignItems: "center",
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    Navbar: {
      flexDirection: "column",
      minHeight: "200px",
      paddingLeft: "0px",
    },
    links: {
      paddingLeft: "40px"
    },
    link: {
      fontSize: "1.1em",
    }
  }
});

interface Props {
  classes: { [s: string]: string };
  user: User;
  error: string;
  viewportWidth: number;
  logout: () => any;
}

const Navbar: React.SFC<Props> = ({ classes, user, logout }) => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.links}>
            <Link to="/">
                <div className={classes.link}>HOME</div>
            </Link>
            <Link to="/about">
                <div className={classes.link}>ABOUT</div>
            </Link>
        {user ? (
          [
            <Link to="/my_profile" className={classes.link} key={1}>
              PROFILE
            </Link>,
            <a key={0} href="#" className={classes.link} onClick={logout}>
              LOGOUT
            </a>
          ]
          ) : (
          [
            <Link to="/login" className={classes.link}>
              LOGIN
            </Link>,
            <Link to="/register" className={classes.link}>
              REGISTER
            </Link>
          ]
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
  )(Navbar)
);
