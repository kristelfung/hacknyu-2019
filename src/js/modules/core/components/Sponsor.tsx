import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  isSquareLogo: boolean;
  name: string;
  link: string;
  source: string;
  className?: string;
}

const styles = (theme: Theme) => ({
  Sponsor: {
    height: "20vh",
    width: "20%",
    margin: "2.5%",
    float: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    "&:hover": {
      transform: "scale(1.1)"
    },
  },
  logoImage: {
    display: "grid",
    justifyContent: "space-evenly",
    width: "100%",
  },
  squareLogo: {
    width: "auto",
    height: "100%",
    maxHeight: "15vh"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    Sponsor: {
      width: "40%",
      margin: "5%"
    }
  }
});

const Sponsor: React.FunctionComponent<Props> = ({ classes, className="", name, link, source, isSquareLogo }) => {
  return (
    <a href={link} className={`${classes.Sponsor} ${className}`}>
      <img
        alt={name}
        title={name}
        className={`${classes.logoImage} ${isSquareLogo ? classes.squareLogo : "" }`}
        src={source}
      />
    </a>
  )
};

export default injectSheet(styles)(Sponsor);