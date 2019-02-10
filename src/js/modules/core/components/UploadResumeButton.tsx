import * as React from "react";
import Button from "./Button";
import injectSheet, { WithStyles } from "react-jss";
import { bindActionCreators, compose, Dispatch } from "redux";
import { connect } from "react-redux";
import { uploadResume } from "../coreActions";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";

interface Props extends WithStyles<typeof styles> {
  resumeTimestamp: string;
  uploadResume: (uid: string, file: File) => any;
  uid?: string;
  label: string;
}

const styles = (theme: Theme) => ({
  UploadResumeButton: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.3rem",
    padding: "15px",
    alignItems: "center"
  },
  label: {
    maxWidth: "500px",
    padding: "10px",
    paddingBottom :"20px"
  },
  hiddenInput: {
    display: "none"
  },
  uploadedTime: {
    paddingLeft: "10px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    UploadResumeButton: {
      flexDirection: "column"
    }
  }
});

class UploadResumeButton extends React.Component<Props> {
  private fileUploader = React.createRef<HTMLInputElement>();

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.fileUploader) {
      this.fileUploader.current.click();
    }
  };

  handleUpload = () => {
    const { uid, uploadResume } = this.props;
    const file = this.fileUploader.current.files[0];
    uploadResume(uid, file);
  };

  render() {
    let { classes, label, resumeTimestamp } = this.props;

    return (
      <div className={classes.UploadResumeButton}>
        <div className={classes.label}>{label}</div>
        <input
          key={0}
          type="file"
          className={classes.hiddenInput}
          ref={this.fileUploader}
          onChange={this.handleUpload}
        />
        <div>
        <Button key={1} type="button" onClick={this.handleClick}>
          Upload
        </Button>
        {resumeTimestamp && (
          <div className={classes.uploadedTime}>
            {" "}
            Uploaded at {resumeTimestamp}{" "}
          </div>
        )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ uploadResume }, dispatch);

const mapStateToProps = (state: ReduxState) => ({
  resumeTimestamp: state.core.applyForm.resumeTimestamp
});

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UploadResumeButton)
);
