import * as React from "react";
import injectSheet, {  WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import { SyntheticEvent } from "react";

interface Props extends WithStyles<typeof styles> {
  isHovering: boolean;
  onClick: (e: SyntheticEvent<HTMLDivElement>) => void;
}

const styles = (theme: Theme) => ({
  HoverOverlay: {
    position: "absolute",
    top: "100px",
    right: "-105px",
    width: "200px",
    height: "100px",
    borderBottomLeftRadius: "100px",
    borderBottomRightRadius: "100px",
    fontSize: "1.1em",
    opacity: (props: Props) => props.isHovering ? "1" : "0",
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

const HoverOverlay: React.FunctionComponent<Props> = ({ classes, onClick }) => {
  return (
    <div className={classes.HoverOverlay} onClick={onClick}>
      <div className={classes.text}>Upload a new photo!</div>
    </div>
  );
};

export default injectSheet(styles)(HoverOverlay);
