import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { Theme } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";

const styles = (theme: Theme): Styles => ({
  AboutPage: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    maxWidth: theme.containerWidth,
    borderRadius: "0.5em"
  },
  icons: {
    display: "flex",
    width: "100px",
    justifyContent: "space-around",
    fontSize: "2em",
    padding: "1em"
  },
  text: {
    fontSize: "1.6em",
    paddingLeft: "2em",
    paddingRight: "2em",
  },
  title: {
    fontSize: "2em",
    paddingTop: "1.5em",
    paddingBottom: "0.2em",
    textTransform: "uppercase"
  },
  underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  }
});

interface Props {
  classes: { [s: string]: string };
}

const AboutPage: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AboutPage}>
      <h1 className={classes.title}> About Us </h1>
      <hr className={classes.underline}></hr>
      <p className={classes.text}>
        HackNYU has been entirely student run from the beginning. We rely on the
        generosity of volunteers and sponsors to host HackNYU every year. If you
        are interested in sponsoring HackNYU, please contact us. If you are
        interested in volunteering, sign up here.
      </p>

      <h1 className={classes.title}> Tech Details </h1>
      <hr className={classes.underline}></hr>
      <p className={classes.text}>
        This site is written in React with TypeScript, Firebase, JSS and Redux.
        It is hosted on AWS. If you have any complaints/bugs/compliments, please
        email nick at nicholasyang.com.
      </p>
      <div className={classes.icons}>
        <FontAwesomeIcon icon={faReact} />
        <FontAwesomeIcon icon={faAws} />
      </div>
    </div>
  );
};

export default injectSheet(styles)(AboutPage);
