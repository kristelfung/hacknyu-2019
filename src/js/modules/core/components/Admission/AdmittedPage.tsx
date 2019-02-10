import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "../Underline";
import AttendanceConfirmation from "./AttendanceConfirmation";
import { Theme } from "../../../ThemeInjector";
import ConfirmationForm from "./ConfirmationForm";
import { connect } from "react-redux";
import { ReduxState } from "../../../../reducers";
import { IS_CONFIRMATION_OPEN } from "../../../constants";


interface Props extends WithStyles<typeof styles> {
  confirmTimestamp: string;
}

const styles = (theme: Theme) => ({
  AdmittedPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.backgroundColor,
    maxWidth: theme.containerLargeWidth,
    width: "80vw",
    fontSize: theme.bodyFontSize
  },
  confirmationInfo: {
    // fill container
    boxSizing: "border-box",
    display: "flex",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    padding: "5vw",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    lineHeight: theme.bodyLineHeight
  },
  statement: {
    marginBottom: theme.bodyFontSize
  },
  header: {
    padding: "15px"
  },
  text: {
    maxWidth: "750px",
  },
  link: {
    textDecoration: "underline"
  },
  warning: {
    color: theme.fontColor,
    backgroundColor: theme.red,
    width: "100%",
    padding: "25px 75px",
    boxSizing: "border-box",
    borderRadius: "0.5em",
    marginBottom: "25px"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    header: {
      whiteSpace: "nowrap"
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    AdmittedPage: {
      maxWidth: theme.containerMediumWidth
    },
    inputs: {
      alignItems: "center"
    },
    header: {
      maxWidth: "7.5em"
    }
  }
});

const AdmittedPage: React.FunctionComponent<Props> = ({
  classes,
  confirmTimestamp
}) => {
  return (
    <div className={classes.AdmittedPage}>
      {/* if confirmation is closed and they have not yet confirmed... */}
      {!IS_CONFIRMATION_OPEN && !confirmTimestamp &&
        <div className={classes.warning}>
          <p>
            <em>
              Unfortunately, attendance confirmations are now closed and your spot was not 
              confirmed by the deadline. This means you will not be able to attend HackNYU 
              2019, as the event has reached capacity.
            </em>
          </p>
          <p><em>We hope you can come to next year's event!</em></p>
        </div>
      }

      {confirmTimestamp && <AttendanceConfirmation />}
      <div className={classes.confirmationInfo}>
      <h1 className={classes.header}>🎉 You're In! 🎉</h1>
      <Underline />
      <div className={classes.text}>
        <p>
          Congratulations! You've been accepted to HackNYU 2019! We look forward
          to seeing you at the event. Please confirm that you are still going
          with the form below.{" "}
          <strong>
            If this form is not submitted, you will not be eligible to attend
            HackNYU.
          </strong>
        </p>
        <p>
          Before you can confirm your attendance, there are a few things for you
          to read. Please read the following carefully:
        </p>
        <ul>
          <li className={classes.statement}>
            At this time, participation at either the Abu Dhabi or Shanghai
            location is <strong>only</strong> available for NYU students who are
            currently enrolled at those campuses.
          </li>

          <li className={classes.statement}>
            Any student who is or has been enrolled <strong>within the last 12 months</strong> at
            a high school or university can participate at the event at our
            Brooklyn, NY location.
          </li>
          <li className={classes.statement}>
            If you are <strong>under 18 years of age</strong> at the time of the event, you must
            have your parent(s) or legal guardian(s) print and sign the Minors
            Release Form, which you can access{" "}
            <a
              className={classes.link}
              href="/pdf/minors-waiver.pdf"
              target="_blank"
            >
              here.
            </a>{" "}
            Please be sure to bring a physical copy of the waiver with you when
            you arrive at HackNYU, otherwise we will not be able to let you
            participate!
          </li>
          <li className={classes.statement}>
            Finally, HackNYU aims to be a <strong>safe and welcoming space</strong> for
            participants. All participants (hackers, volunteers, mentors,
            organizers, etc) must abide by the{" "}
            <a
              className={classes.link}
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
            >
              MLH Code of Conduct.
            </a>
          </li>
        </ul>
        <p>
          With that in mind, please submit out the form to confirm that you are
          attending HackNYU 2019.
        </p>
      </div>
        <ConfirmationForm />
    </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  confirmTimestamp: state.core.confirmForm.confirmTimestamp
});

export default injectSheet(styles)(connect(mapStateToProps)(AdmittedPage));
