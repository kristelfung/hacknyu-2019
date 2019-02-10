import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  Footer: {
    padding: "25px 0",
    paddingBottom: "125px",
    marginTop: "25px",
    backgroundColor: theme.backgroundColor,
    width: "100%",
  },
  logo: {
    width: "175px",
    padding: "20px",
    display: "block",
    margin: "0 auto",
    marginTop: "50px",
    // Added this cause in mobile user tools blocks the copy
    marginBottom: "100px",
    backgroundColor: theme.backgroundColor,
  },
  footerLogo: {
    maxWidth: "100px",
    display: "block",
    margin: "25px auto"
  },
  a: {
    color: theme.fontColor,
    textDecoration: "underline"
  },
  socialMediaLink: {
    color: theme.fontColor,
    margin: "0.1em",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  copyText: {
    margin: "0.25em",
    textAlign: "center"
  }
});

type Props = WithStyles<typeof styles>;

const Footer: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.Footer}>
      <p className={classes.copyText}>Copyright © 2019 HackNYU. </p>
      <p className={classes.copyText}>Contact us at: support.hack@nyu.edu</p>
      <p className={classes.copyText}>
        Find us on social media:
        <a
          className={classes.socialMediaLink}
          href="https://www.facebook.com/hacknyu"
        >
          {" "}
          <FontAwesomeIcon icon={faFacebook} />{" "}
        </a>
        <a
          className={classes.socialMediaLink}
          href="https://twitter.com/hacknyu"
        >
          {" "}
          <FontAwesomeIcon icon={faTwitter} />{" "}
        </a>
      </p>
      <img className={classes.footerLogo} src="/img/hacknyu-logo-full.svg" />
      <p className={classes.copyText}>
        Website proudly built from scratch by HackNYU tech team!
      </p>
      <p className={classes.copyText}>
        Open sourced{" "}
        <a href="https://github.com/hacknyu/hacknyu-2019" className={classes.a}>
          here
        </a>
        .
      </p>
    </div>
  );
};

export default injectSheet(styles)(Footer);
