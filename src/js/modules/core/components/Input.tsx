import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
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
  component: any;
  [p: string]: any;
}

const styles = (theme: Theme) => ({
  label: {
    padding: "5px",
    width: "150px",
    display: "flex",
    alignItems: "center"
  },
  error: {
    color: "red",
    fontSize: "1rem",
    maxWidth: "200px"
  },
  textField: {
    marginLeft: "5px",
    fontFamily: theme.fontFamily,
    padding: "10px",
    fontSize: "1.5rem",
    border: "none",
    height: "40px"
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "1.3rem",
    padding: "15px"
  },
  inputArea: {
    display: "flex"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    Input: {
      width: "10em"
    },
    inputArea: {
      flexDirection: "column"
    },
  },
});

const Input: React.FunctionComponent<Props> = ({ component, classes, meta, input, label, ...props }) => {
  return (
    <div className={classes.Input}>
      <div className={classes.inputArea}>
        <div className={classes.label}>{label} </div>
        <input {...input} {...props} className={classes.textField} />
      </div>
      {meta.error && meta.touched && (
        <span className={classes.error}>{meta.error}</span>
      )}
    </div>
  );
};

export default injectSheet(styles)(Input);
