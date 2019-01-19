import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { JssRules, Theme } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";
import Underline from "./Underline";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";

interface AboutPageStyles<T> extends Styles {
  AboutPage: T;
  icons: T;
  text: T;
  title: T;
}

const styles = (theme: Theme): AboutPageStyles<JssRules> => ({
  AboutPage: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    maxWidth: theme.containerMaxWidth,
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
    maxWidth: "50vw",
    fontSize: "1.3em",
    paddingLeft: "2em",
    paddingRight: "2em"
  },
  title: {
    fontSize: "2em",
    paddingTop: "1.5em",
    paddingBottom: "0.2em",
    textTransform: "uppercase"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    AboutPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    AboutPage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    AboutPage: {
      width: theme.containerMobileWidth
    }
  }
});

interface Props {
  classes: { [s: string]: string };
  user: User;
}

const AboutPage: React.SFC<Props> = ({ classes, user }) => {
  return (
    <div className={classes.AboutPage}>
      <h1 className={classes.title}> About HackNYU </h1>
      <Underline/>
      <p className={classes.text}>
        HackNYU is New York University's largest hackathon, managed entirely by
        students and spanning all three of its global campuses. Every year,
        HackNYU welcomes hundreds of hackers from all over the world for two
        exciting days of creativity and adventure. This year, HackNYU will be
        held February 15th-17th, 2019 at the NYU Tandon School of Engineering.
        You can apply <Link to={user ? "/apply" : "/register"}>here</Link>!
      </p>
      <h1 className={classes.title}> Support Us </h1>
      <Underline/>
      <p className={classes.text}>
        HackNYU has been entirely student-run from its inception. We rely on the
        generosity of volunteers and sponsors to host HackNYU every year, and we
        are extremely thankful to all of the sponsors and staff involved in making
        this event a success! If you are interested in sponsoring HackNYU,
        please contact us at sponsorship.hack@nyu.edu. If you are interested
        in volunteering, you can sign up {" "}
        <a href="https://docs.google.com/a/nyu.edu/forms/d/1txTkJucca4E81HdX9zho1ug6BjiZ1drzoikR-2nU8ro/edit?usp=drivesdk" target="_blank">
        here
        </a>! Volunteer applications will close on February 3rd, 2019 at 11:59PM EST. 
      </p>
      <h1 className={classes.title}> Tech Details </h1>
      <Underline />
      <p className={classes.text}>
        This site is written in React with TypeScript, Firebase, JSS and Redux.
        It is hosted on AWS. If you have any complaints, bugs, or compliments,
        please email support.hack@nyu.edu.
      </p>
      <div className={classes.icons}>
        <FontAwesomeIcon icon={faReact} />
        <FontAwesomeIcon icon={faAws} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.core.user
})

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(AboutPage);
