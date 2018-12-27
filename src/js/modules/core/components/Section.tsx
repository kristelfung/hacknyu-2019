import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { ReactNode } from "react";
import Timeline from "./Timeline";
import { ReduxState, Theme } from "../../types";
import { connect } from "react-redux";
import { compose } from "redux";
import InfoBlock from "./InfoBlock";

// Minimum width for timeline
const MIN_TIMELINE_WIDTH = 500;
const mediaTag = `@media (max-width: ${MIN_TIMELINE_WIDTH}px)`;

const styles = (theme: Theme): Styles => ({
  Section: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  content: {
    paddingTop: "5%",
    width: "70vw"
  },
  timeline: {
    display: "flex",
    justifyContent: "center",
    width: "30vw"
  },
  // @ts-ignore
  [mediaTag]: {
    content: {
      width: "100vw"
    }
  }
});

interface InfoBlock {
  id: number;
  date: string;
  color: string;
  text: string;
}

interface Props {
  classes: { [s: string]: string };
  children: ReactNode;
  viewportWidth?: number;
  infoBlock: InfoBlock;
}

interface ConnectProps {
  activeBlocks: number;
}

const Section: React.SFC<Props & ConnectProps> = ({
  activeBlocks,
  infoBlock,
  classes,
  children,
  viewportWidth
}) => {
  return (
    <div className={classes.Section}>
      <div className={classes.content}>{children}</div>
      {viewportWidth > MIN_TIMELINE_WIDTH && (
        <div className={classes.timeline}>
          <InfoBlock activeBlocks={activeBlocks} {...infoBlock} />
          <Timeline />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  viewportWidth: state.core.viewportWidth
});

export default injectSheet(styles)(
  connect<{}, {}, ConnectProps>(mapStateToProps)(Section)
);
