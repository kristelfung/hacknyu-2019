import * as React from "react";
import withStyles, { WithStyles } from "react-jss";
import { ReactNodeLike } from "prop-types";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  CheckboxesContainer: {
    margin: "40px 0 40px 0"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    CheckboxesContainer: {
      minInlineSize: "unset",
      width: "50vw"
    },
  }
});

interface Props extends WithStyles<typeof styles> {
  children: ReactNodeLike;
}

const CheckboxesContainer: React.FunctionComponent<Props> = ({
  classes,
  children
}) => {
  return <fieldset className={classes.CheckboxesContainer}>{children}</fieldset>;
};

export default withStyles(styles)(CheckboxesContainer);
