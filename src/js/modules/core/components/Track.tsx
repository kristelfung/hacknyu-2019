import * as React from "react";
import { ReactNode, ReactNodeArray } from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";

interface Props {
  id: number;
  classes: { [s: string]: string };
  icons: ReactNodeArray;
  name: string;
  children: ReactNode;
}

const styles: Styles = {
  Track: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0 20px 0"
  },
  subwayIcons: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  name: {
    paddingBottom: "25px"
  },
  "@media (max-width: 800px)": {
    description: {
      padding: "0"
    }
  }
};

const Track: React.SFC<Props> = ({ id, classes, icons, children, name }) => {
  return (
    <div className={classes.Track}>
      <div className={classes.subwayIcons}>{icons}</div>
      <h3 className={classes.name}> {name} </h3>
      <div className={classes.description}>{children}</div>
    </div>
  );
};

export default injectSheet(styles)(Track);
