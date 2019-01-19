import * as React from "react";
import injectSheet  from "react-jss/lib/injectSheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { Theme } from "../../types";

const styles = (theme: Theme) => ({
  Footer: {
    marginTop: "50px",
    // Added this cause in mobile user tools blocks the copy
    marginBottom: "100px",
    backgroundColor: theme.backgroundColor,
    width: "100vw"
  },
  footerLogo: {
    maxWidth: "100px",
    display: "block",
    margin: "25px auto",
  },
  a: {
    color: theme.fontColor,
    textDecoration: "underline"
  },
  socialMediaLink: {
    color: theme.fontColor,
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

const Footer: React.SFC = ({ classes }) => {
  return (
    <div className={classes.Footer}>
      <p className={classes.copyText}>Copyright © 2018 HackNYU. </p>
      <p className={classes.copyText}>Contact us at: support.hack@nyu.edu</p>
      <p className={classes.copyText}>Find us on social media:
        <a className={classes.socialMediaLink} href="https://www.facebook.com/hacknyu"> <FontAwesomeIcon icon={faFacebook} /> </a>
        <a className={classes.socialMediaLink} href="https://twitter.com/hacknyu"> <FontAwesomeIcon icon={faTwitter} /> </a>
      </p>
      <img className={classes.footerLogo} src="/img/hacknyu-logo-full.svg"/>
      <p className={classes.copyText}>Website proudly built from scratch by HackNYU tech team!</p>
      <p className={classes.copyText}>Open sourced <a href="https://github.com/hacknyu/hacknyu-2019" class={classes.a}>here</a>.</p>
      
    </div>
  );
};

export default injectSheet(styles)(Footer);