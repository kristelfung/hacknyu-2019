import * as React from "react";
import { User } from "firebase";
import injectSheet, { WithStyles } from "react-jss";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  UserInfo: {
    backgroundColor: theme.highlightColor,
    display: "flex",
    flexDirection: "row",
    fontSize: "0.8rem",
    color: theme.secondFont,
    alignItems: "center",
    padding: "10px 10px 10px 20px",
    position: "fixed",
    borderRadius: "0 0 0 5%",
    zIndex: "100",
    top: "0",
    right: "0",
    boxShadow: "-1px 1px 12px -2px rgba(0,0,0,0.75)"
  },
  greeting: {
    maxWidth: "150px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    UserInfo: {
      bottom: "0",
      top: "auto",
      borderRadius: "7% 0 0 0",
    }
  }
});

const UserInfo: React.FunctionComponent<Props> = ({ classes, user }) => {
  const greeting = user.displayName
    ? `Welcome ${user.displayName}!`
    : "Welcome!";
  return (
    <div className={classes.UserInfo}>
      <h2 className={classes.greeting}> {greeting} </h2>
      <Link to="my_profile">
        <Avatar user={user} />
      </Link>
    </div>
  );
};

export default injectSheet(styles)(UserInfo);
