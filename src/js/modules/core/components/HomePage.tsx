import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Hero from "./Hero";
import TrackInfo from "./TrackInfo";
import AboutSection from "./AboutSection";
import Timeline from "./Timeline";
import AnimatedSubwayLines from "./AnimatedSubwayLines";
import FAQ from "./FAQ";
import { Theme } from "../../ThemeInjector";
import SponsorshipSection from "./SponsorshipSection";
import Schedule from "./Schedule";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
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
  scheduleSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  sponsorshipSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  curvedTop: {
    width: "100vw",
    transform: "translateY(0.75vh)"
  },
  info: {
    display: "flex",
    width: "100vw",
    flexDirection: "column"
  }
});

const HomePage: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.HomePage}>
      <Hero />
      <AnimatedSubwayLines />
      <div className={classes.info}>
        <div className={classes.aboutSection}>
          <AboutSection />
        </div>
        <div className={classes.tracksSection}>
          <TrackInfo />
        </div>
        <div className={classes.scheduleSection}>
          <Schedule />
        </div>
        <div className={classes.faqSection}>
          <img className={classes.curvedTop} src="/img/semicircle.svg" />
          <FAQ />
        </div>
        <div className={classes.sponsorshipSection}>
          <SponsorshipSection />
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(HomePage);
