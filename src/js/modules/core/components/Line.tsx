import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";

const styles: Styles = {
  line: {
    height: "100%",
    width: "20px",
    marginRight: "10px",
    // @ts-ignore
    backgroundColor: props => props.color
  }
};

interface Props {
  color: string;
  classes: { [s: string]: string };
}

const Line: React.SFC<Props> = ({ classes }) => {
  return <div className={classes.line} />;
};

export default injectSheet(styles)(Line);
