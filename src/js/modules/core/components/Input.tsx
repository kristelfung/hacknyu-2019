import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import { FieldState } from "final-form";

interface Props {
  classes: { [s: string]: string };
  meta: Partial<{
    // Idk why, but react-final-form doesn't export this as a type
    active: boolean;
    data: object;
    dirty: boolean;
    dirtySinceLastSubmit: boolean;
    error: any;
    initial: any;
    invalid: boolean;
    pristine: boolean;
    submitError: any;
    submitFailed: boolean;
    submitSucceeded: boolean;
    submitting: boolean;
    touched: boolean;
    valid: boolean;
    visited: boolean;
  }>;
  label: string;
  type: string;
  placeholder: string;
  input: object;
  [p: string]: any
}

interface InputStyles<T> {
  label: T;
  error: T;
  textField: T;
  Input: T;
  inputArea: T;
}

const styles = (theme: Theme): InputStyles<JssRules> => ({
  label: {
    padding: "5px",
    width: "100px"
  },
  error: {
    color: "red",
    fontSize: "1rem",
    maxWidth: "200px"
  },
  textField: {
    marginLeft: "5px",
    padding: "10px",
    fontSize: "1rem",
    border: "none"
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.4rem",
    padding: "5px"
  },
  inputArea: {
    display: "flex"
  }
});

const Input: React.SFC<Props> = ({ classes, meta, input, label, ...props }) => {
  return (
    <div className={classes.Input}>
      <div className={classes.inputArea}>
        <div className={classes.label}>{label}: </div>
        <input {...input} {...props} className={classes.textField} />
      </div>
      {meta.error && meta.touched && (
        <span className={classes.error}>{meta.error}</span>
      )}
    </div>
  );
};

export default injectSheet(styles)(Input);
