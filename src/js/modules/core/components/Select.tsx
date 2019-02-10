import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { ReactNodeLike } from "prop-types";
import { Theme } from "../../ThemeInjector";
import { FieldRenderProps } from "react-final-form";

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
  [p: string]: any;
  children: ReactNodeLike;
}

const styles = (theme: Theme) => ({
  label: {
    padding: "5px",
    width: "175px",
    lineHeight: "1.4rem"
  },
  error: {
    color: "red",
    fontSize: "1rem",
    maxWidth: "200px"
  },
  textField: {
    marginLeft: "5px",
    maxWidth: "400px",
    fontFamily: theme.fontFamily,
    backgroundColor: "white",
    padding: "10px",
    fontSize: "1.5rem",
    height: "60px",
    border: "none"
  },
  Select: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "1.3rem",
    padding: "15px"
  },
  inputArea: {
    display: "flex",
    alignItems: "center"
  },
  [`@media (max-width: ${theme.mediumBreakpoint})`]: {
    Select: {
      width: "12em"
    },
    inputArea: {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    textField: {
      width: "50vw"
    }
  },
  [`@media (max-width: ${theme.smallBreakpoint})`]: {
    Select: {
      width: "10em"
    },
    inputArea: {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    textField: {
      width: "8em"
    }
  }
});

const Select: React.FunctionComponent<Props & FieldRenderProps> = ({
  children,
  classes,
  meta,
  input,
  label,
  ...props
}) => {
  return (
    <div className={classes.Select}>
      <div className={classes.inputArea}>
        <div className={classes.label}>{label} </div>
        <select {...input} {...props} className={classes.textField}>
          {children}
        </select>
      </div>
      {meta.error && meta.touched && (
        <span className={classes.error}>{meta.error}</span>
      )}
    </div>
  );
};

export default injectSheet(styles)(Select);
