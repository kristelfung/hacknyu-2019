import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { ReactNode } from "react";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  button: {
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
    transition: "background-color 0.4s, transform 200ms",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.submitButtonHover,
      transform: "scale(1.1)"
    },
    '&:disabled': {
      backgroundColor: theme.submitButtonDeactivated,
      cursor: "not-allowed"
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  children?: ReactNode;
  type?: string;
  width?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FunctionComponent<Props & React.HTMLAttributes<HTMLButtonElement>> = props => {
  const { classes, children, className } = props;
  return (
    <div className={className}>
    <button {...props} className={classes.button}>
      {children}
    </button>
    </div>
  );
};

//@ts-ignore
export default injectSheet(styles)(Button);
