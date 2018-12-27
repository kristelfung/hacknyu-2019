import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import Line from "./Line";
import { Theme } from "../../types";
import { trackColors } from "../../ThemeInjector";

const styles = (theme: Theme): Styles => ({
  Timeline: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "50vw",
    height: "100%"
  }
});

interface Props {
  classes: { [s: string]: string };
}

const Timeline: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.Timeline}>
      {Object.values(trackColors).map((color, index) => {
        return <Line color={color} key={index} />;
      })}
    </div>
  );
};

export default injectSheet(styles)(Timeline);
