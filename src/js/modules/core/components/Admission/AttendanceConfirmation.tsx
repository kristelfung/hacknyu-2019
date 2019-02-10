import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "../Underline";
import Button from "../Button";
import { ConfirmationFormData } from "../../../types";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../../ThemeInjector";
import { ReduxState } from "../../../../reducers";
import { bindActionCreators } from "redux";
import { declineConfirmation } from "../../coreActions";


interface Props extends WithStyles<typeof styles> {
  user: User;
  confirmFormData: ConfirmationFormData | {};
  declineConfirmation: () => any;
}

const styles = (theme: Theme) => ({
  AttendanceConfirmation: {
    width: "80vw",
    maxWidth: theme.containerLargeWidth,
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    padding: "5vw",
    paddingTop: "2rem",
    paddingBottom: "0.5rem",
    lineHeight: theme.bodyLineHeight,
    fontSize: theme.bodyFontSize,
    marginBottom: "2rem",
    // fill container
    boxSizing: "border-box",
    textAlign: "center"
  },
  header: {
    padding: "10px"
  },
  cantAttendButton: {
    display: "inline-block",
    margin: "1rem"
  },
  locationMessage: {
    lineHeight: "1.1em",
    maxWidth: theme.containerMaxWidth
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    header: {
      maxWidth: "7em"
    }
  },
});

const AttendanceConfirmation: React.FunctionComponent<Props> = ({
  classes,
  confirmFormData,
  declineConfirmation
}) => {
  const locationToReadable = (location: string): string => {
    if (location == "cannot-attend") {
      return "Can't Attend 😔"
    }

    return location
      .split("-")
      .map(word => word.toUpperCase())
      .join(" ")
      + " 😎";
  };

  const handleOnClick = () => confirm("Are you sure you want to decline your admission?") ? declineConfirmation() : null;

  let isAttending, locationMessage, postMessage;
  if ('location' in confirmFormData) {
    isAttending = (confirmFormData as ConfirmationFormData).location !== "cannot-attend";

    if (isAttending) {
      locationMessage = "You are confirmed for: ";
      postMessage = (
        <div>
          See you at the event! If you can no longer attend the event, let us know:
          <Button className={classes.cantAttendButton} onClick={handleOnClick}>
            I can no longer attend HackNYU 2019
          </Button>
        </div>
      );
    } else {
      locationMessage = "Your status: ";
      postMessage =
        "We're sorry to see you can't attend. Hope to see at our event next year!";
    }
  }

  return (
    <div className={classes.AttendanceConfirmation}>
      <div>
        <h1 className={classes.header}> Thanks for responding to us! </h1>
        <Underline />
        <p className={classes.locationMessage}>
          {locationMessage} <strong>{locationToReadable((confirmFormData as ConfirmationFormData).location)}</strong>
        </p>
        <p>{postMessage}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  confirmFormData: state.core.confirmForm.formData,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ declineConfirmation }, dispatch);

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttendanceConfirmation)
);
