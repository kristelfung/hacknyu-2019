import * as React from "react";
import { JssRules, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { ReactNode } from "react";

interface ButtonStyles<T> extends Styles {
  button: T;
}

const styles = (theme: Theme): ButtonStyles<JssRules> => ({
  button: {
    //@ts-ignore
    width: (props: Props) => props.width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.submitButton,
    color: theme.secondFont,
    margin: "5px",
    fontVariant: "small-caps",
    padding: "10px",
    border: "none",
    fontSize: "1.2em",
    transition: "background-color 0.4s",
    "&:hover": {
      backgroundColor: theme.submitButtonHover
    },
    '&:disabled': {
      backgroundColor: theme.submitButtonHover
    }
  }
});

interface Props {
  classes: ButtonStyles<string>;
  children: ReactNode;
  type?: string;
  width?: string;
  onClick: () => any;
}

const Button: React.SFC<Props & React.HTMLAttributes> = props => {
  const { classes, children } = props;
  return (
    <button {...props} className={classes.button}>
      {children}
    </button>
  );
};

//@ts-ignore
export default injectSheet(styles)(Button);
