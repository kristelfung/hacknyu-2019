import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";

interface InfoBlockStyles<T> extends Styles {
  infoBlock: T,
}

interface Props {
  classes: InfoBlockStyles<string>
  activeBlocks: number;
  id: number;
  text: string;
  date: string;
  color: string;
}

const styles = (theme: Theme): InfoBlockStyles<JssRules> => ({
  infoBlock: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "column",
    // @ts-ignore
    position: props =>
      props.activeBlocks >= props.id ? "fixed" : "absolute",
    top: props =>
      props.activeBlocks >= props.id ? `${100 + 180 * props.id}px` : "auto",
    transform: props =>
      props.activeBlocks >= props.id ? "none" : "translateX(30vw)",
    transition: "transform 2s, position 5s",
    marginTop: "2vh",
    right: "7vw",
    width: "300px",
    height: "100px",
    color: theme.secondFont,
    borderRadius: "10px",
    backgroundColor: props => props.color
  },
});

const InfoBlock: React.SFC<Props> = ({ classes, date, text }) => {
  return (
    <div className={classes.infoBlock}>
      <div> <b> {date} </b> </div>
      <div> {text} </div>
    </div>
  );
};

export default injectSheet(styles)(InfoBlock);
