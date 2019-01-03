import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import * as React from "react";
import { JssRules, Theme } from "../../types";

interface LoadingIconStyles<T> extends Styles {
  LoadingIcon: T,
  "@keyframes lds-dual-ring": T
}

interface Props {
  width: number | string;
  height: number | string;
  padding: number | string;
  classes: { [s: string]: string };
}

const styles = (theme: Theme): LoadingIconStyles<JssRules> => ({
  LoadingIcon: {
    display: "inline-block",
    width: (props: Props) => props.width,
    height: (props: Props) => props.height,
    "&:after": {
      content: '""',
      width: (props: Props) => props.width,
      height: (props: Props) => props.height,
      display: "block",
      margin: "1px",
      borderRadius: "50%",
      border: `5px solid ${theme.secondBackground}`,
      borderColor: `${theme.secondBackground} transparent ${theme.secondBackground} transparent`,
      animation: "lds-dual-ring 1.2s linear infinite"
    },
    padding: (props: Props) => props.padding,
  },
  "@keyframes lds-dual-ring": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
});


const LoadingIcon: React.SFC<Props> = ({ classes }) => {
  return <div className={classes.LoadingIcon} />;
};

export default injectSheet(styles)(LoadingIcon);
