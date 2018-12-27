import * as React from "react";
import { User } from "firebase";
import { Styles } from "react-jss";
import Avatar from "./Avatar";
import injectSheet from "react-jss/lib/injectSheet";
import { Theme } from "../../types";

interface Props {
  classes: { [s: string]: string };
  user: User;
}

interface UserInfoStyles {
  UserInfo: object;
  greeting: object;
  "@media (max-width: 800px)": object;
}

const styles = (theme: Theme): UserInfoStyles => ({
  UserInfo: {
    backgroundColor: theme.highlightColor,
    display: "flex",
    flexDirection: "row",
    fontSize: "0.8rem",
    color: theme.secondFont,
    padding: "10px 10px 10px 20px",
    position: "fixed",
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
  return (
    <div className={classes.UserInfo}>
      <h2 className={classes.greeting}> Welcome {user.displayName}! </h2>
      <Avatar user={user} />
    </div>
  );
};

export default injectSheet(styles)(UserInfo);
