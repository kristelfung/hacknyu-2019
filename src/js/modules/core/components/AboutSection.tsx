import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import Underline from "./Underline";

interface AboutSectionStyles<T> extends Styles {
  AboutSection: T;
  content: T;
  intro: T;
  title: T;
}

interface Props {
  classes: { [s: string]: string };
}
const styles = (theme: Theme): AboutSectionStyles<JssRules> => ({
  AboutSection: {
    display: "flex",
    alignItems: "center",
    padding: "40px",
    flexDirection: "column",
    margin: "0 5% 0 5%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    padding: "5% 0 5% 0",
    margin: "5%",
    width: "80vw",
    maxWidth: "750px",
    backgroundColor: theme.secondBackgroundHighlight,
    color: theme.secondFont,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "4px 7px 21px -2px rgba(0,0,0,0.25)"
  },
  intro: {
    fontSize: "1.4rem",
    maxWidth: "500px",
    width: "60vw",
    lineHeight: "1.1em"
  },
  title: {
    fontSize: "2em"
  }
});

const AboutSection: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AboutSection}>
      <div className={classes.content}>
        <h1 className={classes.title}> ABOUT </h1>
        <Underline />
        <p className={classes.intro}>
          HackNYU is NYU's annual student-run hackathon, where people of all
          disciplines come together to create a project that addresses one
          of several social initiatives, or &ldquo;tracks&rdquo;. It takes place
          simultaneously in New York, Abu Dhabi and Shanghai over 48 hours. This
          year, HackNYU takes place from February 15th to 17th. HackNYU is free, and
          made possible thanks to our wonderful sponsors and volunteers.
        </p>
        <p className={classes.intro}>Come join us at HackNYU 2019!</p>
      </div>
    </div>
  );
};

export default injectSheet(styles)(AboutSection);
