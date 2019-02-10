import * as React from "react";
import { ReactNode } from "react";
import injectSheet, { WithStyles } from "react-jss";

interface Props extends WithStyles<typeof styles> {
  key: number;
  color: string;
  radius: number;
  children: ReactNode;
}

const styles = {
  SubwayIcon: {
    backgroundColor: (props: Props) => props.color,
    fontFamily: "Helvetica, sans-serif",
    width: (props: Props) => props.radius * 2,
    height: (props: Props) => props.radius * 2,
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

const SubwayIcon: React.FunctionComponent<Props> = ({ classes, children }) => {
  return <div className={classes.SubwayIcon}>{children}</div>;
};

export default injectSheet(styles)(SubwayIcon);
