import * as React from "react";
import injectSheet, {  WithStyles } from "react-jss";
import TimelineStop from "./TimelineStop";
import { Theme, trackColors } from "../../ThemeInjector";
import TimelineTrack from "./TimelineTrack";
import TimelineDescription from "./TimelineDescription";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  Timeline: {
    display: "flex",
    flexDirection: "column",
    color: theme.secondFont
  },
  title: {
    marginBottom: "3em"
  },
  descriptions: {
    height: "40px",
    position: "relative"
  },
  trackContainer: {
    position: "relative",
    display: "flex",
    height: "30px",
    width: "80vw"
  },
  [`@media (max-width: ${theme.mediumBreakpoint})`]: {
    trackContainer: {
      width: "85vw"
    },
  }
});

const Timeline: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.Timeline}>
      <h1 className={classes.title}>TIMELINE</h1>
      <div className={classes.descriptions}>
        <TimelineDescription left="0vw" top="60px">
          <b>Jan 28:</b> Registration closes
        </TimelineDescription>
        <TimelineDescription left="25vw" top="-45px">
          <b>Feb 2:</b> Get admissions results
        </TimelineDescription>
        <TimelineDescription left="55vw" top="60px">
          <b>Feb 15:</b> Hackathon begins!
        </TimelineDescription>
        <TimelineDescription left="calc(77vw - 50px)" top="-45px">
          <b>Feb 17:</b> Hackathon ends
        </TimelineDescription>
      </div>
      <div className={classes.trackContainer}>
        <TimelineStop color="white" left="-8px" top="-7px" />
        <TimelineStop color="black" left="29vw" top="-7px" />
        <TimelineStop color="black" left="59vw" top="-7px" />
        <TimelineStop color="white" left="80vw" top="-7px" />
        <TimelineTrack color={trackColors.blue} width="30vw" />
        <TimelineTrack color={trackColors.red} width="30vw" />
        <TimelineTrack color={trackColors.orange} width="20vw" />
      </div>
    </div>
  );
};

export default injectSheet(styles)(Timeline);
