import * as React from "react"
import { Styles } from "react-jss";
import { JssRules } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";

interface UnderlineStyles<T> extends Styles {
  Underline: T;
}

const styles: UnderlineStyles<JssRules> = {
  Underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  },
}

const Underline = ({ classes }) => {
  return (
    <hr className={classes.Underline} />
  )
}

export default injectSheet(styles)(Underline);