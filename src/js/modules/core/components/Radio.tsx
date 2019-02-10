import * as React from "react";
import { Field } from "react-final-form";
import { Theme } from "../../ThemeInjector";
import injectSheet, { WithStyles } from "react-jss";

interface Props extends WithStyles<typeof styles> {
  name: string,
  value: string
}

const styles = (theme: Theme) => ({
  Radio: {
    display: "flex",
    alignItems: "center",
    padding: "5px"
  },
  input: {
    width: "20px",
    height: "20px",
    margin: "8px"
  },
  description: {},
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      width: "200px"
    }
  },
})

const Radio: React.FunctionComponent<Props> = props => {
  const { name, classes, children, value } = props;

  return (
    <label className={classes.Radio}>
      <Field
        name={name}
        className={classes.input}
        component="input"
        type="radio"
        value={value}
      />
      <div className={classes.description}> {children} </div>
    </label>
  );
}

export default injectSheet(styles)(Radio);