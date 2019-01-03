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
    color: theme.fontColor,
    fontWeight: "350",
    margin: "5px",
    padding: "12px 25px",
    border: "none",
    fontSize: "0.9em",
    transition: "background-color 0.4s",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.submitButtonHover
    },
    '&:disabled': {
      backgroundColor: theme.submitButtonDeactivated
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
    <button {...props} className={`${classes.button} ${props.className}`}>
      {children}
    </button>
  );
};

//@ts-ignore
export default injectSheet(styles)(Button);
