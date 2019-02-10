import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import { IS_REGISTRATION_OPEN } from "../../constants";


interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  Hero: {
    maxWidth: theme.containerMaxWidth,
    width: "100%",
    paddingTop: "50px",
    textAlign: "center"
  },
  icon: {
    width: "48px",
    marginBottom: "15px"
  },
  title: {
    margin: "0.15em 0em",
    fontSize: "3.6em"
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "1.8em",
    marginBottom: "1em"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    alignItems: "center",
    margin: "15px"
  },
  button: {
    margin: "0.5em 1em",
    padding: "15px 35px 15px 35px",
    borderRadius: "5px",
    fontSize: "1.2em",
    backgroundColor: theme.highlightColor,
    color: theme.backgroundColor,
    fontWeight: "bold",
    transition: "color 1s, background-color 1s, transform 200ms",
    width: "fit-content",
    display: "block",
    "&:hover": {
      textDecoration: "none",
      transform: "scale(1.1)"
    }
  },
  buttonSecondary: {
    backgroundColor: theme.backgroundColor,
    color: theme.highlightColor,
    border: theme.highlightColor + " 2px solid"
  },
  info: {
    margin: "0.5em"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    buttons: {
      flexFlow: "column"
    }
  }
});


// Murai
const Hero: React.FunctionComponent<Props> = ({ user, classes }) => {
  return (
    <div className={classes.Hero}>
      <img className={classes.icon} src="img/logo-icon.svg" />
      <h1 className={classes.title}>HackNYU</h1>
      <h3 className={classes.subtitle}>Feb 15&ndash;17, 2019</h3>
      {!IS_REGISTRATION_OPEN ? 
        [<p className={classes.info}>Registration for HackNYU 2019 is now closed.</p>,
        <p className={classes.info}>Log in to check your admission status.</p>]
      : null}
      <div className={classes.buttons}>
        {
          IS_REGISTRATION_OPEN ? 
            <Link to={user ? "/apply" : "/register"} className={classes.button}>
              {user ? "EDIT APPLICATION" : "REGISTER"}
            </Link>
          :
            <Link to={user ? "/status" : "/login"} className={classes.button}>
              {user ? "ADMISSION STATUS" : "LOGIN"}
            </Link>
        }
        {user && <Link to="/apply" className={`${classes.button} ${classes.buttonSecondary}`}>EDIT APPLICATION</Link>}
      </div>
    </div>
  )
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(Hero);
