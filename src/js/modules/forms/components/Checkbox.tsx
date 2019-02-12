import * as React from "react";
import { Field } from "react-final-form";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  name: string,
}

const styles = (theme: Theme) => ({
  Checkbox: {
    display: "flex",
    padding: "20px",
    alignItems: "center",
    maxWidth: "500px"
  },
  input: {
    height: "30px",
    margin: "15px"
  },
  description: {},
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      width: "200px"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    description: {
      width: "300px",
      padding: "20px"
    }
  },
})

const Checkbox: React.FunctionComponent<Props> = props => {
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