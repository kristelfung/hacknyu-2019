import * as React from "react";
import injectSheet, {WithStyles} from "react-jss";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  prizesSection: {
    padding: "5%"
  },
  prizes: {
    backgroundColor: theme.backgroundColor,
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "auto auto"
  },
  prizeItem: {
    maxWidth: "500px",
    padding: "20px",
    textAlign: "center"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    prizes: {
      gridTemplateColumns: "50% 50%"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    prizes: {
      gridTemplateColumns: "50% 50%"
    }
  }
})

type Props = WithStyles<typeof styles>;

const Prizes: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.prizesSection}>
      <div className={classes.prizes}>
        <div className={classes.prizeItem}>
          <p>Sample content! Nope! HackNYU welcomes people of all skill levels. 
            In fact, part of the fun of HackNYU is seeing 
            beginners learn from hackathon veterans—and 
            hopefully vice versa! We will also provide a a 
            mentoring service to help guide new hackers.</p>
        </div>
        <div className={classes.prizeItem}>
          <p>Sample content! Nope! HackNYU welcomes people of all skill levels. 
            In fact, part of the fun of HackNYU is seeing 
            beginners learn from hackathon veterans—and 
            hopefully vice versa! We will also provide a a 
            mentoring service to help guide new hackers.</p>
        </div>
        <div className={classes.prizeItem}>
          <p>Sample content! Nope! HackNYU welcomes people of all skill levels. 
            In fact, part of the fun of HackNYU is seeing 
            beginners learn from hackathon veterans—and 
            hopefully vice versa! We will also provide a a 
            mentoring service to help guide new hackers.</p>
        </div>
        <div className={classes.prizeItem}>
          <p>Sample content! Nope! HackNYU welcomes people of all skill levels. 
            In fact, part of the fun of HackNYU is seeing 
            beginners learn from hackathon veterans—and 
            hopefully vice versa! We will also provide a a 
            mentoring service to help guide new hackers.</p>
        </div>
      </div>
    </div>
  )
}

export default injectSheet(styles)(Prizes);