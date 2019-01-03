import * as React from "react";
import { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import AnimatedSubwayLines from "./AnimatedSubwayLines";

interface ErrorPageStyles<T> extends Styles {
  ErrorPage: T;
  message: T;
  link: T;
}

interface Props {
  classes: ErrorPageStyles<string>;
}

const styles = (theme: Theme): ErrorPageStyles<JssRules> => ({
  ErrorPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.3em",
    color: theme.fontColor,
    fontFamily: theme.fontFamily,
    width: "80vw"
  },
  message: {
    padding: "5%",
    maxWidth: "600px"
  },
  link: {
    color: theme.fontColor,
    '&:hover': {
      textDecoration: "underline"
    }
  }
});

const ErrorPage: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.ErrorPage}>
      <div className={classes.message}>
        We're having trouble fetching your data due to <del>train traffic</del>{" "}
        network problems. Sorry!
      </div>
      <a href="/">
        <div className={classes.link}> Click here to try again </div>
      </a>
      <AnimatedSubwayLines />
    </div>
  );
};

export default injectSheet(styles)(ErrorPage);
