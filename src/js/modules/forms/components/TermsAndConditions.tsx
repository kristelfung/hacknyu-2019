import * as React from "react";
import InputLabel from "./InputLabel";
import withStyles, { WithStyles } from "react-jss";
import { Field } from "react-final-form";

const styles = {
  checkboxContainer: {
    padding: "15px"
  },
  checkbox: {
    width: "20px",
    height: "20px"
  },
  mlhPolicy: {
    maxWidth: "500px",
    lineHeight: "1.8rem"
  },
};

type Props = WithStyles<typeof styles>;

const TermsAndConditions: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div>
      <label className={classes.checkboxContainer}>
        <InputLabel>
          I have read and agree to the{" "}
          <a href="https://mlh.io/code-of-conduct">MLH Code of Conduct.</a>
        </InputLabel>
        <Field
          className={classes.checkbox}
          name="codeOfConduct"
          component="input"
          type="checkbox"
        />
      </label>
      <label className={classes.checkboxContainer}>
        <div className={classes.mlhPolicy}>
          I authorize HackNYU to share my application/registration information
          for event administration, pre- and post-event informational emails,
          and occasional messages about hackathons in-line with the MLH Privacy
          Policy. I further agree to the Contest Terms and Conditions and the
          MLH Privacy Policy.
        </div>
        <Field
          className={classes.checkbox}
          name="privacyPolicy"
          component="input"
          type="checkbox"
        />
      </label>
    </div>
  );
};


export default withStyles(styles)(TermsAndConditions);