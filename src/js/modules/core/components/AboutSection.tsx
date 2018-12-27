import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { Theme } from "../../types";

interface Props {
  classes: { [s: string]: string };
}
const styles = (_theme: Theme): Styles => ({
  AboutSection: {
    display: "flex",
    flexDirection: "column",
    margin: "0 5% 0 5%"
  },
  content: {
    display: "flex",
    flexWrap: "wrap"
  },
  intro: {
    fontSize: "1.8em",
    maxWidth: "800px"
  },
  title: {
    fontSize: "3em"
  },
  image: {
    maxWidth: "700px",
    width: "65vw"
  },
  imageContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  }
});

const AboutSection: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AboutSection}>
      <h1 className={classes.title}> About </h1>
      <div className={classes.content}>
        <p className={classes.intro}>
          HackNYU is NYU's annual hackathon. It takes place simultaneously in
          New York, Abu Dhabi and Shanghai over 48 hours. HackNYU is free, and
          made possible thanks to our wonderful sponsors and volunteers.
        </p>
        <div className={classes.imageContainer}>
          <img className={classes.image} src="/img/tables.jpg" />
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(AboutSection);
