import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { User } from "firebase";


const styles = {
  Avatar: {
    width: "50px",
    height: "50px",
    padding: "10px",
    borderRadius: "50%",
    objectFit: "cover"
  },
};

interface Props extends WithStyles<typeof styles> {
  user: User;
}

// Earth Water Fire Air
const Avatar: React.FunctionComponent<Props> = ({ classes, user }) => {
  const url = user.photoURL || "/img/blank-profile.png";
  return <img className={classes.Avatar} src={url} />;
};

export default injectSheet(styles)(Avatar);
