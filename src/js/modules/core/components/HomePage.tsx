import * as React from "react";
import injectSheet, { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import Hero from "./Hero";
import TrackInfo from "./TrackInfo";
import AboutSection from "./AboutSection";
import Timeline from "./Timeline";
import AnimatedSubwayLines from "./AnimatedSubwayLines";
import FAQ from "./FAQ";

interface HomePageStyles<T> extends Styles {
  HomePage: T;
  aboutSection: T;
  timelineSection: T;
  tracksSection: T;
  faqSection: T;
  curvedTop: T;
  info: T;
}

interface Props {
  classes: HomePageStyles<string>;
  viewportWidth: number;
}
interface State {
  activeBlocks: number;
}

const styles = (theme: Theme): HomePageStyles<JssRules> => ({
  HomePage: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    width: "100vw"
  },
  aboutSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  timelineSection: {
    background: `linear-gradient(${theme.secondBackground}, ${
      theme.secondBackground
    })`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px"
  },
  tracksSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  faqSection: {
    backgroundColor: theme.secondBackground,
    color: theme.fontColor
  },
  curvedTop: {
    width: "100vw",
    transform: "translateY(0.75vh)"
  },
  info: {
    display: "flex",
    width: "100vw",
    flexDirection: "column"
  },
});

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.HomePage}>
        <Hero />
        <AnimatedSubwayLines/>
        <div className={classes.info}>
          <div className={classes.aboutSection}>
            <AboutSection />
          </div>
          <div className={classes.timelineSection}>
            <Timeline/>
          </div>
          <div className={classes.tracksSection}>
            <TrackInfo />
          </div>
          <div className={classes.faqSection}>
            <img className={classes.curvedTop} src="/img/semicircle.svg" />
            <FAQ />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
