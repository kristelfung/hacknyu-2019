import * as React from "react";
import { Styles } from "react-jss";
import { ReactNode } from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";

interface SubwayIconStyles<T> extends Styles {
  SubwayIcon: T;
}

interface Props {
  color: string;
  radius: number;
  children: ReactNode;
  classes: SubwayIconStyles<string>;
}

const styles: SubwayIconStyles<JssRules> = {
  SubwayIcon: {
    backgroundColor: props => props.color,
    fontFamily: "Helvetica, sans-serif",
    width: props => props.radius * 2,
    height: props => props.radius * 2,
    padding: "0",
    borderRadius: "80px",
    fontSize: "1.3em",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1rem",
    fontWeight: 800,
    float: "left",
    margin: "10px",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.5)"
    }
  }
};

const SubwayIcon: React.SFC<Props> = ({ classes, children }) => {
  return <div className={classes.SubwayIcon}>{children}</div>;
};

export default injectSheet(styles)(SubwayIcon);
