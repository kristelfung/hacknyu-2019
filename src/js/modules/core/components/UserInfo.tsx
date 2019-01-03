import * as React from "react";
import { User } from "firebase";
import { Styles } from "react-jss";
import Avatar from "./Avatar";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  classes: { [s: string]: string };
  user: User;
}

interface UserInfoStyles<T> extends Styles {
  UserInfo: T;
  greeting: T;
  "@media (max-width: 800px)": T;
}

const styles = (theme: Theme): UserInfoStyles<JssRules> => ({
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
  "@media (max-width: 800px)": {
    UserInfo: {
      bottom: "0",
      top: "auto"
    }
  }
});

const UserInfo: React.SFC<Props> = ({ classes, user }) => {
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
