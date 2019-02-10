import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  Schedule: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.secondBackground,
    fontSize: "1.4rem",
    textAlign: "center",
    paddingTop: "25px",
    width: "90vw",
    margin: "0 auto",
    paddingBottom: "75px"
  },
  header: {
    margin: "0"
  },
  statement: {
    fontSize: "1.2rem",
    lineHeight: "1.1em",
    textAlign: "left",
    maxWidth: "30rem"
  },
  day: {
    lineHeight: "1.2em",
    fontWeight: "bold"
  },
  eventTimeline: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  dailyEvents: {
    listStyleType: "none",
    lineHeight: "1.2em"
  },
  event: {
    display: "flex",
    width: "450px"
  },
  time: {
    display: "flex",
    justifyContent: "flex-end",
    width: "180px",
    paddingRight: "20px"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    eventTimeline: {
      flexDirection: "column",
      transform: "translateX(-5.5vw)"
    },
    statement: {
      fontSize: "0.9rem"
    },
    Schedule: {
      fontSize: "1rem"
    }
  }
});

const Schedule: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.Schedule}>
      <h2 className={classes.header}>SCHEDULE</h2>
      <Underline />
      <p className={classes.statement}>
        The following is for the NYC event. Starred events (*) are shared between all events: NYC, Abu Dhabi, Shanghai. Listed times are in EST. Events and times may be subject to change.
      </p>
      <div className={classes.eventTimeline}>
        <div>
          <ul className={classes.dailyEvents}>
            <p className={classes.day}>Friday, February 15</p>
            <li className={classes.event}>
              <span className={classes.time}>2:00-5:00pm</span> Early Check In
            </li>
            <li className={classes.event}>
              <span className={classes.time}>5:00-7:00pm</span> Check-In
            </li>
            <li className={classes.event}>
              <span className={classes.time}>7:00-8:00pm</span> *Opening
              Ceremonies
            </li>
            <li className={classes.event}>
              <span className={classes.time}>8:00-9:00pm</span> Dinner
            </li>
            <li className={classes.event}>
              <span className={classes.time}>8:00-10:00pm</span> Team Hunt
            </li>
            <li className={classes.event}>
              <span className={classes.time}>12:00am</span> (Saturday) Snacktime
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.dailyEvents}>
            <p className={classes.day}>Saturday, February 16</p>
            <li className={classes.event}>
              <span className={classes.time}>8:30am</span> Breakfast
            </li>
            <li className={classes.event}>
              <span className={classes.time}>10:00am-1:00pm</span> *Workshop
              Block
            </li>
            <li className={classes.event}>
              <span className={classes.time}>1:00pm</span> Lunch
            </li>
            <li className={classes.event}>
              <span className={classes.time}>2:00-6:00pm</span> *Workshop Block
            </li>
            <li className={classes.event}>
              <span className={classes.time}>7:00pm</span> MLH Games!
            </li>
            <li className={classes.event}>
              <span className={classes.time}>8:00pm</span > Dinner
            </li>
            <li className={classes.event}>
              <span className={classes.time}>12:00am</span> (Sunday) Snacktime
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.dailyEvents}>
            <p className={classes.day}>Sunday, February 17</p>
            <li className={classes.event}>
              <span className={classes.time}>8:30am</span> Breakfast
            </li>
            <li className={classes.event}>
              <span className={classes.time}>9:00-11:00am</span> *Workshop Block
            </li>
            <li className={classes.event}>
              <span className={classes.time}>12:00pm</span> Hacking Ends
            </li>
            <li className={classes.event}>
              <span className={classes.time}>1:15pm</span> Hacker Expo
            </li>
            <li className={classes.event}>
              <span className={classes.time}>5:00pm-6:00pm</span> *Closing Ceremonies
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(Schedule);
