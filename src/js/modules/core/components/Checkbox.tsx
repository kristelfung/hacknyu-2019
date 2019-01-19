import * as React from "react";
import { Field } from "react-final-form";
import { JssRules, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";


interface CheckboxStyles<T> extends Styles {
  Checkbox: T;
  input: T;
  [s: string]: T;
}

interface Props {
  name: string,
  classes: CheckboxStyles<string>
}

const styles = (theme: Theme): CheckboxStyles<JssRules> => ({
  Checkbox: {
    display: "flex",
    alignItems: "center",
    padding: "20px"
  },
  input: {
    width: "20px",
    height: "20px",
    margin: "8px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      width: "200px"
    }
  },
})

const Checkbox: React.SFC<Props> = props => {
  const { name, classes, children } = props;

  return (
    <label className={classes.Checkbox}>
      <Field
        name={name}
        className={classes.input}
        component="input"
        type="checkbox"
      />
      <div className={classes.description}> {children} </div>
    </label>
  );
}

export default injectSheet(styles)(Checkbox);