import injectSheet, { WithStyles } from "react-jss";
import * as React from "react";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  width: number | string;
  height: number | string;
  padding: number | string;
}

const styles = (theme: Theme) => ({
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
});


const LoadingIcon: React.FunctionComponent<Props> = ({ classes }) => {
  return <div className={classes.LoadingIcon} />;
};

export default injectSheet(styles)(LoadingIcon);
