import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import AnimatedSubwayLines from "./AnimatedSubwayLines";
import { Theme } from "../../ThemeInjector";


type Props = WithStyles<typeof styles>

const styles = (theme: Theme) => ({
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

const ErrorPage: React.FunctionComponent<Props> = ({ classes }) => {
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
