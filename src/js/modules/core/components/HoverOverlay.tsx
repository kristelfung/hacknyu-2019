import * as React from "react";
import { JssRules, Theme } from "../../types";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";

interface HoverOverlayStyles<T> extends Styles {
  HoverOverlay: T;
  text: T;
}

interface Props {
  classes: HoverOverlayStyles<string>
}

const styles = (theme: Theme): HoverOverlayStyles<JssRules> => ({
  HoverOverlay: {
    position: "absolute",
    top: "100px",
    right: "-105px",
    width: "200px",
    height: "100px",
    borderBottomLeftRadius: "100px",
    borderBottomRightRadius: "100px",
    fontSize: "1.1em",
    opacity: props => props.isHovering ? "1" : "0",
    transition: "opacity 0.3s",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.overlayColor
  },
  text: {
    width: "100px"
  }
});

const HoverOverlay: React.SFC<Props> = ({ classes, onClick }) => {
  return (
    <div className={classes.HoverOverlay} onClick={onClick}>
      <div className={classes.text}>Upload a new photo!</div>
    </div>
  );
};

export default injectSheet(styles)(HoverOverlay);
