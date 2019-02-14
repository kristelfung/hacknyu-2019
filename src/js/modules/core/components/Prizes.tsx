import * as React from "react";
import injectSheet, {WithStyles} from "react-jss";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  prizes: {
    backgroundColor: theme.backgroundColor,
    width: "100%",
    display: "flex",
    flexWrap: "wrap"
  },
  prizeItem: {
    width: "100%",
    flex: "25%",
    textAlign: "center",
    flexGrow: "0",
    flexShrink: "0"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    prizeItem: {
      flex: "50%"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    prizeItem: {
      flex: "100%"
    }
  }
})

type Props = WithStyles<typeof styles>;

const Prizes: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.prizes}>
      <div className={classes.prizeItem}>
        <p>prize one</p>
      </div>
      <div className={classes.prizeItem}>
        <p>prize two</p>
      </div>
      <div className={classes.prizeItem}>
        <p>prize three</p>
      </div>
      <div className={classes.prizeItem}>
        <p>prize four</p>
      </div>
    </div>
  )
}

export default injectSheet(styles)(Prizes);